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
import { getSpecialtyList } from "../../../actions/specialty.list.action";
import ApiSpecialty from "../../../api/api.specialty";
import ApiMajor from "../../../api/api.major";
import ApiStandardCertificate from "../../../api/api.standardCertificate";
import { pagination } from "../../../constant/app.constant";

class SpecialtyListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      majors: [],
      standardOfCertificates: [],
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
    let title = "Create Specialty";
    let specialty = {
      name: "",
      description: ""
    };
    this.toggleModalInfo(specialty, title);
  };

  showUpdateModal = item => {
    let title = "Update Specialty";
    item.majorId = item.major.id;
    item.standardOfCertificateId = item.standardOfCertificate.id;
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  onMajorChange = value => {
    let item = Object.assign({}, this.state.item);
    item.majorId = value;
    this.setState({ item });
  };

  onStandardCertificateChange = value => {
    let item = Object.assign({}, this.state.item);
    item.standardOfCertificateId = value;
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
        this.getSpecialtyList();
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
      () => this.getSpecialtyList()
    );
  };

  getSpecialtyList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getSpecialtyList(params);
  };

  getMajorList = () => {
    ApiMajor.getAllMajor().then(values => {
      this.setState({ majors: values.sources });
    });
  };

  getStandardCertificateList = () => {
    ApiStandardCertificate.getAllStandardCertificate().then(values => {
      this.setState({ standardOfCertificates: values.sources });
    });
  };

  addSpecialty = async () => {
    console.log("add: state ==================");
    console.log(this.state);
    const { name, majorId, standardOfCertificateId, description } = this.state.item;
    const specialty = { name, majorId, standardOfCertificateId, description };
    try {
      let response = await ApiSpecialty.postSpecialty(specialty);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getSpecialtyList();
      toastSuccess("The specialty has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This Specialty name is exist! Try another one");
    }
  };

  updateSpecialty = async () => {
    const { id, name, description, majorId, standardOfCertificateId } = this.state.item;
    const specialty = { id, name, description, majorId, standardOfCertificateId };
    try {
      await ApiSpecialty.updateSpecialty(specialty);
      this.toggleModalInfo();
      this.getSpecialtyList();
      toastSuccess("The specialty has been updated successfully");
    } catch (err) {
      toastError("This Major name is exist! Try another one");
    }
  };

  deleteSpecialty = async () => {
    try {
      await ApiSpecialty.deleteSpecialty(this.state.itemId);
      this.toggleDeleteModal();
      this.getSpecialtyList();
      toastSuccess("The specialty has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveSpecialty = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateSpecialty();
    } else {
      this.addSpecialty();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveSpecialty();
  }

  componentDidMount() {
    this.getSpecialtyList();
    this.getMajorList();
    this.getStandardCertificateList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, majors, standardOfCertificates } = this.state;
    const { specialtyPagedList } = this.props.specialtyPagedListReducer;
    const { sources, pageIndex, totalPages } = specialtyPagedList;
    console.log(sources,"SOURCE");
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteSpecialty}
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
                      <SelectInput
                        placeholder="--Select Major--"
                        name="major"
                        title="Major"
                        defaultValue={item.major ? item.major.id : undefined}
                        showSearch={true}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onMajorChange}
                        options={majors}
                        valueField="id"
                        nameField="name"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        placeholder="--Select Standard Certificate--"
                        name="standardOfCertificate"
                        title="Standard Certificate"
                        defaultValue={item.standardOfCertificate ? item.standardOfCertificate.id : undefined}
                        showSearch={true}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onStandardCertificateChange}
                        options={standardOfCertificates}
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
                        name="description"
                        title="Description"
                        type="text"
                        required={true}
                        value={item.description}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button color="danger" type="submit">
                    Confirm
                  </Button>{" "}
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
                placeholder="Searching by Specialty..."
              />
            </div>
            <Table className="admin-table" responsive bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Specialty name</th>
                  <th>Major name</th>
                  <th>Description</th>
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
                        <td>{item.major.name}</td>
                        <td>{item.description}</td>
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
    specialtyPagedListReducer: state.specialtyPagedListReducer
  }),
  {
    getSpecialtyList
  }
)(SpecialtyListPage);
