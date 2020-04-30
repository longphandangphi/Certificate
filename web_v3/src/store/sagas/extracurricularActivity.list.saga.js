import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_EXTRACURRICULAR_ACTIVITY_LIST,
  getExtracurricularActivityListSuccess,
  getExtracurricularActivityListFailed,
  GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST,
  getDeletedExtracurricularActivityListSuccess,
  getDeletedExtracurricularActivityListFailed
} from "../actions/extracurricularActivity.list.action";
import ApiExtracurricularActivity from "../api/api.extracurricularActivity";

function* getExtracurricularActivityList(action) {
  try {
    const payload = yield call(ApiExtracurricularActivity.getExtracurricularActivityList, action.payload.params);
    yield put(getExtracurricularActivityListSuccess(payload));
  } catch (error) {
    yield put(getExtracurricularActivityListFailed());
  }
}

export function* watchExtracurricularActivityListSagasAsync() {
  yield takeLatest(GET_EXTRACURRICULAR_ACTIVITY_LIST, getExtracurricularActivityList);
}

function* getDeletedExtracurricularActivityList(action) {
  try {
    const payload = yield call(ApiExtracurricularActivity.getDeletedExtracurricularActivityList, action.payload.params);
    yield put(getDeletedExtracurricularActivityListSuccess(payload));
  } catch (error) {
    yield put(getDeletedExtracurricularActivityListFailed());
  }
}

export function* watchDeletedExtracurricularActivityListSagasAsync() {
  yield takeLatest(GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST, getDeletedExtracurricularActivityList);
}
