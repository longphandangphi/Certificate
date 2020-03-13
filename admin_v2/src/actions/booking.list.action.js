export const GET_BOOKING_LIST = "[BOOKING_LIST] GET_BOOKING_LIST";
export const GET_BOOKING_LIST_SUCCESS =
    "[BOOKING_LIST] GET_BOOKING_LIST_SUCCESS";
export const GET_BOOKING_LIST_FAILED =
    "[BOOKING_LIST] GET_BOOKING_LIST_FAILED";

export const getBookingList = (params) => {
    return {
        type: GET_BOOKING_LIST,
        payload: {
            params
        }
    }
}

export const getBookingListSuccess = params => {
    return {
        type: GET_BOOKING_LIST_SUCCESS,
        payload: params
    }
}

export const getBookingListFailed = () => {
    return {
        type: GET_BOOKING_LIST_FAILED
    }
}
