import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_EXTRACURRICULAR_LIST,
  getExtracurricularListSuccess,
  getExtracurricularListFailed,
  GET_DELETED_EXTRACURRICULAR_LIST,
  getDeletedExtracurricularListSuccess,
  getDeletedExtracurricularListFailed
} from "../actions/extracurricular.list.action";
import ApiExtracurricular from "../api/api.extracurricular";

function* getExtracurricularList(action) {
  try {
    const payload = yield call(ApiExtracurricular.getExtracurricularList, action.payload.params);
    yield put(getExtracurricularListSuccess(payload));
  } catch (error) {
    yield put(getExtracurricularListFailed());
  }
}

export function* watchExtracurricularListSagasAsync() {
  yield takeLatest(GET_EXTRACURRICULAR_LIST, getExtracurricularList);
}

function* getDeletedExtracurricularList(action) {
  try {
    const payload = yield call(ApiExtracurricular.getDeletedExtracurricularList, action.payload.params);
    yield put(getDeletedExtracurricularListSuccess(payload));
  } catch (error) {
    yield put(getDeletedExtracurricularListFailed());
  }
}

export function* watchDeletedExtracurricularListSagasAsync() {
  yield takeLatest(GET_DELETED_EXTRACURRICULAR_LIST, getDeletedExtracurricularList);
}
