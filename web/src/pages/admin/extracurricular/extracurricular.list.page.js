import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getExtracurricularList } from "../../../actions/extracurricular.list.action";
import ApiExtracurricular from "../../../api/api.extracurricular";
import ApiExtracurricularActivity from "../../../api/api.extracurricularActivity";
import { pagination } from "../../../constant/app.constant";
//import CKEditor from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import ReactHtmlParser from "react-html-parser";
//import CKEditorInput from "../../../components/common/ckeditor-input";

class ExtracurricularListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      extracurricularActivities: [],
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1);
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
    let title = "Create Extracurricular";
    let extracurricular = {
      studentId: ""
    };
    this.toggleModalInfo(extracurricular, title);
  };

  showUpdateModal = item => {
    console.log(item);
    item.extracurricularActivityId = item.id;
    item.studentId = "";
    let title = "Assign Extracurricular";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
    console.log(this.state.item);
  };

  onExtracurricularActivityChange = value => {
    let item = Object.assign({}, this.state.item);
    item.extracurricularActivityId = value;
    this.setState({ item });
  };

  onDetailChange = e => {
    let item = Object.assign({}, this.state.item);
    item.detail = e.editor.getData();
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
        this.getExtracurricularList();
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
      () => this.getExtracurricularList()
    );
  };

  getExtracurricularList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getExtracurricularList(params);
  };

  getExtracurricularActivityList = () => {
    ApiExtracurricularActivity.getAllExtracurricularActivity().then(values => {
      this.setState({ extracurricularActivities: values.sources });
    });
  };

  addExtracurricular = async () => {
    const { studentId, extracurricularActivityId } = this.state.item;
    const extracurricular = { studentId, extracurricularActivityId };
    try {
      await ApiExtracurricular.postExtracurricular(extracurricular);
      this.toggleModalInfo();
      this.getExtracurricularList();
      toastSuccess("The extracurricular has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This Extracurricular title is exist! Try another one");
    }
  };

  // updateExtracurricular = async () => {
  //   const { id, title, preview, detail, picture, extracurricularActivityId } = this.state.item;
  //   const extracurricular = { id, title, preview, detail, picture, extracurricularActivityId };
  //   try {
  //     await ApiExtracurricular.updateExtracurricular(extracurricular);
  //     this.toggleModalInfo();
  //     this.getExtracurricularList();
  //     toastSuccess("The extracurricular has been updated successfully");
  //   } catch (err) {
  //     console.log(err);
  //     toastError("This extracurricular title is exist! Try another one");
  //   }
  // };

  // deleteExtracurricular = async () => {
  //   try {
  //     await ApiExtracurricular.deleteExtracurricular(this.state.itemId);
  //     this.toggleDeleteModal();
  //     this.getExtracurricularList();
  //     toastSuccess("The extracurricular has been deleted successfully");
  //   } catch (err) {
  //     toastError(err + "");
  //   }
  // };

  saveExtracurricular = () => {
    // let { id } = this.state.item;
    // if (id) {
    //   this.updateExtracurricular();
    // } else {
    this.addExtracurricular();
    // }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveExtracurricular();
  }

  componentDidMount() {
    this.getExtracurricularList();
    this.getExtracurricularActivityList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, extracurricularActivities } = this.state;
    const { extracurricularPagedList } = this.props.extracurricularPagedListReducer;
    const { sources, pageIndex, totalPages } = extracurricularPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteExtracurricular}
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
                      <SelectInput
                        placeholder="--Select Extracurricular Activity--"
                        name="extracurricularActivityId"
                        title="Extracurricular Activity"
                        defaultValue={item ? item.id : undefined}
                        showSearch={true}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onExtracurricularActivityChange}
                        options={extracurricularActivities}
                        valueField="id"
                        nameField="name"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="studentId"
                        title="Student ID"
                        type="text"
                        required={true}
                        value={item.studentId}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* <Row>
                  <Col>
                    <FormGroup> */}
                {/* <ValidationInput
                        name="detail"
                        title="Detail"
                        type="text"
                        required={true}
                        value={item.detail}
                        onChange={this.onModelChange}
                      />
                    </FormGroup> */}

                {/* <CKEditor editor={ClassicEditor} onChange={this.onDetailChange} data={item.detail} /> */}
                {/* <CKEditorInput title="Detail" name="detail" data={item.detail} onChange={this.onDetailChange} />
                    </FormGroup>
                  </Col>
                </Row> */}

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
              {/* <Button onClick={this.showAddNew} className="btn btn-pill btn-success btn-sm">
                Create
              </Button> */}
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
                  <th>Extracurricular Activity</th>
                  <th>Faculty</th>
                  <th>Activity ID</th>
                  <th style={{ minWidth: 125 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  extracurricularActivities.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.organizedUnit}</td>
                        <td>{item.id}</td>
                        <td>
                          <Button className="btn-sm" color="success" onClick={() => this.showUpdateModal(item)}>
                            Assign Student
                          </Button>
                          &nbsp;
                          {/* <Button className="btn-sm" color="danger" onClick={() => this.showConfirmDelete(item.id)}>
                            Delete
                          </Button> */}
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
    extracurricularPagedListReducer: state.extracurricularPagedListReducer
  }),
  {
    getExtracurricularList
  }
)(ExtracurricularListPage);
