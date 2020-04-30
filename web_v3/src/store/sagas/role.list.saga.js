import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_ROLE_LIST,
    getRoleListSuccess,
    getRoleListFailed
} from "../actions/role.list.action";
import ApiRole from "../api/api.role";

function* getRoleList(action) {
    try {
        const payload = yield call(
            ApiRole.getRoleList,
            action.payload.params
        );
        yield put(getRoleListSuccess(payload));
    } catch (error) {
        yield put(getRoleListFailed());
    }
}

export function* watchRoleListSagasAsync() {
    yield takeLatest(GET_ROLE_LIST, getRoleList);
}
