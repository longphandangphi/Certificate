import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ORDER_LIST,
  getOrderListSuccess,
  getOrderListFailed,
  GET_DELETED_ORDER_LIST,
  getDeletedOrderListSuccess,
  getDeletedOrderListFailed
} from "../actions/order.list.action";
import ApiOrder from "../api/api.order";

function* getOrderList(action) {
  try {
    const payload = yield call(ApiOrder.getOrderList, action.payload.params);
    yield put(getOrderListSuccess(payload));
  } catch (error) {
    yield put(getOrderListFailed());
  }
}

export function* watchOrderListSagasAsync() {
  yield takeLatest(GET_ORDER_LIST, getOrderList);
}

function* getDeletedOrderList(action) {
  try {
    const payload = yield call(ApiOrder.getDeletedOrderList, action.payload.params);
    yield put(getDeletedOrderListSuccess(payload));
  } catch (error) {
    yield put(getDeletedOrderListFailed());
  }
}

export function* watchDeletedOrderListSagasAsync() {
  yield takeLatest(GET_DELETED_ORDER_LIST, getDeletedOrderList);
}
