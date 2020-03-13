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
import { getTableList } from "../../../actions/table.list.action";
import ApiTable from "../../../api/api.table";
import { pagination } from "../../../constant/app.constant";

class TableListPage extends Component {
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
    let title = "Create Table";
    let table = {
      name: "",
      type: "",
      isAvailable: true
    };
    this.toggleModalInfo(table, title);
  };

  showUpdateModal = item => {
    let title = "Update Table";
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
        this.getTableList();
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
      () => this.getTableList()
    );
  };

  getTableList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getTableList(params);
  };

  addTable = async () => {
    const { name, type } = this.state.item;
    const table = { name, type };
    try {
      await ApiTable.postTable(table);
      this.toggleModalInfo();
      this.getTableList();
      toastSuccess("The table has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updateTable = async () => {
    const { id, name, type } = this.state.item;
    const table = { id, name, type };
    try {
      await ApiTable.updateTable(table);
      this.toggleModalInfo();
      this.getTableList();
      toastSuccess("The table has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  changeStatus = async item => {
    const { id, name, type } = item;
    const isAvailable = !item.isAvailable;
    const updatedTable = { id, name, type, isAvailable };
    try {
      await ApiTable.updateTable(updatedTable);
      this.getTableList();
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteTable = async () => {
    try {
      await ApiTable.deleteTable(this.state.itemId);
      this.toggleDeleteModal();
      this.getTableList();
      toastSuccess("The table has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveTable = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateTable();
    } else {
      this.addTable();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveTable();
  }

  componentDidMount() {
    this.getTableList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { tablePagedList } = this.props.tablePagedListReducer;
    const { sources, pageIndex, totalPages } = tablePagedList;
    const hasResults = tablePagedList.sources && tablePagedList.sources.length > 0;
    return (
      <div className='animated fadeIn'>
        <ModalConfirm clickOk={this.deleteTable} isShowModal={isShowDeleteModal} toggleModal={this.toggleDeleteModal} />

        <ModalInfo title={this.state.formTitle} isShowModal={isShowInfoModal} hiddenFooter>
          <div className='modal-wrapper'>
            <div className='form-wrapper'>
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
                        name='name'
                        title='Name'
                        type='text'
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
                        name='type'
                        title='Type'
                        min='1'
                        type='number'
                        required={true}
                        value={item.type}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className='text-center'>
                  <Button color='danger' type='submit'>
                    Confirm
                  </Button>{" "}
                  <Button color='secondary' onClick={this.toggleModalInfo}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </ModalInfo>

        <Row>
          <Col xs='12'>
            <div className='flex-container header-table'>
              <Button onClick={this.showAddNew} className='btn btn-pill btn-success btn-sm'>
                Create
              </Button>
              <input
                onChange={this.onSearchChange}
                className='form-control form-control-sm'
                placeholder='Searching...'
              />
            </div>
            <Table className='admin-table' responsive bordered>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>STT</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "20%" }}>Type</th>
                  <th style={{ width: "25%" }}>Status</th>
                  <th style={{ width: "25%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, i) => {
                    return (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>
                          <Button
                            className='btn-sm'
                            color={item.isAvailable ? "success" : "danger"}
                            onClick={() => this.changeStatus(item)}
                          >
                            {item.isAvailable ? "Available" : "Not Available"}
                          </Button>
                        </td>
                        <td>
                          <Button className='btn-sm' color='secondary' onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          <Button className='btn-sm' color='danger' onClick={() => this.showConfirmDelete(item.id)}>
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
    tablePagedListReducer: state.tablePagedListReducer
  }),
  {
    getTableList
  }
)(TableListPage);
