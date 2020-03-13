import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_USER_LIST,
    getUserListSuccess,
    getUserListFailed
} from "../actions/user.list.action";
import ApiUser from "../api/api.user";

function* getUserList(action) {
    try {
        const payload = yield call(
            ApiUser.getUserList,
            action.payload.params
        );
        yield put(getUserListSuccess(payload));
    } catch (error) {
        yield put(getUserListFailed());
    }
}

export function* watchUserListSagasAsync() {
    yield takeLatest(GET_USER_LIST, getUserList);
}
