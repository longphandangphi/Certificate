import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Label, Input, Table } from 'reactstrap';
import Form from 'react-validation/build/form';
import ModalConfirm from '../../../components/modal/modal-confirm';
import Pagination from '../../../components/pagination/Pagination';
import ModalInfo from '../../../components/modal/modal-info';
import ValidationInput from '../../../components/common/validation-input';
import SelectInput from "../../../components/common/select-input";
import { toastSuccess, toastError } from '../../../helpers/toast.helper';
import lodash from 'lodash';
import { getClassList } from '../../../actions/class.list.action';
import ApiClass from '../../../api/api.class';
import ApiFaculty from "../../../api/api.faculty";
import { pagination } from '../../../constant/app.constant';

class ClassListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDeleteModal: false,
            isShowInfoModal: false,
            item: {},
            faculties: [],
            itemId: null,
            params: {
                skip: pagination.initialPage,
                take: pagination.defaultTake
            },
            query: ''
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
        let title = 'Create Class';
        let classObj = {
            name: '',
            description: ''
        };
        this.toggleModalInfo(classObj, title);
    };

    showUpdateModal = item => {
        let title = 'Update Class';
        this.toggleModalInfo(item, title);
    };

    onModelChange = el => {
        let inputName = el.target.name;
        let inputValue = el.target.value;
        let item = Object.assign({}, this.state.item);
        item[inputName] = inputValue;
        this.setState({ item });
    };

    onFacultyChange = value => {
        let item = Object.assign({}, this.state.item);
        item.facultyId = value;
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
                this.getClassList();
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
            () => this.getClassList()
        );
    };

    getClassList = () => {
        let params = Object.assign({}, this.state.params, {
            query: this.state.query
        });
        this.props.getClassList(params);
    };

    getFacultyList = () => {
        ApiFaculty.getAllFaculty().then(values => {
          this.setState({ faculties: values.sources });
        });
    };

    addClass = async () => {
        console.log('state ==================');
        console.log(this.state);
        const { name, facultyId, description } = this.state.item;
        const classObj = { name, facultyId, description };
        try {
            let response = await ApiClass.postClass(classObj);
            console.log('response');
            console.log(response);
            this.toggleModalInfo();
            this.getClassList();
            toastSuccess('The class has been created successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    updateClass = async () => {
        const { id, name, description } = this.state.item;
        const classObj = { id, name, description };
        try {
            await ApiClass.updateClass(classObj);
            this.toggleModalInfo();
            this.getClassList();
            toastSuccess('The class has been updated successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    deleteClass = async () => {
        try {
            await ApiClass.deleteClass(this.state.itemId);
            this.toggleDeleteModal();
            this.getClassList();
            toastSuccess('The classObj has been deleted successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    saveClass = () => {
        let { id } = this.state.item;
        if (id) {
            this.updateClass();
        } else {
            this.addClass();
        }
    };

    onSubmit(e) {
        e.preventDefault();
        this.form.validateAll();
        this.saveClass();
    }

    componentDidMount() {
        this.getClassList();
        this.getFacultyList();
    }

    render() {
        const { isShowDeleteModal, isShowInfoModal, item, faculties } = this.state;
        const { classPagedList } = this.props.classPagedListReducer;
        const { sources, pageIndex, totalPages } = classPagedList;
        const hasResults = sources && sources.length > 0;
        return (
            <div className='animated fadeIn'>
                <ModalConfirm
                    clickOk={this.deleteClass}
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

                                <Row>
                                    <Col>
                                        <FormGroup>
                                        <SelectInput
                                            placeholder="--Select Faculty--"
                                            name="facultyId"
                                            title="Faculty"
                                            defaultValue={item.faculty ? item.faculty.id : ""}
                                            showSearch={true}
                                            style={{ display: "block" }}
                                            required={true}
                                            onChange={this.onFacultyChange}
                                            options={faculties}
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
                                                name='description'
                                                title='Description'
                                                type='text'
                                                required={true}
                                                value={item.description}
                                                onChange={this.onModelChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className='text-center'>
                                    <Button color='danger' type='submit'>
                                        Confirm
                                    </Button>{' '}
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
                                    <th>STT</th>
                                    <th>Class name</th>
                                    <th>Faculty name</th>
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
                                                <td>{item.faculty.name}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <Button className='btn-sm' color='secondary' onClick={() => this.showUpdateModal(item)}>
                                                        Edit
                                                    </Button>&nbsp;
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
        classPagedListReducer: state.classPagedListReducer
    }),
    {
        getClassList
    }
)(ClassListPage);
