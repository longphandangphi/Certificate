import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getExtracurricularActivityList } from "../../../actions/extracurricularActivity.list.action";
import ApiExtracurricularActivity from "../../../api/api.extracurricularActivity";
import { pagination } from "../../../constant/app.constant";

class ExtracurricularActivityListPage extends Component {
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
    let title = "Create ExtracurricularActivity";
    let extracurricularActivity = {
      name: "",
      semester: "",
      organizedTime: "",
      expectedLocation: "",
      organizedUnit: "",
      point: 0
    };
    this.toggleModalInfo(extracurricularActivity, title);
  };

  showUpdateModal = item => {
    let title = "Update ExtracurricularActivity";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  onExtracurricularActivityCategoryChange = value => {
    let item = Object.assign({}, this.state.item);
    item.extracurricularActivityCategoryId = value;
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
        this.getExtracurricularActivityList();
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
      () => this.getExtracurricularActivityList()
    );
  };

  getExtracurricularActivityList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getExtracurricularActivityList(params);
  };

  addExtracurricularActivity = async () => {
    console.log("add: state ==================");
    console.log(this.state);
    const { name, semester, organizedTime, expectedLocation, organizedUnit, point } = this.state.item;
    const extracurricularActivity = { name, semester, organizedTime, expectedLocation, organizedUnit, point };
    try {
      let response = await ApiExtracurricularActivity.postExtracurricularActivity(extracurricularActivity);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getExtracurricularActivityList();
      toastSuccess("The extracurricularActivity has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This ExtracurricularActivity title is exist! Try another one");
    }
  };

  updateExtracurricularActivity = async () => {
    const { id, name, semester, organizedTime, expectedLocation, organizedUnit, point } = this.state.item;
    const extracurricularActivity = { id, name, semester, organizedTime, expectedLocation, organizedUnit, point };
    try {
      await ApiExtracurricularActivity.updateExtracurricularActivity(extracurricularActivity);
      this.toggleModalInfo();
      this.getExtracurricularActivityList();
      toastSuccess("The extracurricularActivity has been updated successfully");
    } catch (err) {
      toastError("This ExtracurricularActivityCategory title is exist! Try another one");
    }
  };

  deleteExtracurricularActivity = async () => {
    try {
      await ApiExtracurricularActivity.deleteExtracurricularActivity(this.state.itemId);
      this.toggleDeleteModal();
      this.getExtracurricularActivityList();
      toastSuccess("The extracurricularActivity has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveExtracurricularActivity = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateExtracurricularActivity();
    } else {
      this.addExtracurricularActivity();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveExtracurricularActivity();
  }

  componentDidMount() {
    this.getExtracurricularActivityList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { extracurricularActivityPagedList } = this.props.extracurricularActivityPagedListReducer;
    const { sources, pageIndex, totalPages } = extracurricularActivityPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteExtracurricularActivity}
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
                        name="name"
                        title="Name"
                        type="text"
                        required={true}
                        value={item.name}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="semester"
                        title="Semester"
                        type="text"
                        required={true}
                        value={item.semester}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="organizedTime"
                        title="Organized Time"
                        type="text"
                        required={true}
                        value={item.organizedTime}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="expectedLocation"
                        title="Expected Location"
                        type="text"
                        required={true}
                        value={item.expectedLocation}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="organizedUnit"
                        title="Organized Unit"
                        type="text"
                        required={true}
                        value={item.organizedUnit}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="point"
                        title="Point"
                        type="number"
                        min={1}
                        required={true}
                        value={item.point}
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
                  <th>Extracurricular activity name</th>
                  <th>Semester</th>
                  <th>OrganizedTime</th>
                  <th>ExpectedLocation</th>
                  <th>OrganizedUnit</th>
                  <th>Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.semester}</td>
                        <td>{item.organizedTime}</td>
                        <td>{item.expectedLocation}</td>
                        <td>{item.organizedUnit}</td>
                        <td>{item.point}</td>
                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          {/* &nbsp;
                          <Button className="btn-sm" color="danger" onClick={() => this.showConfirmDelete(item.id)}>
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
    extracurricularActivityPagedListReducer: state.extracurricularActivityPagedListReducer
  }),
  {
    getExtracurricularActivityList
  }
)(ExtracurricularActivityListPage);
