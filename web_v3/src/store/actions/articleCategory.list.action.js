export const GET_ARTICLE_CATEGORY_LIST = "[ARTICLE_CATEGORY_LIST] GET_ARTICLE_CATEGORY_LIST";
export const GET_ARTICLE_CATEGORY_LIST_SUCCESS = "[ARTICLE_CATEGORY_LIST] GET_ARTICLE_CATEGORY_LIST_SUCCESS";
export const GET_ARTICLE_CATEGORY_LIST_FAILED = "[ARTICLE_CATEGORY_LIST] GET_ARTICLE_CATEGORY_LIST_FAILED";
export const GET_DELETED_ARTICLE_CATEGORY_LIST = "[ARTICLE_CATEGORY_LIST] GET_DELETED_ARTICLE_CATEGORY_LIST";
export const GET_DELETED_ARTICLE_CATEGORY_LIST_SUCCESS =
  "[ARTICLE_CATEGORY_LIST] GET_DELETED_ARTICLE_CATEGORY_LIST_SUCCESS";
export const GET_DELETED_ARTICLE_CATEGORY_LIST_FAILED =
  "[ARTICLE_CATEGORY_LIST] GET_DELETED_ARTICLE_CATEGORY_LIST_FAILED";

export const getArticleCategoryList = params => {
  return {
    type: GET_ARTICLE_CATEGORY_LIST,
    payload: {
      params
    }
  };
};

export const getArticleCategoryListSuccess = params => {
  return {
    type: GET_ARTICLE_CATEGORY_LIST_SUCCESS,
    payload: params
  };
};

export const getArticleCategoryListFailed = () => {
  return {
    type: GET_ARTICLE_CATEGORY_LIST_FAILED
  };
};

export const getDeletedArticleCategoryList = params => {
  return {
    type: GET_DELETED_ARTICLE_CATEGORY_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedArticleCategoryListSuccess = params => {
  return {
    type: GET_DELETED_ARTICLE_CATEGORY_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedArticleCategoryListFailed = () => {
  return {
    type: GET_DELETED_ARTICLE_CATEGORY_LIST_FAILED
  };
};
