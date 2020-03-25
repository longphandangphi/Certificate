import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_MAJOR_LIST,
  getMajorListSuccess,
  getMajorListFailed,
  GET_DELETED_MAJOR_LIST,
  getDeletedMajorListSuccess,
  getDeletedMajorListFailed
} from "../actions/major.list.action";
import ApiMajor from "../api/api.major";

function* getMajorList(action) {
  try {
    const payload = yield call(ApiMajor.getMajorList, action.payload.params);
    yield put(getMajorListSuccess(payload));
  } catch (error) {
    yield put(getMajorListFailed());
  }
}

export function* watchMajorListSagasAsync() {
  yield takeLatest(GET_MAJOR_LIST, getMajorList);
}

function* getDeletedMajorList(action) {
  try {
    const payload = yield call(ApiMajor.getDeletedMajorList, action.payload.params);
    yield put(getDeletedMajorListSuccess(payload));
  } catch (error) {
    yield put(getDeletedMajorListFailed());
  }
}

export function* watchDeletedMajorListSagasAsync() {
  yield takeLatest(GET_DELETED_MAJOR_LIST, getDeletedMajorList);
}
