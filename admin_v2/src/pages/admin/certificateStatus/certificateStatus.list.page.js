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
import { getCertificateStatusList } from "../../../actions/certificateStatus.list.action";
import ApiCertificateStatus from "../../../api/api.certificateStatus";
import ApiStudent from "../../../api/api.student";
import { pagination, IS_COMPLETE } from "../../../constant/app.constant";
import SelectInput from "../../../components/common/select-input";

class CertificateStatusListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      params: {
        offset: pagination.initialPage,
        limit: pagination.defaultTake
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
    let title = "Create CertificateStatus";
    let certificateStatus = {
      name: "",
      description: ""
    };
    this.toggleModalInfo(certificateStatus, title);
  };

  showUpdateModal = item => {
    let title = "Update Certificate Status";
    this.toggleModalInfo(item, title);
  };

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
        this.getCertificateStatusList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  onNationalDefenseAndSecurityChange = value => {
    let item = Object.assign({}, this.state.item);
    item.nationalDefenseAndSecurityCertificateStatus = value;
    this.setState({ item });
  };

  onPhysicalEducationChange  = value => {
    let item = Object.assign({}, this.state.item);
    item.physicalEducationCertificateStatus = value;
    this.setState({ item });
  };

  onLanguageChange = value => {
    let item = Object.assign({}, this.state.item);
    item.languageCertificateStatus = value;
    this.setState({ item });
  };

  onInformaticsChange = value => {
    let item = Object.assign({}, this.state.item);
    item.informaticsCertificateStatus = value;
    this.setState({ item });
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: e.selected + 1
        }
      },
      () => this.getCertificateStatusList()
    );
  };

  getCertificateStatusList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getCertificateStatusList(params);
  };

  addCertificateStatus = async () => {
    console.log("state ==================");
    console.log(this.state);
    const { name, description } = this.state.item;
    const certificateStatus = { name, description };
    try {
      let response = await ApiCertificateStatus.postCertificateStatus(certificateStatus);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been created successfully");
    } catch (err) {
      console.log(err);
      toastError("This CertificateStatus name is exist!");
    }
  };

  updateCertificateStatus = async () => {
    const { id, nationalDefenseAndSecurityCertificateStatus, 
      physicalEducationCertificateStatus, 
      languageCertificateStatus, 
      informaticsCertificateStatus 
    } = this.state.item;

    const certificateStatus = { id, 
      nationalDefenseAndSecurityCertificateStatus, 
      physicalEducationCertificateStatus, 
      languageCertificateStatus, 
      informaticsCertificateStatus 
    };
    try {
      await ApiCertificateStatus.updateCertificateStatus(certificateStatus);
      this.toggleModalInfo();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been updated successfully");
    } catch (err) {
      toastError("This CertificateStatus name is exist!");
    }
  };

  deleteCertificateStatus = async () => {
    try {
      await ApiCertificateStatus.deleteCertificateStatus(this.state.itemId);
      this.toggleDeleteModal();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveCertificateStatus = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateCertificateStatus();
    } else {
      this.addCertificateStatus();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveCertificateStatus();
  }

  componentDidMount() {
    this.getCertificateStatusList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { certificateStatusPagedList } = this.props.certificateStatusPagedListReducer;
    const { sources, pageIndex, totalPages } = certificateStatusPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteCertificateStatus}
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
                        name="nationalDefenseAndSecurityCertificateStatus"
                        title="National Defense And Security Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.nationalDefenseAndSecurityCertificateStatus) {
                            return true; 
                          }
                          return false;
                        }).map(comp => comp.id)}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onNationalDefenseAndSecurityChange}
                        options={IS_COMPLETE}
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
                        name="physicalEducationCertificateStatus"
                        title="Physical Education Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.physicalEducationCertificateStatus) {
                            return true; 
                          }
                          return false;
                        }).map(comp => comp.id)}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onPhysicalEducationChange}
                        options={IS_COMPLETE}
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
                        name="languageCertificateStatus"
                        title="Language Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.languageCertificateStatus) {
                            return true; 
                          }
                          return false;
                        }).map(comp => comp.id)}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onLanguageChange}
                        options={IS_COMPLETE}
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
                        name="informaticsCertificateStatus"
                        title="Informatics Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.informaticsCertificateStatus) {
                            return true; 
                          }
                          return false;
                        }).map(comp => comp.id)}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onInformaticsChange}
                        options={IS_COMPLETE}
                        valueField="id"
                        nameField="name"
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
                  <th></th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>GDQP</th>
                  <th>GDTC</th>
                  <th>CCNN</th>
                  <th>CCTH</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.studentViewModel.id}</td>
                        <td>{item.studentViewModel.firstName + " " + item.studentViewModel.lastName}</td>

                        <td className={item.nationalDefenseAndSecurityCertificateStatus ? "text-success" : "text-danger"}>
                          {item.nationalDefenseAndSecurityCertificateStatus ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.physicalEducationCertificateStatus ? "text-success" : "text-danger"}>
                          {item.physicalEducationCertificateStatus ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.languageCertificateStatus ? "text-success" : "text-danger"}>
                          {item.languageCertificateStatus ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.informaticsCertificateStatus ? "text-success" : "text-danger"}>
                          {item.informaticsCertificateStatus ? "Completed" : "Not yet"}
                        </td>

                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)}>
                            Change Status
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
    certificateStatusPagedListReducer: state.certificateStatusPagedListReducer
  }),
  {
    getCertificateStatusList
  }
)(CertificateStatusListPage);
