import { call, put, takeLatest } from "redux-saga/effects";
import { GET_CUSTOMER_LIST, getCustomerListSuccess, getCustomerListFailed } from "../actions/customer.list.action";
import ApiCustomer from "../api/api.customer";

function* getCustomerList(action) {
  try {
    const payload = yield call(ApiCustomer.getCustomerList, action.payload.params);
    yield put(getCustomerListSuccess(payload));
  } catch (error) {
    yield put(getCustomerListFailed());
  }
}

export function* watchCustomerListSagasAsync() {
  yield takeLatest(GET_CUSTOMER_LIST, getCustomerList);
}
