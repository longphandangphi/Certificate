import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import { appConfig } from "../../../config/app.config";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import { uploadFile } from "../../../helpers/upload_file.helper";
import lodash from "lodash";
import { getArticleList } from "../../../actions/article.list.action";
import ApiArticle from "../../../api/api.article";
import ApiArticleCategory from "../../../api/api.articleCategory";
import { pagination, IS_DESC } from "../../../constant/app.constant";
import { FILE } from "../../../constant/file.constant";
import CKEditorInput from "../../../components/common/ckeditor-input";
import moment from "moment";

class ArticleListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      articleCategories: [],
      picture: null,
      itemId: null,
      params: {
        offset: pagination.initialPage,
        limit: pagination.defaultTake,
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 100);
    this.delayedCallbackSort = lodash.debounce(this.sort, 100);
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
    let title = "Create Article";
    let article = {
      title: "",
      preview: "",
      detail: "",
      picture: ""
    };
    this.toggleModalInfo(article, title);
  };

  showUpdateModal = item => {
    console.log(item);
    item.articleCategoryId = item.articleCategory.id;
    let title = "Update Article";
    this.toggleModalInfo(item, title);
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
    console.log(this.state.item);
  };

  onArticleCategoryChange = value => {
    let item = Object.assign({}, this.state.item);
    item.articleCategoryId = value;
    this.setState({ item });
  };

  onDetailChange = e => {
    let item = Object.assign({}, this.state.item);
    item.detail = e.editor.getData();
    this.setState({ item });
  };

  onSortChange = e => {
    // e.persist();
    this.delayedCallbackSort(e);
  }

  sort = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: 1,
          isDesc: e
        }
      },
      () => {
        this.getArticleList();
        console.log(e);
      }
    );
  }

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
        this.getArticleList();
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
          offset: e.selected + 1
        }
      },
      () => this.getArticleList()
    );
  };

  getArticleList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getArticleList(params);
  };

  getArticleCategoryList = () => {
    ApiArticleCategory.getAllArticleCategory().then(values => {
      this.setState({ articleCategories: values.sources });
    });
  };

  addArticle = async () => {
    const { title, preview, detail, articleCategoryId } = this.state.item;
    const article = { title, preview, detail, articleCategoryId };
    try {
      var res = await uploadFile(FILE.MEDIA_UPLOAD, this.state.picture);
      article.picture = appConfig.apiUrlMedia + res;

      await ApiArticle.postArticle(article);

      this.toggleModalInfo();
      this.getArticleList();
      toastSuccess("The article has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This Article title is exist! Try another one");
    }
  };

  updateArticle = async () => {
    const { id, title, preview, detail, picture, articleCategoryId } = this.state.item;
    const article = { id, title, preview, detail, picture, articleCategoryId };
    try {
      var res = await uploadFile(FILE.MEDIA_UPLOAD, this.state.picture);
      article.picture = appConfig.apiUrlMedia + res;

      await ApiArticle.updateArticle(article);
      this.toggleModalInfo();
      this.getArticleList();
      toastSuccess("The article has been updated successfully");
    } catch (err) {
      console.log(err);
      toastError("This article title is exist! Try another one");
    }
  };

  deleteArticle = async () => {
    try {
      await ApiArticle.deleteArticle(this.state.itemId);
      this.toggleDeleteModal();
      this.getArticleList();
      toastSuccess("The article has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveArticle = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateArticle();
    } else {
      this.addArticle();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveArticle();
  }

  componentDidMount() {
    this.getArticleList();
    this.getArticleCategoryList();
  }

  handleFile(e) {
    let picture = e.target.files[0];
    console.log("picture", picture);
    this.setState({
      picture: picture
    });
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, articleCategories } = this.state;
    const { articlePagedList } = this.props.articlePagedListReducer;
    const { sources, pageIndex, totalPages } = articlePagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteArticle}
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
                        name="title"
                        title="Title"
                        type="text"
                        required={true}
                        value={item.title}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        placeholder="--Select ArticleCategory--"
                        name="articleCategoryId"
                        title="ArticleCategory"
                        defaultValue={item.articleCategory ? item.articleCategory.id : undefined}
                        showSearch={true}
                        style={{ display: "block" }}
                        required={true}
                        onChange={this.onArticleCategoryChange}
                        options={articleCategories}
                        valueField="id"
                        nameField="name"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="preview"
                        title="Preview"
                        type="text"
                        required={true}
                        value={item.preview}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <CKEditorInput title="Detail" name="detail" data={item.detail} onChange={this.onDetailChange} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label>Picture</label>
                    <br></br>
                    <input type="file" name="file" onChange={e => this.handleFile(e)} />
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
                Create article
              </Button>

              <SelectInput
                        placeholder="Order by"
                        name="orderBy"
                        defaultValue={IS_DESC ? IS_DESC.id : undefined}
                        style={{ display: "block" }}
                        onChange={this.onSortChange}
                        options={IS_DESC}
                        valueField="id"
                        nameField="name"
                      />
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
                  <th>Article title</th>
                  <th style={{ minWidth: 135 }}>Create On</th>
                  <th>Article category</th>
                  <th>Preview</th>
                  <th>Picture</th>
                  <th style={{ minWidth: 125 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          {moment(item.createOn)
                            .add(7, "h")
                            .format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td>{item.articleCategory.name}</td>
                        <td>{item.preview}</td>
                        <td>
                          <img style={{ height: 50 }} src={item.picture} alt=""/>
                        </td>
                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)}>
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
    articlePagedListReducer: state.articlePagedListReducer
  }),
  {
    getArticleList
  }
)(ArticleListPage);
