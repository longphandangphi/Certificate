import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CERTIFICATE_STATUS_LIST,
  getCertificateStatusListSuccess,
  getCertificateStatusListFailed,
  GET_DELETED_CERTIFICATE_STATUS_LIST,
  getDeletedCertificateStatusListSuccess,
  getDeletedCertificateStatusListFailed
} from "../actions/certificateStatus.list.action";
import ApiCertificateStatus from "../api/api.certificateStatus";

function* getCertificateStatusList(action) {
  try {
    const payload = yield call(ApiCertificateStatus.getCertificateStatusList, action.payload.params);
    yield put(getCertificateStatusListSuccess(payload));
  } catch (error) {
    yield put(getCertificateStatusListFailed());
  }
}

export function* watchCertificateStatusListSagasAsync() {
  yield takeLatest(GET_CERTIFICATE_STATUS_LIST, getCertificateStatusList);
}

function* getDeletedCertificateStatusList(action) {
  try {
    const payload = yield call(ApiCertificateStatus.getDeletedCertificateStatusList, action.payload.params);
    yield put(getDeletedCertificateStatusListSuccess(payload));
  } catch (error) {
    yield put(getDeletedCertificateStatusListFailed());
  }
}

export function* watchDeletedCertificateStatusListSagasAsync() {
  yield takeLatest(GET_DELETED_CERTIFICATE_STATUS_LIST, getDeletedCertificateStatusList);
}
