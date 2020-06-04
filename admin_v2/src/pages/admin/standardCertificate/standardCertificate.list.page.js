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
import CKEditorInput from "../../../components/common/ckeditor-input";
import ReactHtmlParser from "react-html-parser";
import { FcHighPriority, FcMinus} from 'react-icons/fc';


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
        offset: pagination.initialPage,
        limit: pagination.defaultTake
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

      physicalEducationReference: "none",

      nationalDefenseAndSecurityReference: "none",

      informaticsReference: "none",

      languageReference: "none",

      extracurricularPointReference: "none",
    };
    this.setState({
      item : {
        physicalEducationReference :  "none",
        nationalDefenseAndSecurityReference: "none",
        informaticsReference: "none",
        languageReference: "none",
        extracurricularPointReference: "none",
      }
    })
    this.toggleModalInfo(standardCertificate, title);
  };

  showUpdateModal = item => {
    let title = "Update Standard Certificate";
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
          offset: 1
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

  onLanguageReferenceChange = e => {
    let item = Object.assign({}, this.state.item);
    item.languageReference = e.editor.getData();
    this.setState({ item });
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          offset: e.selected + 1
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

      isRequirePhysicalEducation,
      physicalEducationReference,

      isRequireNationalDefenseAndSecurity,
      nationalDefenseAndSecurityReference,

      isRequireInformatics,
      informaticsReference,

      isRequireLanguage,
      languageReference,

      isRequireExtracurricularPoint,
      extracurricularPointReference
    } = this.state.item;
    
    const standardCertificate = {
      name,

      isRequirePhysicalEducation,
      physicalEducationReference,

      isRequireNationalDefenseAndSecurity,
      nationalDefenseAndSecurityReference,

      isRequireInformatics,
      informaticsReference,

      isRequireLanguage,
      languageReference,

      isRequireExtracurricularPoint,
      extracurricularPointReference
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

      isRequirePhysicalEducation,
      physicalEducationReference,

      isRequireNationalDefenseAndSecurity,
      nationalDefenseAndSecurityReference,

      isRequireInformatics,
      informaticsReference,

      isRequireLanguage,
      languageReference,

      isRequireExtracurricularPoint,
      extracurricularPointReference

    } = this.state.item;

    const standardCertificate = { id, 
      name,

      isRequirePhysicalEducation,
      physicalEducationReference,

      isRequireNationalDefenseAndSecurity,
      nationalDefenseAndSecurityReference,

      isRequireInformatics,
      informaticsReference,

      isRequireLanguage,
      languageReference,

      isRequireExtracurricularPoint,
      extracurricularPointReference
    };

    try {
      await ApiStandardCertificate.updateStandardCertificate(standardCertificate);
      this.toggleModalInfo();
      this.getStandardCertificateList();
      toastSuccess("The standardCertificate has been updated successfully");
    } catch (err) {
      toastError("Leave no information blank, please!");
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
    item.isRequirePhysicalEducation = value;
    this.setState({ item });
  };
  // 2
  onNationalDefenseAndSecurityChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireNationalDefenseAndSecurity = value;
    this.setState({ item });
  };
  // 3
  onInformaticsChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireInformatics = value;
    this.setState({ item });
  };
  // 4
  onLanguageChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireLanguage = value;
    this.setState({ item });
    console.log(this.state)
  };
  // 5
  onExtracurricularPointChange = value => {
    let item = Object.assign({}, this.state.item);
    item.isRequireExtracurricularPoint = value;
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
                        name="isRequirePhysicalEducation"
                        title="Is require Physical Education certificate?"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onPhysicalEducationChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequirePhysicalEducation) {
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
                        name="physicalEducationReference"
                        title="Physical Education certificate reference content"
                        type="text"
                        required={item.isRequirePhysicalEducation}
                        disabled={!item.isRequirePhysicalEducation}
                        defaultValue={item.physicalEducationReference === "" ? "none" : item.physicalEducationReference}
                        value={item.physicalEducationReference === "" ? "none" : item.physicalEducationReference}
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
                        name="isRequireNationalDefenseAndSecurity"
                        title="Is require National Defense And Security certificate?"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onNationalDefenseAndSecurityChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireNationalDefenseAndSecurity) {
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
                        name="nationalDefenseAndSecurityReference"
                        title="National Defense And Security certificate reference content"
                        type="text"
                        required={item.isRequireNationalDefenseAndSecurity}
                        disabled={!item.isRequireNationalDefenseAndSecurity}
                        value={item.nationalDefenseAndSecurityReference === "" ? "none" : item.nationalDefenseAndSecurityReference}
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
                        name="isRequireInformatics"
                        title="Is require Informatics certificate?"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onInformaticsChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireInformatics) {
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
                        name="informaticsReference"
                        title="Informatics certificate reference content"
                        type="text"
                        required={item.isRequireInformatics}
                        disabled={!item.isRequireInformatics}
                        value={item.informaticsReference === "" ? "none" : item.informaticsReference}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End TIN HỌC */}
                <ColoredLine color="#CEF6F5" />
                {/* Ngoại ngữ  */}

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequireLanguage"
                        title="Is require Language certificate?"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onLanguageChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireLanguage) {
                            return true;
                          }
                          return false;
                        }).map(i => i.id)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* <Row>
                  <Col>
                    <FormGroup>
                      <ValidationInput
                        name="languageReference"
                        title="Language Certificate Reference Content"
                        type="text"
                        required={item.isRequireLanguage}
                        disabled={!item.isRequireLanguage}
                        value={item.languageReference === "" ? "none" : item.languageReference}
                        onChange={this.onModelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

                <Row>
                  <Col>
                    <FormGroup>
                      <CKEditorInput title="Language reference" name="languageReference" data={item.languageReference} onChange={this.onLanguageReferenceChange} />
                    </FormGroup>
                  </Col>
                </Row>

                {/* End TIN HỌC */}
                <ColoredLine color="#CEF6F5" />
                {/* ĐIỂM NGOẠI KHÓA  */}

                <Row>
                  <Col>
                    <FormGroup>
                      <SelectInput
                        name="isRequireExtracurricularPoint"
                        title="Is Require Extracurricular Point?"
                        placeholder="--Please select--"
                        style={{ display: "block" }}
                        onChange={this.onExtracurricularPointChange}
                        options={IS_REQUIRE}
                        valueField="id"
                        nameField="name"
                        defaultValue={IS_REQUIRE.filter(i => {
                          if (i.id === item.isRequireExtracurricularPoint) {
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
                        name="extracurricularPointReference"
                        title="Extracurricular Point Reference Content"
                        type="text"
                        required={item.isRequireExtracurricularPoint}
                        disabled={!item.isRequireExtracurricularPoint}
                        value={item.extracurricularPointReference === "" ? "none" : item.extracurricularPointReference}
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
            <div className="flex-container header-table ">
              <Button onClick={this.showAddNew} className="btn btn-pill btn-success btn-sm">
                Create
              </Button>
              <input
                onChange={this.onSearchChange}
                className="form-control form-control-sm"
                placeholder="Searching..."
              />
            </div>
            <Table className="admin-table table-hover table-striped" responsive bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Standard Certificate name</th>

                  <th style={{ color: "#2ECCFA" , width: '15%'}}>Physical Education</th>
                  {/* <th style={{ color: "#2ECCFA" }}>Reference Content</th> */}

                  <th style={{ color: "#2EFE64" , width: '15%'}}>National Defense And Security</th>
                  {/* <th style={{ color: "#2EFE64" }}>Reference Content</th> */}

                  <th style={{ color: "#FACC2E" , width: '15%'}}>Informatics</th>
                  {/* <th style={{ color: "#FACC2E" }}>Reference Content</th> */}

                  <th style={{ color: "#FE2EF7" , width: '15%'}}>Language</th>
                  {/* <th style={{ color: "#FE2EF7" }}>Reference Content</th> */}

                  <th style={{ color: "#FA5858" , width: '15%'}}>Extracurricular Point</th>
                  {/* <th style={{ color: "#FA5858" }}>Reference Content</th> */}

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

                        <td>
                          {item.isRequirePhysicalEducation ? (<span><FcHighPriority/>&nbsp;Require</span>) : (<span><FcMinus/>&nbsp;Not require</span>)}
                          <hr/>
                          {item.physicalEducationReference}
                        </td>
                        {/* <td style={{ backgroundColor: "#EFFBFB" }}>
                          {item.physicalEducationReference}
                        </td> */}

                        <td>
                          {item.isRequireNationalDefenseAndSecurity ? (<span><FcHighPriority/>&nbsp;Require</span>) : (<span><FcMinus/>&nbsp;Not require</span>)}
                          <hr/>
                          {item.nationalDefenseAndSecurityReference}
                        </td>
                        {/* <td style={{ backgroundColor: "#F2FBEF" }}>
                          {item.nationalDefenseAndSecurityReference}
                        </td> */}

                        <td>
                          {item.isRequireInformatics ? (<span><FcHighPriority/>&nbsp;Require</span>) : (<span><FcMinus/>&nbsp;Not require</span>)}
                          <hr/>
                          {item.informaticsReference}
                        </td>
                        {/* <td style={{ backgroundColor: "#FBFBEF" }}>{item.informaticsReference}</td> */}

                        <td>
                          {item.isRequireLanguage ? (<span><FcHighPriority/>&nbsp;Require</span>) : (<span><FcMinus/>&nbsp;Not require</span>)}
                          <hr/>
                          {ReactHtmlParser(item.languageReference)}
                        </td>
                        {/* <td style={{ backgroundColor: "#F8EFFB" }}>{ReactHtmlParser(item.languageReference)}</td> */}

                        <td>
                          {item.isRequireExtracurricularPoint ? (<span><FcHighPriority/>&nbsp;Require</span>) : (<span><FcMinus/>&nbsp;Not require</span>)}
                          <hr/>
                          {item.extracurricularPointReference }
                        </td>
                        {/* <td style={{ backgroundColor: "#F8E0E0" }}>{item.extracurricularPointReference }</td> */}

                        <td>
                          <Button className="btn-sm" color="info" onClick={() => this.showUpdateModal(item)}>
                            Edit
                          </Button>
                          {/* &nbsp;
                          <Button className="btn-sm" color="danger" onClick={() => this.showConfirmDelete(item.id)}>
                            Delete
                          </Button> */}
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
