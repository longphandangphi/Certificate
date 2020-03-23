export const GET_ARTICLE_LIST = "[ARTICLE_LIST] GET_ARTICLE_LIST";
export const GET_ARTICLE_LIST_SUCCESS = "[ARTICLE_LIST] GET_ARTICLE_LIST_SUCCESS";
export const GET_ARTICLE_LIST_FAILED = "[ARTICLE_LIST] GET_ARTICLE_LIST_FAILED";
export const GET_DELETED_ARTICLE_LIST = "[ARTICLE_LIST] GET_DELETED_ARTICLE_LIST";
export const GET_DELETED_ARTICLE_LIST_SUCCESS = "[ARTICLE_LIST] GET_DELETED_ARTICLE_LIST_SUCCESS";
export const GET_DELETED_ARTICLE_LIST_FAILED = "[ARTICLE_LIST] GET_DELETED_ARTICLE_LIST_FAILED";

export const getArticleList = params => {
  return {
    type: GET_ARTICLE_LIST,
    payload: {
      params
    }
  };
};

export const getArticleListSuccess = params => {
  return {
    type: GET_ARTICLE_LIST_SUCCESS,
    payload: params
  };
};

export const getArticleListFailed = () => {
  return {
    type: GET_ARTICLE_LIST_FAILED
  };
};

export const getDeletedArticleList = params => {
  return {
    type: GET_DELETED_ARTICLE_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedArticleListSuccess = params => {
  return {
    type: GET_DELETED_ARTICLE_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedArticleListFailed = () => {
  return {
    type: GET_DELETED_ARTICLE_LIST_FAILED
  };
};
