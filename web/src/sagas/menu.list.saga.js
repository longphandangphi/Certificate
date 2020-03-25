import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_MENU_LIST,
  getMenuListSuccess,
  getMenuListFailed,
  GET_DELETED_MENU_LIST,
  getDeletedMenuListSuccess,
  getDeletedMenuListFailed
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

function* getDeletedMenuList(action) {
  try {
    const payload = yield call(ApiMenu.getDeletedMenuList, action.payload.params);
    yield put(getDeletedMenuListSuccess(payload));
  } catch (error) {
    yield put(getDeletedMenuListFailed());
  }
}

export function* watchDeletedMenuListSagasAsync() {
  yield takeLatest(GET_DELETED_MENU_LIST, getDeletedMenuList);
}
