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
import { getReviewList } from "../../../actions/review.list.action";
import ApiReview from "../../../api/api.review";
import { pagination } from "../../../constant/app.constant";

class ReviewListPage extends Component {
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
    let title = "Create Review";
    let review = {
      name: ""
    };
    this.toggleModalInfo(review, title);
  };

  showUpdateModal = item => {
    let title = "Update Review";
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
        this.getReviewList();
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
      () => this.getReviewList()
    );
  };

  getReviewList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getReviewList(params);
  };

  addReview = async () => {
    console.log("state ==================");
    console.log(this.state);
    const { name, email, content, vote } = this.state.item;
    const review = { name, email, content, vote };
    try {
      let response = await ApiReview.postReview(review);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getReviewList();
      toastSuccess("The review has been created successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  updateReview = async () => {
    const { id, email, content, vote } = this.state.item;
    const review = { id, email, content, vote };
    try {
      await ApiReview.updateReview(review);
      this.toggleModalInfo();
      this.getReviewList();
      toastSuccess("The review has been updated successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  deleteReview = async () => {
    try {
      await ApiReview.deleteReview(this.state.itemId);
      this.toggleDeleteModal();
      this.getReviewList();
      toastSuccess("The review has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveReview = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateReview();
    } else {
      this.addReview();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveReview();
  }

  componentDidMount() {
    this.getReviewList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { reviewPagedList } = this.props.reviewPagedListReducer;
    const { sources, pageIndex, totalPages } = reviewPagedList;
    const hasResults = reviewPagedList.sources && reviewPagedList.sources.length > 0;

    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteReview}
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
                        title="Content"
                        type="text"
                        required={true}
                        value={item.content}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="name"
                        title="Vote"
                        type="text"
                        required={true}
                        value={item.vote}
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
                  <th>STT</th>
                  <th>Email</th>
                  <th>Content</th>
                  <th>Item</th>
                  <th>Vote</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.content}</td>
                        <td>{item.item.name}</td>
                        <td>{item.vote}</td>
                        <td>{item.time}</td>
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
    reviewPagedListReducer: state.reviewPagedListReducer
  }),
  {
    getReviewList
  }
)(ReviewListPage);
