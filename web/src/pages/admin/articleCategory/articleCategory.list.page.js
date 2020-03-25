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
import { getArticleCategoryList } from "../../../actions/articleCategory.list.action";
import ApiArticleCategory from "../../../api/api.articleCategory";
import { pagination } from "../../../constant/app.constant";

class ArticleCategoryListPage extends Component {
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
    let title = "Create ArticleCategory";
    let articleCategory = {
      name: "",
      description: ""
    };
    this.toggleModalInfo(articleCategory, title);
  };

  showUpdateModal = item => {
    let title = "Update ArticleCategory";
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
        this.getArticleCategoryList();
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
      () => this.getArticleCategoryList()
    );
  };

  getArticleCategoryList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getArticleCategoryList(params);
  };

  addArticleCategory = async () => {
    console.log("state ==================");
    console.log(this.state);
    const { name, description } = this.state.item;
    const articleCategory = { name, description };
    try {
      let response = await ApiArticleCategory.postArticleCategory(articleCategory);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getArticleCategoryList();
      toastSuccess("The articleCategory has been created successfully");
    } catch (err) {
      console.log(err);
      toastError("This ArticleCategory name is exist!");
    }
  };

  updateArticleCategory = async () => {
    const { id, name, description } = this.state.item;
    const articleCategory = { id, name, description };
    try {
      await ApiArticleCategory.updateArticleCategory(articleCategory);
      this.toggleModalInfo();
      this.getArticleCategoryList();
      toastSuccess("The articleCategory has been updated successfully");
    } catch (err) {
      toastError("This ArticleCategory name is exist!");
    }
  };

  deleteArticleCategory = async () => {
    try {
      await ApiArticleCategory.deleteArticleCategory(this.state.itemId);
      this.toggleDeleteModal();
      this.getArticleCategoryList();
      toastSuccess("The articleCategory has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveArticleCategory = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateArticleCategory();
    } else {
      this.addArticleCategory();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveArticleCategory();
  }

  componentDidMount() {
    this.getArticleCategoryList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { articleCategoryPagedList } = this.props.articleCategoryPagedListReducer;
    const { sources, pageIndex, totalPages } = articleCategoryPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteArticleCategory}
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
                        name="description"
                        title="Description"
                        type="text"
                        required={true}
                        value={item.description}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center">
                  <Button color="danger" type="submit">
                    Confirm
                  </Button>
                  &nbsp;
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
                  <th>Article Category name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
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
    articleCategoryPagedListReducer: state.articleCategoryPagedListReducer
  }),
  {
    getArticleCategoryList
  }
)(ArticleCategoryListPage);
