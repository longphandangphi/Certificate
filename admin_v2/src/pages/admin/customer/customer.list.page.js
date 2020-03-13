import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table, Label, Input } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import Datetime from "react-datetime";
import ValidationInput from "../../../components/common/validation-input";
import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getCustomerList } from "../../../actions/customer.list.action";
import ApiCustomer from "../../../api/api.customer";
import { pagination } from "../../../constant/app.constant";
import moment from "moment";
import gender from "../../../constant/gender";

class CustomerListPage extends Component {
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
    let title = "Create Customer";
    let customer = {
      name: "",
      phoneNumber: ""
    };
    this.toggleModalInfo(customer, title);
  };

  showUpdateModal = item => {
    let title = "Update Customer";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
    console.log(item);
  };

  onGenderChange = value => {
    let item = Object.assign({}, this.state.item);
    item.gender = value;
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
        this.getCustomerList();
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
      () => this.getCustomerList()
    );
  };

  getCustomerList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getCustomerList(params);
  };

  addCustomer = async () => {
    const { name, gender, phoneNumber, dateOfBirth } = this.state.item;
    const customer = { name, gender, phoneNumber, dateOfBirth };
    console.log(customer);
    try {
      await ApiCustomer.postCustomer(customer);
      this.toggleModalInfo();
      this.getCustomerList();
      toastSuccess("The customer has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updateCustomer = async () => {
    const { id, name, gender, phoneNumber, dateOfBirth } = this.state.item;
    const customer = { id, name, gender, phoneNumber, dateOfBirth };
    try {
      await ApiCustomer.updateCustomer(customer);
      this.toggleModalInfo();
      this.getCustomerList();
      toastSuccess("The customer has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  recordDeleteCustomer = async () => {
    try {
      await ApiCustomer.recordDeleteCustomer(this.state.itemId);
      this.toggleDeleteModal();
      this.getCustomerList();
      toastSuccess("The customer has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteCustomer = async () => {
    try {
      await ApiCustomer.deleteCustomer(this.state.itemId);
      this.toggleDeleteModal();
      this.getCustomerList();
      toastSuccess("The customer has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveCustomer = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateCustomer();
    } else {
      this.addCustomer();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveCustomer();
  }

  componentDidMount() {
    this.getCustomerList();
  }

  onDateOfBirthChange = el => {
    let inputValue = el._d;
    let item = Object.assign({}, this.state.item);
    item.dateOfBirth = inputValue;
    this.setState({ item });
  };

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { customerPagedList } = this.props.customerPagedListReducer;
    const { sources, pageIndex, totalPages } = customerPagedList;
    const hasResults = customerPagedList.sources && customerPagedList.sources.length > 0;

    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.recordDeleteCustomer}
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
                        name="gender"
                        title="Gender"
                        placeholder="--Select Gender--"
                        style={{ display: "block" }}
                        onChange={this.onGenderChange}
                        options={gender.GENDER}
                        valueField="id"
                        nameField="name"
                        defaultValue={gender.GENDER.filter(gend => {
                          if (gend.name === item.gender) {
                            return true;
                          }
                          return false;
                        }).map(gend => gend.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="phoneNumber"
                        title="Phone Number"
                        type="number"
                        required={true}
                        value={item.phoneNumber}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Label for="examplePassword"> Date Of Birth:</Label>
                    <FormGroup>
                      <Datetime
                        defaultValue={
                          item.dateOfBirth
                            ? moment(item.dateOfBirth)
                                .add(7, "h")
                                .format("DD-MM-YYYY")
                            : ""
                        }
                        dateFormat="DD-MM-YYYY"
                        timeFormat=""
                        onChange={this.onDateOfBirthChange}
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
                placeholder="Searching..."
              />
            </div>
            <Table className="admin-table" responsive bordered>
              <thead>
                <tr>
                  <th>Customer name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Birth Day</th>
                  <th>Total PayMent</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {moment(item.dateOfBirth)
                            .add(7, "h")
                            .format("DD-MM-YYYY")}
                        </td>
                        <td>{item.totalPayment}</td>
                        <td>{item.type}</td>
                        <td>
                          <Button className="btn-sm" color="secondary" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
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
    customerPagedListReducer: state.customerPagedListReducer
  }),
  {
    getCustomerList
  }
)(CustomerListPage);
