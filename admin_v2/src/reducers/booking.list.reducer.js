import {
    GET_BOOKING_LIST,
    GET_BOOKING_LIST_SUCCESS,
    GET_BOOKING_LIST_FAILED
} from "../actions/booking.list.action";

const initialState = {
    bookingPagedList: {},
    loading: false,
    failed: false
};

export function bookingListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKING_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            });
        case GET_BOOKING_LIST_SUCCESS:
            return Object.assign({}, state, {
                bookingPagedList: action.payload,
                loading: false,
                failed: false
            });
        case GET_BOOKING_LIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                failed: true
            });
        default:
            return state;
    }
}
