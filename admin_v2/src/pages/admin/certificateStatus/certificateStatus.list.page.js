import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
//import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getCertificateStatusList } from "../../../actions/certificateStatus.list.action";
import { getStudentList } from "../../../actions/student.list.action";
import ApiCertificateStatus from "../../../api/api.certificateStatus";
//import ApiStudent from "../../../api/api.student";
import { pagination, IS_COMPLETE } from "../../../constant/app.constant";
import SelectInput from "../../../components/common/select-input";
import ApiClass from "../../../api/api.class";

class CertificateStatusListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      sortByClass: [],
      classes: [],
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
    // console.log(item.certificateStatus,"LOL ITEM")
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
        this.getStudentList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  onNationalDefenseAndSecurityChange = value => {
    let item = Object.assign({}, this.state.item);
    item.nationalDefenseAndSecurity = value;
    this.setState({ item });
  };

  onPhysicalEducationChange  = value => {
    let item = Object.assign({}, this.state.item);
    item.physicalEducation = value;
    this.setState({ item });
  };

  onLanguageChange = value => {
    let item = Object.assign({}, this.state.item);
    item.language = value;
    this.setState({ item });
  };

  onInformaticsChange = value => {
    let item = Object.assign({}, this.state.item);
    item.informatics = value;
    this.setState({ item });
  };

  onExtracurricularPointChange = value => {
    let item = Object.assign({}, this.state.item);
    item.extracurricularPoint = value;
    this.setState({ item });
  };

  onSortByClassChange = (e) => {
    console.log(e,"Sort By Class");
    this.setState({ sortByClass : e});
  }

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: e.selected + 1
        }
      },
      () => this.getStudentList()
    );
  };

  getStudentList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getStudentList(params);
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
      this.getStudentList();
      toastSuccess("The Certificate Status has been created successfully");
    } catch (err) {
      console.log(err);
      toastError("This CertificateStatus name is exist!");
    }
  };

  updateCertificateStatus = async () => {
    const { id, nationalDefenseAndSecurity, 
      physicalEducation, 
      language, 
      informatics,
      extracurricularPoint
    } = this.state.item;

    const certificateStatus = { id, 
      nationalDefenseAndSecurity, 
      physicalEducation, 
      language, 
      informatics,
      extracurricularPoint
    };
    try {
      await ApiCertificateStatus.updateCertificateStatus(certificateStatus);
      this.toggleModalInfo();
      this.getStudentList();
      toastSuccess("The Certificate Status has been updated successfully");
    } catch (err) {
      toastError("Error occurred!");
    }
  };

  deleteCertificateStatus = async () => {
    try {
      await ApiCertificateStatus.deleteCertificateStatus(this.state.itemId);
      this.toggleDeleteModal();
      this.getStudentList();
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
    this.getStudentList();
    this.getClassList();
  }

  getClassList = () => {
    ApiClass.getAllClass().then(values => {
      this.setState({ 
        classes: values.sources
       });
    });
  };

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, classes, sortByClass } = this.state;
    const { studentPagedList } = this.props.studentPagedListReducer;
    const sources =  studentPagedList;
    const { pageIndex, totalPages } = studentPagedList;
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
                        name="nationalDefenseAndSecurity"
                        title="National Defense And Security Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.nationalDefenseAndSecurity) {
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
                        name="physicalEducation"
                        title="Physical Education Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.physicalEducation) {
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
                        name="language"
                        title="Language Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.language) {
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
                        name="informatics"
                        title="Informatics Certificate Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.informatics) {
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
                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="extracurricularPoint"
                        title="Extracurricular Point Status"
                        defaultValue={IS_COMPLETE.filter(comp => {
                          if (comp.id === item.extracurricularPoint) {
                            return true; 
                          }
                          return false;
                        }).map(comp => comp.id)}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onExtracurricularPointChange}
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
                placeholder="StudentId..."
              />
              <SelectInput
                placeholder="--Class--"
                name="sortByClass"
                title="Class:"
                defaultValue={classes ? classes.id : undefined}
                showSearch={true}
                style={{ display: "block" }}
                //required={true}
                onChange={this.onSortByClassChange}
                options={classes}
                valueField="id"
                nameField="name"
              />
            </div>
            <Table className="admin-table table-hover table-striped" responsive bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>National Defense And Security</th>
                  <th>PhysicalEducation</th>
                  <th>Language</th>
                  <th>Informatics</th>
                  <th>Extracurricular Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources
                  .filter(student => {
                    if( student.class.id.includes(sortByClass)){
                      console.log("TRUE");
                      return true;
                    }
                    else {
                      console.log("False");
                      return false;
                    }
                  }) 
                  .map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.lastName + " " + item.firstName}</td>

                        <td className={item.certificateStatus.nationalDefenseAndSecurity ? "text-success" : "text-danger"}>
                          {item.certificateStatus.nationalDefenseAndSecurity ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.certificateStatus.physicalEducation ? "text-success" : "text-danger"}>
                          {item.certificateStatus.physicalEducation ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.certificateStatus.language ? "text-success" : "text-danger"}>
                          {item.certificateStatus.language ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.certificateStatus.informatics ? "text-success" : "text-danger"}>
                          {item.certificateStatus.informatics ? "Completed" : "Not yet"}
                        </td>
                        <td className={item.certificateStatus.extracurricularPoint ? "text-success" : "text-danger"}>
                          {item.certificateStatus.extracurricularPoint ? "Completed" : "Not yet"}
                        </td>

                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item.certificateStatus)}>
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
    certificateStatusPagedListReducer: state.certificateStatusPagedListReducer,
    studentPagedListReducer: state.studentPagedListReducer
  }),
  {
    getCertificateStatusList,
    getStudentList
  }
)(CertificateStatusListPage);
