import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
//import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getReportList } from "../../../actions/report.list.action";
import ApiReport from "../../../api/api.report";
import { pagination } from "../../../constant/app.constant";

class ReportListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1000);
  }

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      isShowDeleteModal: !prevState.isShowDeleteModal
    }));
  };

  toggleModalInfo = (item, title) => {
    this.setState(prevState => ({
      isShowInfoModal: !prevState.isShowInfoModal,
      item: item || {},
      formTitle: title
    }));
  };

  showConfirmDelete = itemId => {
    this.setState(
      {
        itemId: itemId
      },
      () => this.toggleDeleteModal()
    );
  };

  showAddNew = () => {
    let title = "Create Report";
    let report = {
      title: "",
      preview: "",
      detail: "",
      picture: ""
    };
    this.toggleModalInfo(report, title);
  };

  showUpdateModal = item => {
    let title = "Update Report";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  onReportCategoryChange = value => {
    let item = Object.assign({}, this.state.item);
    item.reportCategoryId = value;
    this.setState({ item });
  };

  search = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: 1
        },
        query: e.target.value
      },
      () => {
        this.getReportList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: e.selected + 1
        }
      },
      () => this.getReportList()
    );
  };

  getReportList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getReportList(params);
  };

  addReport = async () => {
    console.log("add: state ==================");
    console.log(this.state);
    const { title, preview, detail, picture, reportCategoryId } = this.state.item;
    const report = { title, preview, detail, picture, reportCategoryId };
    try {
      let response = await ApiReport.postReport(report);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getReportList();
      toastSuccess("The report has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This Report title is exist! Try another one");
    }
  };

  updateReport = async () => {
    const { id, title, preview, detail, picture } = this.state.item;
    const report = { id, title, preview, detail, picture };
    try {
      await ApiReport.updateReport(report);
      this.toggleModalInfo();
      this.getReportList();
      toastSuccess("The report has been updated successfully");
    } catch (err) {
      toastError("This ReportCategory title is exist! Try another one");
    }
  };

  deleteReport = async () => {
    try {
      await ApiReport.deleteReport(this.state.itemId);
      this.toggleDeleteModal();
      this.getReportList();
      toastSuccess("The report has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveReport = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateReport();
    } else {
      this.addReport();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveReport();
  }

  componentDidMount() {
    this.getReportList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { reportPagedList } = this.props.reportPagedListReducer;
    const { sources, pageIndex, totalPages } = reportPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteReport}
          isShowModal={isShowDeleteModal}
          toggleModal={this.toggleDeleteModal}
        />

        <ModalInfo title={this.state.formTitle} isShowModal={isShowInfoModal} hiddenFooter>
          <div className="modal-wrapper">
            <div className="form-wrapper">
              <Form
                onSubmit={e => this.onSubmit(e)}
                ref={c => {
                  this.form = c;
                }}
              >
                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="title"
                        title="Title"
                        type="text"
                        required={true}
                        value={item.title}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="preview"
                        title="Preview"
                        type="text"
                        required={true}
                        value={item.preview}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="detail"
                        title="Detail"
                        type="text"
                        required={true}
                        value={item.detail}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="picture"
                        title="Picture"
                        type="text"
                        required={false}
                        value={item.picture}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button color="danger" type="submit">
                    Confirm
                  </Button>
                  &nbsp;
                  <Button color="secondary" onClick={this.toggleModalInfo}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </ModalInfo>

        <Row>
          <Col xs="12">
            <div className="flex-container header-table">
              <Button onClick={this.showAddNew} className="btn btn-pill btn-success btn-sm">
                Create
              </Button>
              <input
                onChange={this.onSearchChange}
                className="form-control form-control-sm"
                placeholder="Searching..."
              />
            </div>
            <Table className="admin-table" responsive bordered>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Create On</th>
                  <th>Report subject</th>
                  <th>Content</th>
                  <th>Student ID</th>
                  <th>Student's Name</th>
                  <th>Is Seen</th>
                  <th>Is Solved</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.createOn}</td>
                        <td>{item.subject}</td>
                        <td>{item.content}</td>
                        <td>{item.studentViewModel.id}</td>
                        <td>{item.studentViewModel.lastName + " " + item.studentViewModel.firstName}</td>
                        <td>{item.isSeen ? "Seen" : "Unseen yet"}</td>
                        <td>{item.isSolved ? "Solved" : item.isSeen ? "Solving" : "Waiting"}</td>
                        <td>
                          <Button className="btn-sm" color="secondary" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          &nbsp;
                          <Button className="btn-sm" color="danger" onClick={() => this.showConfirmDelete(item.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {hasResults && totalPages > 1 && (
              <Pagination
                initialPage={0}
                totalPages={totalPages}
                forcePage={pageIndex - 1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    reportPagedListReducer: state.reportPagedListReducer
  }),
  {
    getReportList
  }
)(ReportListPage);
