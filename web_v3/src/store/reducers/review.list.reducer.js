import {
    GET_REVIEW_LIST,
    GET_REVIEW_LIST_SUCCESS,
    GET_REVIEW_LIST_FAILED
} from "../actions/review.list.action";

const initialState = {
    reviewPagedList: {},
    loading: false,
    failed: false
};

export function reviewListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            });
        case GET_REVIEW_LIST_SUCCESS:
            return Object.assign({}, state, {
                reviewPagedList: action.payload,
                loading: false,
                failed: false
            });
        case GET_REVIEW_LIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                failed: true
            });
        default:
            return state;
    }
}
