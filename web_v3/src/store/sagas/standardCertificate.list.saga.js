import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_STANDARD_CERTIFICATE_LIST,
  getStandardCertificateListSuccess,
  getStandardCertificateListFailed,
  GET_DELETED_STANDARD_CERTIFICATE_LIST,
  getDeletedStandardCertificateListSuccess,
  getDeletedStandardCertificateListFailed
} from "../actions/standardCertificate.list.action";
import ApiStandardCertificate from "../api/api.standardCertificate";

function* getStandardCertificateList(action) {
  try {
    const payload = yield call(ApiStandardCertificate.getStandardCertificateList, action.payload.params);
    yield put(getStandardCertificateListSuccess(payload));
  } catch (error) {
    yield put(getStandardCertificateListFailed());
  }
}

export function* watchStandardCertificateListSagasAsync() {
  yield takeLatest(GET_STANDARD_CERTIFICATE_LIST, getStandardCertificateList);
}

function* getDeletedStandardCertificateList(action) {
  try {
    const payload = yield call(ApiStandardCertificate.getDeletedStandardCertificateList, action.payload.params);
    yield put(getDeletedStandardCertificateListSuccess(payload));
  } catch (error) {
    yield put(getDeletedStandardCertificateListFailed());
  }
}

export function* watchDeletedStandardCertificateListSagasAsync() {
  yield takeLatest(GET_DELETED_STANDARD_CERTIFICATE_LIST, getDeletedStandardCertificateList);
}
