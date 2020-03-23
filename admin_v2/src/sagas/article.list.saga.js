import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ARTICLE_LIST,
  getArticleListSuccess,
  getArticleListFailed,
  GET_DELETED_ARTICLE_LIST,
  getDeletedArticleListSuccess,
  getDeletedArticleListFailed
} from "../actions/article.list.action";
import ApiArticle from "../api/api.article";

function* getArticleList(action) {
  try {
    const payload = yield call(ApiArticle.getArticleList, action.payload.params);
    yield put(getArticleListSuccess(payload));
  } catch (error) {
    yield put(getArticleListFailed());
  }
}

export function* watchArticleListSagasAsync() {
  yield takeLatest(GET_ARTICLE_LIST, getArticleList);
}

function* getDeletedArticleList(action) {
  try {
    const payload = yield call(ApiArticle.getDeletedArticleList, action.payload.params);
    yield put(getDeletedArticleListSuccess(payload));
  } catch (error) {
    yield put(getDeletedArticleListFailed());
  }
}

export function* watchDeletedArticleListSagasAsync() {
  yield takeLatest(GET_DELETED_ARTICLE_LIST, getDeletedArticleList);
}
