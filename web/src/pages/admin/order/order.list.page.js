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
import { getOrderList, getDeletedOrderList } from "../../../actions/order.list.action";
import ApiOrder from "../../../api/api.order";
import moment from "moment";
import { pagination } from "../../../constant/app.constant";

class OrderListPage extends Component {
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
    let title = "Create Order";
    let order = {
      name: ""
    };
    this.toggleModalInfo(order, title);
  };

  showUpdateModal = item => {
    let title = "Update Order";
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
        this.getOrderList();
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
        this.getDeletedOrderList();
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
      () => this.getOrderList()
    );
  };

  getOrderList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getOrderList(params);
  };

  getDeletedOrderList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getDeletedOrderList(params);
  };

  addOrder = async () => {
    const { name } = this.state.item;
    const order = { name };
    try {
      await ApiOrder.postOrder(order);
      this.toggleModalInfo();
      this.getOrderList();
      toastSuccess("The order has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updateOrder = async () => {
    const { id, name } = this.state.item;
    const order = { id, name };
    try {
      await ApiOrder.updateOrder(order);
      this.toggleModalInfo();
      this.getOrderList();
      toastSuccess("The order has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  recordDeleteOrder = async id => {
    try {
      await ApiOrder.recordDeleteOrder(id);
      this.getOrderList();
      this.getDeletedOrderList();
      toastSuccess("Successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteOrder = async () => {
    try {
      await ApiOrder.deleteOrder(this.state.itemId);
      this.toggleDeleteModal();
      this.getDeletedOrderList();
      toastSuccess("The order has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveOrder = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateOrder();
    } else {
      this.addOrder();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveOrder();
  }

  componentDidMount() {
    this.getOrderList();
    this.getDeletedOrderList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, isShowDeletedListModal, item } = this.state;
    const { orderPagedList, deletedOrderPagedList } = this.props.orderPagedListReducer;
    const { sources, pageIndex, totalPages } = orderPagedList;
    const deletedSources = deletedOrderPagedList.sources;
    const deletedPageIndex = deletedOrderPagedList.pageIndex;
    const deletedTotalPages = deletedOrderPagedList.totalPages;
    const hasResults = orderPagedList.sources && orderPagedList.sources.length > 0;
    const deletedhasResults = deletedOrderPagedList.sources && deletedOrderPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm clickOk={this.deleteOrder} isShowModal={isShowDeleteModal} toggleModal={this.toggleDeleteModal} />

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
                    <th>Order name</th>
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
                            <Button className="btn-sm" color="success" onClick={() => this.recordDeleteOrder(item.id)}>
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
                  <th>Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {moment(item.createdOn)
                            .add(7, "h")
                            .format("DDMMYYYYHHmmA")}
                        </td>
                        <td>
                          <Button className="btn-sm" color="secondary" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          <Button className="btn-sm" color="danger" onClick={() => this.recordDeleteOrder(item.id)}>
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
    orderPagedListReducer: state.orderPagedListReducer
  }),
  {
    getOrderList,
    getDeletedOrderList
  }
)(OrderListPage);
