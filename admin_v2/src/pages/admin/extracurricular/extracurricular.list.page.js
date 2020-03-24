import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Label, Input, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getExtracurricularList } from "../../../actions/extracurricular.list.action";
import ApiExtracurricular from "../../../api/api.extracurricular";
import ApiArticleCategory from "../../../api/api.articleCategory";
import { pagination } from "../../../constant/app.constant";
//import CKEditor from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import CKEditorInput from "../../../components/common/ckeditor-input";

class ExtracurricularListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      extracurricularCategories: [],
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1);
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
    let title = "Create Extracurricular";
    let extracurricular = {
      title: "",
      preview: "",
      detail: "",
      picture: ""
    };
    this.toggleModalInfo(extracurricular, title);
  };

  showUpdateModal = item => {
    console.log(item);
    item.articleCategoryId = item.articleCategory.id;
    let title = "Update Extracurricular";
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
        this.getExtracurricularList();
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
      () => this.getExtracurricularList()
    );
  };

  getExtracurricularList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getExtracurricularList(params);
  };

  getArticleCategoryList = () => {
    ApiArticleCategory.getAllArticleCategory().then(values => {
      this.setState({ extracurricularCategories: values.sources });
    });
  };

  addExtracurricular = async () => {
    const { title, preview, detail, picture, articleCategoryId } = this.state.item;
    const extracurricular = { title, preview, detail, picture, articleCategoryId };
    try {
      let response = await ApiExtracurricular.postExtracurricular(extracurricular);
      this.toggleModalInfo();
      this.getExtracurricularList();
      toastSuccess("The extracurricular has been created successfully");
    } catch (err) {
      console.log("err");
      console.log(err);
      toastError("This Extracurricular title is exist! Try another oneeeeeeeee");
    }
  };

  updateExtracurricular = async () => {
    const { id, title, preview, detail, picture, articleCategoryId } = this.state.item;
    const extracurricular = { id, title, preview, detail, picture, articleCategoryId };
    try {
      await ApiExtracurricular.updateExtracurricular(extracurricular);
      this.toggleModalInfo();
      this.getExtracurricularList();
      toastSuccess("The extracurricular has been updated successfully");
    } catch (err) {
      console.log(err);
      toastError("This extracurricular title is exist! Try another one");
    }
  };

  deleteExtracurricular = async () => {
    try {
      await ApiExtracurricular.deleteExtracurricular(this.state.itemId);
      this.toggleDeleteModal();
      this.getExtracurricularList();
      toastSuccess("The extracurricular has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveExtracurricular = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateExtracurricular();
    } else {
      this.addExtracurricular();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveExtracurricular();
  }

  componentDidMount() {
    this.getExtracurricularList();
    this.getArticleCategoryList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item, extracurricularCategories } = this.state;
    const { extracurricularPagedList } = this.props.extracurricularPagedListReducer;
    const { sources, pageIndex, totalPages } = extracurricularPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteExtracurricular}
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
                        options={extracurricularCategories}
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
                      {/* <ValidationInput
                        name="detail"
                        title="Detail"
                        type="text"
                        required={true}
                        value={item.detail}
                        onChange={this.onModelChange}
                      />
                    </FormGroup> */}

                      {/* <CKEditor editor={ClassicEditor} onChange={this.onDetailChange} data={item.detail} /> */}
                      <CKEditorInput title="Detail" name="detail" data={item.detail} onChange={this.onDetailChange} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="picture"
                        title="Picture"
                        type="text"
                        required={true}
                        value={item.picture}
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
                  <th>Extracurricular title</th>
                  <th>Create On</th>
                  <th>Extracurricular category</th>
                  <th>Preview</th>
                  <th>Detail</th>
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
                        <td>{item.createOn}</td>
                        <td>{item.articleCategory.name}</td>
                        <td>{item.preview}</td>
                        <td>{ReactHtmlParser(item.detail)}</td>
                        <td>{item.picture}</td>
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
    extracurricularPagedListReducer: state.extracurricularPagedListReducer
  }),
  {
    getExtracurricularList
  }
)(ExtracurricularListPage);
