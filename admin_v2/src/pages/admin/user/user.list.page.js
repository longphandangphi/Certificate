import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Label, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getUserList } from "../../../actions/user.list.action";
import ApiUser from "../../../api/api.user";
import { pagination } from "../../../constant/app.constant";
import { Select } from "antd";
import ApiRole from "../../../api/api.role";

class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      roles: [],
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
    let title = "Create Item";
    let item = {
      name: "",
      roles: ""
    };
    this.toggleModalInfo(item, title);
  };

  showUpdateModal = item => {
    let title = "Update User";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  onRoleChange = value => {
    let item = Object.assign({}, this.state.item);
    item.roleIds = value;
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
        this.getUserList();
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
      () => this.getUserList()
    );
  };

  getUserList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getUserList(params);
  };

  getRoleList = () => {
    ApiRole.getAllRole().then(values => {
      this.setState({ roles: values.sources });
    });
  };

  updateUser = async () => {
    const { id, username, fullName, email, roleIds } = this.state.item;
    const user = { id, username, fullName, email, roleIds };
    try {
      console.log(user, "USER");
      await ApiUser.updateUser(user);
      this.toggleModalInfo();
      this.getUserList();
      toastSuccess("The user has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteUser = async () => {
    try {
      await ApiUser.deleteUser(this.state.itemId);
      this.toggleDeleteModal();
      this.getUserList();
      toastSuccess("The user has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveUser = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateUser();
    } else {
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveUser();
  }

  componentDidMount() {
    this.getUserList();
    this.getRoleList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, roles } = this.state;
    const { userPagedList } = this.props.userPagedListReducer;
    const { sources, pageIndex, totalPages } = userPagedList;
    const hasResults = userPagedList.sources && userPagedList.sources.length > 0;
    const { Option } = Select;

    return (
      <div className="animated fadeIn">
        <ModalConfirm clickOk={this.deleteUser} isShowModal={isShowDeleteModal} toggleModal={this.toggleDeleteModal} />

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
                        title="UserName"
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
                        name="fullName"
                        title="FullName"
                        type="text"
                        required={true}
                        value={item.fullName}
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
                        type="text"
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
                      <Label className="label-input">
                        Role<span className="text-danger"> *</span>
                      </Label>
                      <br />
                      <Select
                        mode="multiple"
                        style={{ display: "block" }}
                        placeholder="---Please select---"
                        onChange={this.onRoleChange}
                        defaultValue={item.roles ? item.roles.map(role => role.id) : undefined}
                      >
                        {roles.map((role, i) => (
                          <Option key={i} value={role.id}>
                            {role.name}
                          </Option>
                        ))}
                      </Select>
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
                  <th>Name</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.roles.map(role => role.name) + "; "}</td>
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
    userPagedListReducer: state.userPagedListReducer
  }),
  {
    getUserList
  }
)(UserListPage);
