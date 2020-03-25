import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_FACULTY_LIST,
  getFacultyListSuccess,
  getFacultyListFailed,
  GET_DELETED_FACULTY_LIST,
  getDeletedFacultyListSuccess,
  getDeletedFacultyListFailed
} from "../actions/faculty.list.action";
import ApiFaculty from "../api/api.faculty";

function* getFacultyList(action) {
  try {
    const payload = yield call(ApiFaculty.getFacultyList, action.payload.params);
    yield put(getFacultyListSuccess(payload));
  } catch (error) {
    yield put(getFacultyListFailed());
  }
}

export function* watchFacultyListSagasAsync() {
  yield takeLatest(GET_FACULTY_LIST, getFacultyList);
}

function* getDeletedFacultyList(action) {
  try {
    const payload = yield call(ApiFaculty.getDeletedFacultyList, action.payload.params);
    yield put(getDeletedFacultyListSuccess(payload));
  } catch (error) {
    yield put(getDeletedFacultyListFailed());
  }
}

export function* watchDeletedFacultyListSagasAsync() {
  yield takeLatest(GET_DELETED_FACULTY_LIST, getDeletedFacultyList);
}
