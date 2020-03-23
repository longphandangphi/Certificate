import {
  GET_ARTICLE_LIST,
  GET_ARTICLE_LIST_SUCCESS,
  GET_ARTICLE_LIST_FAILED,
  GET_DELETED_ARTICLE_LIST,
  GET_DELETED_ARTICLE_LIST_SUCCESS,
  GET_DELETED_ARTICLE_LIST_FAILED
} from "../actions/article.list.action";

const initialState = {
  articlePagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function articleListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_ARTICLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        articlePagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_ARTICLE_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_ARTICLE_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_ARTICLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_ARTICLE_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
