import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CLASS_LIST,
  getClassListSuccess,
  getClassListFailed,
  GET_DELETED_CLASS_LIST,
  getDeletedClassListSuccess,
  getDeletedClassListFailed
} from "../actions/class.list.action";
import ApiClass from "../api/api.class";

function* getClassList(action) {
  try {
    const payload = yield call(ApiClass.getClassList, action.payload.params);
    yield put(getClassListSuccess(payload));
  } catch (error) {
    yield put(getClassListFailed());
  }
}

export function* watchClassListSagasAsync() {
  yield takeLatest(GET_CLASS_LIST, getClassList);
}

function* getDeletedClassList(action) {
  try {
    const payload = yield call(ApiClass.getDeletedClassList, action.payload.params);
    yield put(getDeletedClassListSuccess(payload));
  } catch (error) {
    yield put(getDeletedClassListFailed());
  }
}

export function* watchDeletedClassListSagasAsync() {
  yield takeLatest(GET_DELETED_CLASS_LIST, getDeletedClassList);
}
