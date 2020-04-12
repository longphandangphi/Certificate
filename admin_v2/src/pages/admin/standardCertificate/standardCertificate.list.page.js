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
import SelectInput from "../../../components/common/select-input";
import { getStandardCertificateList } from "../../../actions/standardCertificate.list.action";
import ApiStandardCertificate from "../../../api/api.standardCertificate";
import { pagination, IS_REQUIRE } from "../../../constant/app.constant";

class StandardCertificateListPage extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
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
    let title = "Create Standard of Certificate";
    let standardCertificate = {
      name: "",

      physicalEducationCertificateMinimumRating: "",
      physicalEducationCertificateReferenceContent: "",

      nationalDefenseAndSecurityCertificateMinimumRating: "",
      nationalDefenseAndSecurityCertificateReferenceContent: "",

      informaticsCertificateMinimumRating: "",
      informaticsCertificateReferenceContent: "",

      languageCertificateMinimumRating: "",
      languageCertificateReferenceContent: ""
    };
    this.toggleModalInfo(standardCertificate, title);
  };

  showUpdateModal = item => {
    let title = "Update StandardCertificate";
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
        this.getStandardCertificateList();
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
      () => this.getStandardCertificateList()
    );
  };

  getStandardCertificateList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getStandardCertificateList(params);
  };

  addStandardCertificate = async () => {
    console.log("state ==================");
    console.log(this.state);
    const {
      name,

      isRequirePhysicalEducationCertificate,
      physicalEducationCertificateMinimumRating,
      physicalEducationCertificateReferenceContent,

      isRequireNationalDefenseAndSecurityCertificate,
      nationalDefenseAndSecurityCertificateMinimumRating,
      nationalDefenseAndSecurityCertificateReferenceContent,

      isRequireInformaticsCertificate,
      informaticsCertificateMinimumRating,
      informaticsCertificateReferenceContent,

      isRequireLanguageCertificate,
      languageCertificateMinimumRating,
      languageCertificateReferenceContent
    } = this.state.item;
    
    const standardCertificate = {
      name,

      isRequirePhysicalEducationCertificate,
      physicalEducationCertificateMinimumRating,
      physicalEducationCertificateReferenceContent,

      isRequireNationalDefenseAndSecurityCertificate,
      nationalDefenseAndSecurityCertificateMinimumRating,
      nationalDefenseAndSecurityCertificateReferenceContent,

      isRequireInformaticsCertificate,
      informaticsCertificateMinimumRating,
      informaticsCertificateReferenceContent,

      isRequireLanguageCertificate,
      languageCertificateMinimumRating,
      languageCertificateReferenceContent
    };
    try {
      let response = await ApiStandardCertificate.postStandardCertificate(standardCertificate);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getStandardCertificateList();
      toastSuccess("The standardCertificate has been created successfully");
    } catch (err) {
      console.log(err);
      toastError("This StandardCertificate name is exist!");
    }
  };

  updateStandardCertificate = async () => {
    const { 
      id, 
      name,

      isRequirePhysicalEducationCertificate,
      physicalEducationCertificateMinimumRating,
      physicalEducationCertificateReferenceContent,

      isRequireNationalDefenseAndSecurityCertificate,
      nationalDefenseAndSecurityCertificateMinimumRating,
      nationalDefenseAndSecurityCertificateReferenceContent,

      isRequireInformaticsCertificate,
      informaticsCertificateMinimumRating,
      informaticsCertificateReferenceContent,

      isRequireLanguageCertificate,
      languageCertificateMinimumRating,
      languageCertificateReferenceContent 

    } = this.state.item;

    const standardCertificate = { id, 
      name,

      isRequirePhysicalEducationCertificate,
      physicalEducationCertificateMinimumRating,
      physicalEducationCertificateReferenceContent,

      isRequireNationalDefenseAndSecurityCertificate,
      nationalDefenseAndSecurityCertificateMinimumRating,
      nationalDefenseAndSecurityCertificateReferenceContent,

      isRequireInformaticsCertificate,
      informaticsCertificateMinimumRating,
      informaticsCertificateReferenceContent,

      isRequireLanguageCertificate,
      languageCertificateMinimumRating,
      languageCertificateReferenceContent 
    };

    try {
      await ApiStandardCertificate.updateStandardCertificate(standardCertificate);
      this.toggleModalInfo();
      this.getStandardCertificateList();
      toastSuccess("The standardCertificate has been updated successfully");
    } catch (err) {
      toastError("This StandardCertificate name is exist!");
    }
  };

  deleteStandardCertificate = async () => {
    try {
      await ApiStandardCertificate.deleteStandardCertificate(this.state.itemId);
      this.toggleDeleteModal();
      this.getStandardCertificateList();
      toastSuccess("The standardCertificate has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveStandardCertificate = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateStandardCertificate();
    } else {
      this.addStandardCertificate();
    }
  };
  // 1
  onPhysicalEducationChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequirePhysicalEducationCertificate = value;
    this.setState({ item });
  };
  // 2
  onNationalDefenseAndSecurityChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireNationalDefenseAndSecurityCertificate = value;
    this.setState({ item });
  };
  // 3
  onInformaticsChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireInformaticsCertificate = value;
    this.setState({ item });
  };
  // 4
  onLanguageChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireLanguageCertificate = value;
    this.setState({ item });
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveStandardCertificate();
  }

  componentDidMount() {
    this.getStandardCertificateList();
  }

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 3
        }}
      />
    );

    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { standardCertificatePagedList } = this.props.standardCertificatePagedListReducer;
    const { sources, pageIndex, totalPages } = standardCertificatePagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteStandardCertificate}
          isShowModal={isShowDeleteModal}
          toggleModal={this.toggleDeleteModal}
        />

        <ModalInfo title={this.state.formTitle} isShowModal={isShowInfoModal} ref={this.wrapperRef} hiddenFooter>
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
                <ColoredLine color="#CEF6F5" />
                {/* THỂ CHÂT */}
                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequirePhysicalEducationCertificate"
                        title="Is Require Physical Education Certificate"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onPhysicalEducationChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequirePhysicalEducationCertificate) {
                            return true;
                          }
                          return false;
                        }).map(i => i.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="physicalEducationCertificateMinimumRating"
                        title="Physical Education Certificate Minimum Rating"
                        type="text"
                        required={item.isRequirePhysicalEducationCertificate}
                        disabled={!item.isRequirePhysicalEducationCertificate}
                        value={item.physicalEducationCertificateMinimumRating}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="physicalEducationCertificateReferenceContent"
                        title="Physical Education Certificate Reference Content"
                        type="text"
                        required={item.isRequirePhysicalEducationCertificate}
                        disabled={!item.isRequirePhysicalEducationCertificate}
                        value={item.physicalEducationCertificateReferenceContent}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <ColoredLine color="#CEF6F5" />
                {/* Giáo dục quốc phòng */}
                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequireNationalDefenseAndSecurityCertificate"
                        title="Is Require National Defense And Security Certificate"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onNationalDefenseAndSecurityChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireNationalDefenseAndSecurityCertificate) {
                            return true;
                          }
                          return false;
                        }).map(i => i.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="nationalDefenseAndSecurityCertificateMinimumRating"
                        title="national Defense And Security Certificate Minimum Rating"
                        type="text"
                        required={item.isRequireNationalDefenseAndSecurityCertificate}
                        disabled={!item.isRequireNationalDefenseAndSecurityCertificate}
                        value={item.nationalDefenseAndSecurityCertificateMinimumRating}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="nationalDefenseAndSecurityCertificateReferenceContent"
                        title="National Defense And Security Certificate Reference Content"
                        type="text"
                        required={item.isRequireNationalDefenseAndSecurityCertificate}
                        disabled={!item.isRequireNationalDefenseAndSecurityCertificate}
                        value={item.nationalDefenseAndSecurityCertificateReferenceContent}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End GDQP */}
                <ColoredLine color="#CEF6F5" />
                {/* TIN HỌC  */}

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequireInformaticsCertificate"
                        title="Is Require Informatics Certificate"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onInformaticsChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireInformaticsCertificate) {
                            return true;
                          }
                          return false;
                        }).map(i => i.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="informaticsCertificateMinimumRating"
                        title="Informatics Certificate Minimum Rating"
                        type="text"
                        required={item.isRequireInformaticsCertificate}
                        disabled={!item.isRequireInformaticsCertificate}
                        value={item.informaticsCertificateMinimumRating}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="informaticsCertificateReferenceContent"
                        title="Informatics Certificate Reference Content"
                        type="text"
                        required={item.isRequireInformaticsCertificate}
                        disabled={!item.isRequireInformaticsCertificate}
                        value={item.informaticsCertificateReferenceContent}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End TIN HỌC */}
                <ColoredLine color="#CEF6F5" />
                {/* TIN HỌC  */}

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequireLanguageCertificate"
                        title="Is Require Language Certificate"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onLanguageChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireLanguageCertificate) {
                            return true;
                          }
                          return false;
                        }).map(i => i.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="languageCertificateMinimumRating"
                        title="Language Certificate Minimum Rating"
                        type="text"
                        required={item.isRequireLanguageCertificate}
                        disabled={!item.isRequireLanguageCertificate}
                        value={item.languageCertificateMinimumRating}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="languageCertificateReferenceContent"
                        title="Language Certificate Reference Content"
                        type="text"
                        required={item.isRequireLanguageCertificate}
                        disabled={!item.isRequireLanguageCertificate}
                        value={item.languageCertificateReferenceContent}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End TIN HỌC */}

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
                  <th></th>
                  <th>Standard Certificate name</th>

                  <th style={{ color: "#2ECCFA" }}>Physical Education</th>
                  <th style={{ color: "#2ECCFA" }}>Minimum</th>
                  <th style={{ color: "#2ECCFA" }}>Reference Content</th>

                  <th style={{ color: "#2EFE64" }}>National Defense And Security</th>
                  <th style={{ color: "#2EFE64" }}>Minimum</th>
                  <th style={{ color: "#2EFE64" }}>Reference Content</th>

                  <th style={{ color: "#FACC2E" }}>Informatics</th>
                  <th style={{ color: "#FACC2E" }}>Minimum</th>
                  <th style={{ color: "#FACC2E" }}>Reference Content</th>

                  <th style={{ color: "#FE2EF7" }}>Language</th>
                  <th style={{ color: "#FE2EF7" }}>Minimum</th>
                  <th style={{ color: "#FE2EF7" }}>Reference Content</th>

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

                        <td style={{ backgroundColor: "#EFFBFB" }}>
                          {item.isRequirePhysicalEducationCertificate ? "Require" : "Not require"}
                        </td>
                        <td style={{ backgroundColor: "#EFFBFB" }}>{item.physicalEducationCertificateMinimumRating}</td>
                        <td style={{ backgroundColor: "#EFFBFB" }}>
                          {item.physicalEducationCertificateReferenceContent}
                        </td>

                        <td style={{ backgroundColor: "#F2FBEF" }}>
                          {item.isRequireNationalDefenseAndSecurityCertificate ? "Require" : "Not require"}
                        </td>
                        <td style={{ backgroundColor: "#F2FBEF" }}>
                          {item.nationalDefenseAndSecurityCertificateMinimumRating}
                        </td>
                        <td style={{ backgroundColor: "#F2FBEF" }}>
                          {item.nationalDefenseAndSecurityCertificateReferenceContent}
                        </td>

                        <td style={{ backgroundColor: "#FBFBEF" }}>
                          {item.isRequireInformaticsCertificate ? "Require" : "Not require"}
                        </td>
                        <td style={{ backgroundColor: "#FBFBEF" }}>{item.informaticsCertificateMinimumRating}</td>
                        <td style={{ backgroundColor: "#FBFBEF" }}>{item.informaticsCertificateReferenceContent}</td>

                        <td style={{ backgroundColor: "#F8EFFB" }}>
                          {item.isRequireLanguageCertificate ? "Require" : "Not require"}
                        </td>
                        <td style={{ backgroundColor: "#F8EFFB" }}>{item.languageCertificateMinimumRating}</td>
                        <td style={{ backgroundColor: "#F8EFFB" }}>{item.languageCertificateReferenceContent}</td>

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
    standardCertificatePagedListReducer: state.standardCertificatePagedListReducer
  }),
  {
    getStandardCertificateList
  }
)(StandardCertificateListPage);
