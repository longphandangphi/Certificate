import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SPECIALTY_LIST,
  getSpecialtyListSuccess,
  getSpecialtyListFailed,
  GET_DELETED_SPECIALTY_LIST,
  getDeletedSpecialtyListSuccess,
  getDeletedSpecialtyListFailed
} from "../actions/specialty.list.action";
import ApiSpecialty from "../api/api.specialty";

function* getSpecialtyList(action) {
  try {
    const payload = yield call(ApiSpecialty.getSpecialtyList, action.payload.params);
    yield put(getSpecialtyListSuccess(payload));
  } catch (error) {
    yield put(getSpecialtyListFailed());
  }
}

export function* watchSpecialtyListSagasAsync() {
  yield takeLatest(GET_SPECIALTY_LIST, getSpecialtyList);
}

function* getDeletedSpecialtyList(action) {
  try {
    const payload = yield call(ApiSpecialty.getDeletedSpecialtyList, action.payload.params);
    yield put(getDeletedSpecialtyListSuccess(payload));
  } catch (error) {
    yield put(getDeletedSpecialtyListFailed());
  }
}

export function* watchDeletedSpecialtyListSagasAsync() {
  yield takeLatest(GET_DELETED_SPECIALTY_LIST, getDeletedSpecialtyList);
}
