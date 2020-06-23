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
import { getStudentList } from "../../../actions/student.list.action";
import ApiStudent from "../../../api/api.student";
import ApiClass from "../../../api/api.class";
import ApiSpecialty from "../../../api/api.specialty";
import { pagination } from "../../../constant/app.constant";

class StudentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      classes: [],
      specialties: [],
      sortByClass: [],
      sortBelowPoint: 1000,
      itemId: null,
      params: {
        offset: pagination.initialPage,
        limit: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 500);
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
    let title = "Create Student";
    let student = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      placeOfBirth: "",
      classId: "",
      specialtyId: "",

    };
    this.toggleModalInfo(student, title);
  };

  showUpdateModal = item => {
    let title = "Update Student";
    item.classId = item.class.id;
    item.specialtyId = item.specialty.id;
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };
  

  onClassChange = value => {
    let item = Object.assign({}, this.state.item);
    item.classId = value;
    this.setState({ item });
  };

  onSpecialtyChange = value => {
    let item = Object.assign({}, this.state.item);
    item.specialtyId = value;
    this.setState({ item });
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

  onSortByClassChange = (e) => {
    console.log(e,"Sort By Class");
    this.setState({ sortByClass : e});
  }

  onSortBelow = (e) => {
    console.log(e.target.value,"SORT BELOW");
    this.setState({ sortBelowPoint : e.target.value});
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

  getClassList = () => {
    ApiClass.getAllClass().then(values => {
      this.setState({ 
        classes: values.sources
       });
    });
  };

  getSpecialtyList = () => {
    ApiSpecialty.getAllSpecialty().then(values => {
      this.setState({ specialties: values.sources });
    });
  };

  addStudent = async () => {
    // console.log("add: state ==================");
    // console.log(this.state);
    const { username, firstName, lastName, email, password, placeOfBirth, classId, specialtyId } = this.state.item;
    const student = { username, firstName, lastName, email, password, placeOfBirth, classId, specialtyId };
    try {
      let response = await ApiStudent.postStudent(student);
      // console.log("response");
      // console.log(response);
      this.toggleModalInfo();
      this.getStudentList();
      toastSuccess("The student has been created successfully");
    } catch (err) {
      // console.log("err");
      // console.log(err);
      toastError("Create fail, please try again!");
    }
  };

  updateStudent = async () => {
    const { id, name, description, classId, specialtyId } = this.state.item;
    const student = { id, name, description, classId, specialtyId };
    try {
      await ApiStudent.updateStudent(student);
      this.toggleModalInfo();
      this.getStudentList();
      toastSuccess("The student has been updated successfully");
    } catch (err) {
      toastError("This Class name is exist! Try another one");
    }
  };

  deleteStudent = async () => {
    try {
      await ApiStudent.deleteStudent(this.state.itemId);
      this.toggleDeleteModal();
      this.getStudentList();
      toastSuccess("The student has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveStudent = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveStudent();
  }

  componentDidMount() {
    this.getStudentList();
    this.getClassList();
    this.getSpecialtyList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, classes, specialties, sortByClass, sortBelowPoint } = this.state;
    const { studentPagedList } = this.props.studentPagedListReducer;
    const sources = studentPagedList;
    const { pageIndex, totalPages } = studentPagedList;
    console.log(sources,"SOURCE");
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteStudent}
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
                        name="username"
                        title="Username"
                        type="text"
                        required={true}
                        value={item.username}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="firstName"
                        title="First Name"
                        type="text"
                        required={true}
                        value={item.firstName}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="lastName"
                        title="Last Name"
                        type="text"
                        required={true}
                        value={item.lastName}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="email"
                        title="Email"
                        type="email"
                        required={true}
                        value={item.email}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="password"
                        title="Password"
                        type="password"
                        required={true}
                        value={item.password}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="placeOfBirth"
                        title="Place Of Birth"
                        type="text"
                        required={true}
                        value={item.placeOfBirth}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        placeholder="--Select Class--"
                        name="class"
                        title="Class"
                        defaultValue={item.class ? item.class.id : undefined}
                        showSearch={true}
                        style={{display: "block"}}
                        required={true}
                        onChange={this.onClassChange}
                        options={classes}
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
                        placeholder="--Select Specialty--"
                        name="specialty"
                        title="Specialty"
                        defaultValue={item.specialty ? item.specialty.id : undefined}
                        showSearch={true}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onSpecialtyChange}
                        options={specialties}
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
              <Button onClick={this.showAddNew} className="btn btn-pill btn-success btn-sm">
                Create
              </Button>

              <input
                onChange={this.onSearchChange}
                className="form-control form-control-sm"
                placeholder="Student ID"
              />

              <SelectInput
                placeholder="--Class--"
                name="sortByClass"
                //title="OrderBy"
                defaultValue={classes ? classes.id : undefined}
                showSearch={true}
                style={{ display: "block" }}
                //required={true}
                onChange={this.onSortByClassChange}
                options={classes}
                valueField="id"
                nameField="name"
              />

              {/* <div>
              <Input
                type="number"
                defaultValue="1000"
                onChange={this.onSortBelow}
                className="form-control form-control-sm"
                placeholder="--Below--"
              />
              </div> */}
              <input
                onChange={this.onSortBelow}
                defaultValue= "1000"
                className="form-control form-control-sm"
                placeholder="Below Point.."
                type="number"
              />

              
            </div>
            <Table className="admin-table table-hover table-striped" responsive bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Student Id</th>
                  <th>Student name</th>
                  <th>Class</th>
                  <th>Specialty</th>
                  <th>Extracurricular Point</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {hasResults && sortByClass && sortBelowPoint &&
                  sources
                  .filter(student => {
                    if( student.class.id.includes(sortByClass) && student.extracurricularPoint < sortBelowPoint){
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
                        <td>{item.lastName +" "+ item.firstName}</td>
                        <td>{item.class.name}</td>
                        <td>{item.specialty.name}</td>
                        <td>{item.extracurricularPoint}</td>
                        {/* <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          &nbsp;
                          <Button className="btn-sm" color="danger" onClick={() => this.showConfirmDelete(item.id)}>
                            Delete
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* {hasResults && totalPages > 1 && (
              <Pagination
                initialPage={0}
                totalPages={totalPages}
                forcePage={pageIndex - 1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
              />
            )} */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    studentPagedListReducer: state.studentPagedListReducer
  }),
  {
    getStudentList
  }
)(StudentListPage);
