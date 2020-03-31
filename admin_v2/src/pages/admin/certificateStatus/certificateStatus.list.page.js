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
import { getCertificateStatusList } from "../../../actions/certificateStatus.list.action";
import ApiCertificateStatus from "../../../api/api.certificateStatus";
import ApiStudent from "../../../api/api.student";
import { pagination } from "../../../constant/app.constant";

class CertificateStatusListPage extends Component {
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
    let title = "Create CertificateStatus";
    let certificateStatus = {
      name: "",
      description: ""
    };
    this.toggleModalInfo(certificateStatus, title);
  };

  showUpdateModal = item => {
    let title = "Update CertificateStatus";
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
        this.getCertificateStatusList();
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
      () => this.getCertificateStatusList()
    );
  };

  getCertificateStatusList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getCertificateStatusList(params);
  };

  addCertificateStatus = async () => {
    console.log("state ==================");
    console.log(this.state);
    const { name, description } = this.state.item;
    const certificateStatus = { name, description };
    try {
      let response = await ApiCertificateStatus.postCertificateStatus(certificateStatus);
      console.log("response");
      console.log(response);
      this.toggleModalInfo();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been created successfully");
    } catch (err) {
      console.log(err);
      toastError("This CertificateStatus name is exist!");
    }
  };

  updateCertificateStatus = async () => {
    const { id, name, description } = this.state.item;
    const certificateStatus = { id, name, description };
    try {
      await ApiCertificateStatus.updateCertificateStatus(certificateStatus);
      this.toggleModalInfo();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been updated successfully");
    } catch (err) {
      toastError("This CertificateStatus name is exist!");
    }
  };

  deleteCertificateStatus = async () => {
    try {
      await ApiCertificateStatus.deleteCertificateStatus(this.state.itemId);
      this.toggleDeleteModal();
      this.getCertificateStatusList();
      toastSuccess("The certificateStatus has been deleted successfully");
    } catch (err) {
      toastError(err + "");
    }
  };

  saveCertificateStatus = () => {
    let { id } = this.state.item;
    if (id) {
      this.updateCertificateStatus();
    } else {
      this.addCertificateStatus();
    }
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveCertificateStatus();
  }

  componentDidMount() {
    this.getCertificateStatusList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { certificateStatusPagedList } = this.props.certificateStatusPagedListReducer;
    const { sources, pageIndex, totalPages } = certificateStatusPagedList;
    const hasResults = sources && sources.length > 0;
    return (
      <div className="animated fadeIn">
        <ModalConfirm
          clickOk={this.deleteCertificateStatus}
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
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>GDQP</th>
                  <th>GDTC</th>
                  <th>CCNN</th>
                  <th>CCTH</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hasResults &&
                  sources.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.studentViewModel.id}</td>
                        <td>{item.studentViewModel.lastName + " " + item.studentViewModel.firstName}</td>
                        <td>
                          {item.nationalDefenseAndSecurityCertificateStatus ? "Đã hoàn thành" : "Chưa hoàn thành"}
                        </td>
                        <td>{item.physicalEducationCertificateStatus ? "Đã hoàn thành" : "Chưa hoàn thành"}</td>
                        <td>{item.languageCertificateStatus ? "Đã hoàn thành" : "Chưa hoàn thành"}</td>
                        <td>{item.informaticsCertificateStatus ? "Đã hoàn thành" : "Chưa hoàn thành"}</td>
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
    certificateStatusPagedListReducer: state.certificateStatusPagedListReducer
  }),
  {
    getCertificateStatusList
  }
)(CertificateStatusListPage);
