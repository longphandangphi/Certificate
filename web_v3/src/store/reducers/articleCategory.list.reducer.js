import {
  GET_ARTICLE_CATEGORY_LIST,
  GET_ARTICLE_CATEGORY_LIST_SUCCESS,
  GET_ARTICLE_CATEGORY_LIST_FAILED,
  GET_DELETED_ARTICLE_CATEGORY_LIST,
  GET_DELETED_ARTICLE_CATEGORY_LIST_SUCCESS,
  GET_DELETED_ARTICLE_CATEGORY_LIST_FAILED
} from "../actions/articleCategory.list.action";

const initialState = {
  articleCategoryPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function articleCategoryListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE_CATEGORY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_ARTICLE_CATEGORY_LIST_SUCCESS:
      return Object.assign({}, state, {
        articleCategoryPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_ARTICLE_CATEGORY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_ARTICLE_CATEGORY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_ARTICLE_CATEGORY_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_ARTICLE_CATEGORY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
