import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_REVIEW_LIST,
    getReviewListSuccess,
    getReviewListFailed
} from "../actions/review.list.action";
import ApiReview from "../api/api.review";

function* getReviewList(action) {
    try {
        const payload = yield call(
            ApiReview.getReviewList,
            action.payload.params
        );
        yield put(getReviewListSuccess(payload));
    } catch (error) {
        yield put(getReviewListFailed());
    }
}

export function* watchReviewListSagasAsync() {
    yield takeLatest(GET_REVIEW_LIST, getReviewList);
}
