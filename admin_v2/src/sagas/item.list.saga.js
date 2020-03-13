import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ITEM_LIST,
  getItemListSuccess,
  getItemListFailed
} from "../actions/item.list.action";
import ApiItem from "../api/api.item";

function* getItemList(action) {
  try {
    const payload = yield call(ApiItem.getItemList, action.payload.params);
    yield put(getItemListSuccess(payload));
  } catch (error) {
    yield put(getItemListFailed());
  }
}

export function* watchItemListSagasAsync() {
  yield takeLatest(GET_ITEM_LIST, getItemList);
}
