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
import { pagination,  } from "../../../constant/app.constant";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

class ReportListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      params: {
        offset: pagination.initialPage,
        limit: pagination.defaultTake,
        isDesc: pagination.defaultSort
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
    let title = "Report detail";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  // onReportCategoryChange = value => {
  //   let item = Object.assign({}, this.state.item);
  //   item.reportCategoryId = value;
  //   this.setState({ item });
  // };

  search = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: 1
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
          offset: e.selected + 1
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

  // addReport = async () => {
  //   console.log("add: state ==================");
  //   console.log(this.state);
  //   const { title, preview, detail, picture, reportCategoryId } = this.state.item;
  //   const report = { title, preview, detail, picture, reportCategoryId };
  //   try {
  //     let response = await ApiReport.postReport(report);
  //     console.log("response");
  //     console.log(response);
  //     this.toggleModalInfo();
  //     this.getReportList();
  //     toastSuccess("The report has been created successfully");
  //   } catch (err) {
  //     console.log("err");
  //     console.log(err);
  //     toastError("This Report title is exist! Try another one");
  //   }
  // };

  updateReport = async () => {
    const { id, studentViewModel, subject, content, response } = this.state.item;
    var studentId = studentViewModel.id;
    const report = { id, studentId, subject, content, response };
    try {
      await ApiReport.updateReport(report);
      this.toggleModalInfo();
      this.getReportList();
      toastSuccess("The report has been updated successfully");
    } catch (err) {
      toastError("Invalid response!");
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
              <Row>
                <Col>
                  {/* <label>{item.studentViewModel.id}</label> */}
                </Col>
              </Row>
            {/* <label>Student ID: {item.studentViewModel.id}</label>
            <label>Student : {item.studentViewModel.firstName+item.studentViewModel.lastName}</label> */}
              <Form
                onSubmit={e => this.onSubmit(e)}
                ref={c => {
                  this.form = c;
                }}
              >
                <Row>
                  <Col>
                    {/* <FormGroup>
                      <ValidationInput
                        name="subject"
                        title="Stubject"
                        type="text"
                        required={true}
                        value={item.subject}
                        onChange={this.onModelChange}
                      />
                    </FormGroup> */}
                    <h5>Subject:</h5>
                    {item.subject}
                  </Col>
                </Row>
                    <br></br>
                <Row>
                  <Col>
                    {/* <FormGroup>
                      <ValidationInput
                        name="content"
                        title="Report content "
                        type="text"
                        required={true}
                        value={item.content}
                        onChange={this.onModelChange}
                      />
                    </FormGroup> */}
                    <h5>Report content:</h5>
                    {ReactHtmlParser(item.content)}
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="response"
                        title="Response"
                        type="text"
                        //required={true}
                        value={item.response}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button color="success" type="submit">
                    Confirm response
                  </Button>
                  &nbsp;
                  <Button color="secondary" onClick={this.toggleModalInfo}>
                    Back
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
                  <th></th>
                  <th>Create On</th>
                  <th>Report subject</th>
                  {/* <th>Content</th> */}
                  <th style={{minWidth:270}}>Student ID</th>
                  <th>Student's Name</th>
                  <th>Response content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          {moment(item.createOn)
                            .add(7, "h")
                            .format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td>{item.subject}</td>
                        {/* <td>{item.content}</td> */}
                        <td>{item.studentViewModel.id}</td>
                        <td>{item.studentViewModel.firstName + " " + item.studentViewModel.lastName}</td>
                        <td className={item.response === "" ? "text-danger" : "text-success"}>{item.response === "" ? "Not yet" : item.response}</td>
                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)} style={{marginBottom:3}}>
                            View detail
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
