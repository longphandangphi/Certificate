import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_STUDENT_LIST,
  GET_STUDENT_LIST_2,
  getStudentListSuccess,
  getStudentListFailed,
  GET_DELETED_STUDENT_LIST,
  getDeletedStudentListSuccess,
  getDeletedStudentListFailed
} from "../actions/student.list.action";
import ApiStudent from "../api/api.student";

function* getStudentList(action) {
  try {
    const payload = yield call(ApiStudent.getStudentList, action.payload.params);
    yield put(getStudentListSuccess(payload));
  } catch (error) {
    yield put(getStudentListFailed());
  }
}

export function* watchStudentListSagasAsync() {
  yield takeLatest(GET_STUDENT_LIST, getStudentList);
}

function* getStudentList2(action) {
  try {
    const payload = yield call(ApiStudent.getStudentList2, action.payload.params);
    yield put(getStudentListSuccess(payload));
  } catch (error) {
    yield put(getStudentListFailed());
  }
}

export function* watchStudentListSagasAsync2() {
  yield takeLatest(GET_STUDENT_LIST_2, getStudentList2);
}

function* getDeletedStudentList(action) {
  try {
    const payload = yield call(ApiStudent.getDeletedStudentList, action.payload.params);
    yield put(getDeletedStudentListSuccess(payload));
  } catch (error) {
    yield put(getDeletedStudentListFailed());
  }
}

export function* watchDeletedStudentListSagasAsync() {
  yield takeLatest(GET_DELETED_STUDENT_LIST, getDeletedStudentList);
}
