import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ARTICLE_CATEGORY_LIST,
  getArticleCategoryListSuccess,
  getArticleCategoryListFailed,
  GET_DELETED_ARTICLE_CATEGORY_LIST,
  getDeletedArticleCategoryListSuccess,
  getDeletedArticleCategoryListFailed
} from "../actions/articleCategory.list.action";
import ApiArticleCategory from "../api/api.articleCategory";

function* getArticleCategoryList(action) {
  try {
    const payload = yield call(ApiArticleCategory.getArticleCategoryList, action.payload.params);
    yield put(getArticleCategoryListSuccess(payload));
  } catch (error) {
    yield put(getArticleCategoryListFailed());
  }
}

export function* watchArticleCategoryListSagasAsync() {
  yield takeLatest(GET_ARTICLE_CATEGORY_LIST, getArticleCategoryList);
}

function* getDeletedArticleCategoryList(action) {
  try {
    const payload = yield call(ApiArticleCategory.getDeletedArticleCategoryList, action.payload.params);
    yield put(getDeletedArticleCategoryListSuccess(payload));
  } catch (error) {
    yield put(getDeletedArticleCategoryListFailed());
  }
}

export function* watchDeletedArticleCategoryListSagasAsync() {
  yield takeLatest(GET_DELETED_ARTICLE_CATEGORY_LIST, getDeletedArticleCategoryList);
}
