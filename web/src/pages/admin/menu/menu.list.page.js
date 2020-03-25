import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ModalDeleted from "../../../components/modal/modal-deleted";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getMenuList, getDeletedMenuList } from "../../../actions/menu.list.action";
import ApiMenu from "../../../api/api.menu";
import moment from "moment";
import { pagination } from "../../../constant/app.constant";

class MenuListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      isShowDeletedListModal: false,
      item: {},
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1000);
    this.delayedCallbackDeleted = lodash.debounce(this.searchDeleted, 1000);
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

  toggleModalDeletedList = () => {
    this.setState(prevState => ({
      isShowDeletedListModal: !prevState.isShowDeletedListModal,
      formTitle: "Deleted List"
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
    let title = "Create Menu";
    let menu = {
      name: ""
    };
    this.toggleModalInfo(menu, title);
  };

  showUpdateModal = item => {
    let title = "Update Menu";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
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
        this.getMenuList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  searchDeleted = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: 1
        },
        query: e.target.value
      },
      () => {
        this.getDeletedMenuList();
      }
    );
  };

  onSearchDeletedChange = e => {
    e.persist();
    this.delayedCallbackDeleted(e);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: e.selected + 1
        }
      },
      () => this.getMenuList()
    );
  };

  getMenuList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getMenuList(params);
  };

  getDeletedMenuList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getDeletedMenuList(params);
  };

  addMenu = async () => {
    const { name } = this.state.item;
    const menu = { name };
    try {
      await ApiMenu.postMenu(menu);
      this.toggleModalInfo();
      this.getMenuList();
      toastSuccess("The menu has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updateMenu = async () => {
    const { id, name } = this.state.item;
    const menu = { id, name };
    try {
      await ApiMenu.updateMenu(menu);
      this.toggleModalInfo();
      this.getMenuList();
      toastSuccess("The menu has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  recordDeleteMenu = async id => {
    try {
      await ApiMenu.recordDeleteMenu(id);
      this.getMenuList();
      this.getDeletedMenuList();
      toastSuccess("Successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteMenu = async () => {
    try {
      await ApiMenu.deleteMenu(this.state.itemId);
      this.toggleDeleteModal();
      this.getDeletedMenuList();
      toastSuccess("The menu has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveMenu = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateMenu();
    } else {
      this.addMenu();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveMenu();
  }

  componentDidMount() {
    this.getMenuList();
    this.getDeletedMenuList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, isShowDeletedListModal, item } = this.state;
    const { menuPagedList, deletedMenuPagedList } = this.props.menuPagedListReducer;
    const { sources, pageIndex, totalPages } = menuPagedList;
    const deletedSources = deletedMenuPagedList.sources;
    const deletedPageIndex = deletedMenuPagedList.pageIndex;
    const deletedTotalPages = deletedMenuPagedList.totalPages;
    const hasResults = menuPagedList.sources && menuPagedList.sources.length > 0;
    const deletedhasResults = deletedMenuPagedList.sources && deletedMenuPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm clickOk={this.deleteMenu} isShowModal={isShowDeleteModal} toggleModal={this.toggleDeleteModal} />

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

        <ModalDeleted title={this.state.formTitle} isShowModal={isShowDeletedListModal} hiddenFooter>
          <div className="modal-wrapper">
            <div className="form-wrapper">
              <input
                onChange={this.onSearchDeletedChange}
                className="form-control form-control-sm"
                placeholder="Searching..."
                style={{ marginBottom: 20 }}
              />
              <Table className="admin-table" responsive bordered>
                <thead>
                  <tr>
                    <th>Menu name</th>
                    <th>Deleted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedhasResults &&
                    deletedSources.map(item => {
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>
                            {moment(item.deletedOn)
                              .add(7, "h")
                              .format("DD-MM-YYYY hh:mm A")}
                          </td>
                          <td>
                            <Button className="btn-sm" color="success" onClick={() => this.recordDeleteMenu(item.id)}>
                              Restore
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
                  totalPages={deletedTotalPages}
                  forcePage={deletedPageIndex - 1}
                  pageRangeDisplayed={2}
                  onPageChange={this.handlePageClick}
                />
              )}

              <div className="text-center">
                <Button color="secondary" onClick={this.toggleModalDeletedList}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalDeleted>

        <Row>
          <Col xs="12">
            <div className="flex-container header-table">
              <Button onClick={this.showAddNew} className="btn btn-pill btn-success btn-sm">
                Create
              </Button>
              <Button onClick={this.toggleModalDeletedList} className="btn btn-pill btn-danger btn-sm">
                Deleted List
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
                  <th>Menu name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <Button className="btn-sm" color="secondary" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          <Button className="btn-sm" color="danger" onClick={() => this.recordDeleteMenu(item.id)}>
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
    menuPagedListReducer: state.menuPagedListReducer
  }),
  {
    getMenuList,
    getDeletedMenuList
  }
)(MenuListPage);
