import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TABLE_LIST, getTableListSuccess, getTableListFailed } from "../actions/table.list.action";
import ApiTable from "../api/api.table";

function* getTableList(action) {
  try {
    const payload = yield call(ApiTable.getTableList, action.payload.params);
    yield put(getTableListSuccess(payload));
  } catch (error) {
    yield put(getTableListFailed());
  }
}

export function* watchTableListSagasAsync() {
  yield takeLatest(GET_TABLE_LIST, getTableList);
}
