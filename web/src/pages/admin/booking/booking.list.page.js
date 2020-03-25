import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Label, Input, Table } from 'reactstrap';
import Form from 'react-validation/build/form';
import Datetime from 'react-datetime';
import moment from 'moment';
import ModalConfirm from '../../../components/modal/modal-confirm';
import Pagination from '../../../components/pagination/Pagination';
import ModalInfo from '../../../components/modal/modal-info';
import ValidationInput from '../../../components/common/validation-input';
import { toastSuccess, toastError } from '../../../helpers/toast.helper';
import lodash from 'lodash';
import { getBookingList } from '../../../actions/booking.list.action';
import ApiBooking from '../../../api/api.booking';
import { pagination } from '../../../constant/app.constant';

class BookingListPage extends Component {
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
        let title = 'Create Booking';
        let booking = {
            name: ''
        };
        this.toggleModalInfo(booking, title);
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
                this.getBookingList();
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
            () => this.getBookingList()
        );
    };

    getBookingList = () => {
        let params = Object.assign({}, this.state.params, {
            query: this.state.query
        });
        this.props.getBookingList(params);
    };

    addBooking = async () => {
        console.log('state ==================');
        console.log(this.state);
        const { name, startTime, finishTime } = this.state.item;
        const booking = { name, startTime, finishTime };
        try {
            let response = await ApiBooking.postBooking(booking);
            console.log('response');
            console.log(response);
            this.toggleModalInfo();
            this.getBookingList();
            toastSuccess('The booking has been created successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    updateBooking = async () => {
        const { id, name, startTime, finishTime } = this.state.item;
        const booking = { id, name, startTime, finishTime };
        try {
            await ApiBooking.updateBooking(booking);
            this.toggleModalInfo();
            this.getBookingList();
            toastSuccess('The booking has been updated successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    deleteBooking = async () => {
        try {
            await ApiBooking.deleteBooking(this.state.itemId);
            this.toggleDeleteModal();
            this.getBookingList();
            toastSuccess('The booking has been deleted successfully');
        } catch (err) {
            toastError(err + '');
        }
    };

    saveBooking = () => {
        let { id } = this.state.item;
        if (id) {
            this.updateBooking();
        } else {
            this.addBooking();
        }
    };

    onSubmit(e) {
        e.preventDefault();
        this.form.validateAll();
        this.saveBooking();
    }

    componentDidMount() {
        this.getBookingList();
    }

    render() {
        const { isShowDeleteModal, isShowInfoModal, item } = this.state;
        const { bookingPagedList } = this.props.bookingPagedListReducer;
        const { sources, pageIndex, totalPages } = bookingPagedList;
        const hasResults = bookingPagedList.sources && bookingPagedList.sources.length > 0;
        console.log(sources)
        return (
            <div className='animated fadeIn'>
                <ModalConfirm
                    clickOk={this.deleteBooking}
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

                                <div className='text-center'>
                                    <Button color='danger' type='submit'>
                                        Confirm
                                    </Button>
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
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Pax</th>
                                    <th>Checkin</th>
                                    <th>Status</th>
                                    <th>Note</th>
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
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.pax}</td>
                                                <td>{item.timeCheckin}</td>
                                                <td>{item.status}</td>
                                                <td>{item.note}</td>
                                                <td>
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
        bookingPagedListReducer: state.bookingPagedListReducer
    }),
    {
        getBookingList
    }
)(BookingListPage);
