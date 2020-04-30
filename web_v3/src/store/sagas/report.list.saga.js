import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_REPORT_LIST,
  getReportListSuccess,
  getReportListFailed,
  GET_DELETED_REPORT_LIST,
  getDeletedReportListSuccess,
  getDeletedReportListFailed
} from "../actions/report.list.action";
import ApiReport from "../api/api.report";

function* getReportList(action) {
  try {
    const payload = yield call(ApiReport.getReportList, action.payload.params);
    yield put(getReportListSuccess(payload));
  } catch (error) {
    yield put(getReportListFailed());
  }
}

export function* watchReportListSagasAsync() {
  yield takeLatest(GET_REPORT_LIST, getReportList);
}

function* getDeletedReportList(action) {
  try {
    const payload = yield call(ApiReport.getDeletedReportList, action.payload.params);
    yield put(getDeletedReportListSuccess(payload));
  } catch (error) {
    yield put(getDeletedReportListFailed());
  }
}

export function* watchDeletedReportListSagasAsync() {
  yield takeLatest(GET_DELETED_REPORT_LIST, getDeletedReportList);
}
