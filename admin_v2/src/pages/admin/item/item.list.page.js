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
import { getItemList } from "../../../actions/item.list.action";
import ApiItem from "../../../api/api.item";
import { pagination } from "../../../constant/app.constant";
import ApiMenu from "../../../api/api.menu";
import ImagePicker from "../../../components/common/image-picker";

class ItemListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      menus: [],
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
      price: 0,
      status: null,
      image: "",
      description: ""
    };
    this.toggleModalInfo(item, title);
  };

  showUpdateModal = item => {
    let title = "Update Item";
    // document.getElementById('selectMenu').value = item.menu.id;
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  onMenuChange = value => {
    let item = Object.assign({}, this.state.item);
    item.menuId = value;
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
        this.getItemList();
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
      () => this.getItemList()
    );
  };

  getItemList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getItemList(params);
  };

  getMenuList = () => {
    ApiMenu.getAllMenu().then(values => {
      this.setState({ menus: values });
    });
  };

  onImageChange = file => {
    let item = Object.assign({}, this.state.item);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      item.image = reader.result;
      this.setState({ item });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  };

  addRoles = async roles => {
    let item = Object.assign({}, this.state.item);
    item[roles] = roles;
    this.setState({ item });
  };

  addItem = async () => {
    const { name, price, image, description, menuId } = this.state.item;
    const item = { name, price, image, description, menuId };
    try {
      await ApiItem.postItem(item);
      this.toggleModalInfo();
      this.getItemList();
      toastSuccess("The item has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
    // if (!menuId || menuId === "--Select Menu--") {
    //   document.getElementById("menuWarning").style.opacity = "1";
    // } else {
    //   document.getElementById("menuWarning").style.opacity = "0";

    // }
  };

  updateItem = async () => {
    const { id, name, price, status, image, description } = this.state.item;
    const menuId = this.state.item.menu.id;
    const item = { id, name, price, status, image, description, menuId };
    try {
      await ApiItem.updateItem(item);
      this.toggleModalInfo();
      this.getItemList();
      toastSuccess("The item has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  changeStatus = async item => {
    const { id, name, price, image, description } = item;
    const status = !item.status;
    const menuId = item.menu.id;
    const updatedItem = { id, name, price, status, image, description, menuId };
    try {
      await ApiItem.updateItem(updatedItem);
      this.getItemList();
    } catch (err) {
      toastError(err + "");
    }
  };

  recordDeleteItem = async () => {
    try {
      await ApiItem.recordDeleteItem(this.state.itemId);
      this.toggleDeleteModal();
      this.getItemList();
      toastSuccess("The item has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteItem = async () => {
    try {
      await ApiItem.deleteItem(this.state.itemId);
      this.toggleDeleteModal();
      this.getItemList();
      toastSuccess("The item has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveItem = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateItem();
    } else {
      this.addItem();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveItem();
  }

  componentDidMount() {
    this.getItemList();
    this.getMenuList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, menus } = this.state;
    const { itemPagedList } = this.props.itemPagedListReducer;
    const { sources, pageIndex, totalPages } = itemPagedList;
    const hasResults = itemPagedList.sources && itemPagedList.sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.recordDeleteItem}
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
                        name="price"
                        title="Price"
                        type="number"
                        min={1}
                        required={true}
                        value={item.price}
                        onChange={this.onModelChange}
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
                        value={item.description}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <ImagePicker title="Image" onImageChange={this.onImageChange} />
                    {item && <img alt="" src={item.image ? item.image : ""} width="100" height="100" />}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <SelectInput
                      placeholder="--Select Menu--"
                      showSearch={true}
                      title="Menu"
                      name="menu"
                      defaultValue={item.menu ? item.menu.id : ""}
                      required={true}
                      onChange={this.onMenuChange}
                      options={menus}
                      valueField="id"
                      nameField="name"
                    />
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
                  <th>Item name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Menu</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td style={{ textAlign: "center" }}>
                          <img style={{ width: 100, height: 100 }} src={item.image} alt="" />
                        </td>
                        <td>
                          <Button
                            className="btn-sm"
                            color={item.status ? "success" : "danger"}
                            onClick={() => this.changeStatus(item)}
                          >
                            {item.status ? "Available" : "Not Available"}
                          </Button>
                        </td>
                        <td>{item.description}</td>
                        <td className={item.menu.recordDeleted ? "text text-danger" : ""}>{item.menu.name}</td>
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
    itemPagedListReducer: state.itemPagedListReducer
  }),
  {
    getItemList
  }
)(ItemListPage);
