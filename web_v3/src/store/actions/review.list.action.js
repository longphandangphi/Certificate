export const GET_REVIEW_LIST = "[REVIEW_LIST] GET_REVIEW_LIST";
export const GET_REVIEW_LIST_SUCCESS =
    "[REVIEW_LIST] GET_REVIEW_LIST_SUCCESS";
export const GET_REVIEW_LIST_FAILED =
    "[REVIEW_LIST] GET_REVIEW_LIST_FAILED";

export const getReviewList = (params) => {
    return {
        type: GET_REVIEW_LIST,
        payload: {
            params
        }
    }
}

export const getReviewListSuccess = params => {
    return {
        type: GET_REVIEW_LIST_SUCCESS,
        payload: params
    }
}

export const getReviewListFailed = () => {
    return {
        type: GET_REVIEW_LIST_FAILED
    }
}
