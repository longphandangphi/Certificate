import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_BOOKING_LIST,
    getBookingListSuccess,
    getBookingListFailed
} from "../actions/booking.list.action";
import ApiBooking from "../api/api.booking";

function* getBookingList(action) {
    try {
        const payload = yield call(
            ApiBooking.getBookingList,
            action.payload.params
        );
        yield put(getBookingListSuccess(payload));
    } catch (error) {
        yield put(getBookingListFailed());
    }
}

export function* watchBookingListSagasAsync() {
    yield takeLatest(GET_BOOKING_LIST, getBookingList);
}
