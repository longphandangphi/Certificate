import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_MENU_LIST,
  getMenuListSuccess,
  getMenuListFailed
} from "../actions/menu.list.action";
import ApiMenu from "../api/api.menu";

function* getMenuList(action) {
  try {
    const payload = yield call(ApiMenu.getMenuList, action.payload.params);
    yield put(getMenuListSuccess(payload));
  } catch (error) {
    yield put(getMenuListFailed());
  }
}

export function* watchMenuListSagasAsync() {
  yield takeLatest(GET_MENU_LIST, getMenuList);
}
