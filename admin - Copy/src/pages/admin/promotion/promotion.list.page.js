import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Label, Table } from "reactstrap";
import Form from "react-validation/build/form";
import Datetime from "react-datetime";
import moment from "moment";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getPromotionList } from "../../../actions/promotion.list.action";
import ApiPromotion from "../../../api/api.promotion";
import { pagination } from "../../../constant/app.constant";

class PromotionListPage extends Component {
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
    let title = "Create Promotion";
    let promotion = {
      name: ""
    };
    this.toggleModalInfo(promotion, title);
  };

  showUpdateModal = item => {
    let title = "Update Promotion";
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
        this.getPromotionList();
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
      () => this.getPromotionList()
    );
  };

  getPromotionList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getPromotionList(params);
  };

  addPromotion = async () => {
    const { name, startTime, finishTime } = this.state.item;
    const promotion = { name, startTime, finishTime };
    try {
      await ApiPromotion.postPromotion(promotion);
      this.toggleModalInfo();
      this.getPromotionList();
      toastSuccess("The promotion has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updatePromotion = async () => {
    const { id, name, startTime, finishTime } = this.state.item;
    const promotion = { id, name, startTime, finishTime };
    try {
      await ApiPromotion.updatePromotion(promotion);
      this.toggleModalInfo();
      this.getPromotionList();
      toastSuccess("The promotion has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deletePromotion = async () => {
    try {
      await ApiPromotion.deletePromotion(this.state.itemId);
      this.toggleDeleteModal();
      this.getPromotionList();
      toastSuccess("The promotion has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  savePromotion = () => {
    let { id } = this.state.item;
    if (id) {
      this.updatePromotion();
    } else {
      this.addPromotion();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.savePromotion();
  }

  componentDidMount() {
    this.getPromotionList();
  }

  onStartTimeChange = el => {
    let inputValue = el._d;
    let item = Object.assign({}, this.state.item);
    item["startTime"] = inputValue;
    this.setState({ item });
  };

  onFinishTimeChange = el => {
    let inputValue = el._d;
    let item = Object.assign({}, this.state.item);
    item["finishTime"] = inputValue;
    this.setState({ item });
  };

  changeDateFunc = range => {
    let startTime = new Date(range.start.toISOString().slice(0, -1)).toISOString().slice(0, -1);
    let finishTime = new Date(range.end.toISOString().slice(0, -1)).toISOString().slice(0, -1);
    let params = {
      startTime,
      finishTime
    };
    this.setState(
      {
        params
      },
      () => this.getCalendarList()
    );
  };

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { promotionPagedList } = this.props.promotionPagedListReducer;
    const { sources, pageIndex, totalPages } = promotionPagedList;
    const hasResults = promotionPagedList.sources && promotionPagedList.sources.length > 0;

    console.log(sources);

    return (
      <div className='animated fadeIn'>
        <ModalConfirm
          clickOk={this.deletePromotion}
          isShowModal={isShowDeleteModal}
          toggleModal={this.toggleDeleteModal}
        />

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
                {/* Start Day */}
                <Row>
                  <Col xs='3' sm='3' md='3' lg='3'>
                    <FormGroup>
                      <Label for='examplePassword'>
                        {" "}
                        <strong>Start Time: </strong>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs='9' sm='9' md='9' lg='9'>
                    <FormGroup>
                      <Datetime
                        defaultValue={
                          item.startTime
                            ? moment(item.startTime)
                                .add(7, "h")
                                .format("DD-MM-YYYY HH:mm A")
                            : ""
                        }
                        dateFormat='DD-MM-YYYY'
                        timeFormat='HH:mm A'
                        onChange={this.onStartTimeChange}
                        isValidDate={current => {
                          if (item.finishTime) {
                            return current.isBetween(item.startTime, moment(item.finishTime).add("day"));
                          } else {
                            var yesterday = Datetime.moment().subtract(1, "day");
                            return current.isAfter(yesterday);
                          }
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End Day */}
                <Row>
                  <Col xs='3' sm='3' md='3' lg='3'>
                    <FormGroup>
                      <Label for='examplePassword'>
                        <strong>Finish Time: </strong>{" "}
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs='9' sm='9' md='9' lg='9'>
                    <FormGroup>
                      <Datetime
                        defaultValue={
                          item.finishTime
                            ? moment(item.finishTime)
                                .add(7, "h")
                                .format("DD-MM-YYYY HH:mm A")
                            : ""
                        }
                        dateFormat='DD-MM-YYYY'
                        timeFormat='HH:mm A'
                        onChange={this.onFinishTimeChange}
                        isValidDate={current => {
                          return current.isAfter(moment(item.startTime).subtract(1, "day"));
                        }}
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
                  <th>Name</th>
                  <th>Start Time</th>
                  <th>Finish Time</th>
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
                          {moment(item.startTime)
                            .add(7, "h")
                            .format("DD-MM-YYYY HH:mm A")}
                        </td>
                        <td>
                          {moment(item.finishTime)
                            .add(7, "h")
                            .format("DD-MM-YYYY HH:mm A")}
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
    promotionPagedListReducer: state.promotionPagedListReducer
  }),
  {
    getPromotionList
  }
)(PromotionListPage);
