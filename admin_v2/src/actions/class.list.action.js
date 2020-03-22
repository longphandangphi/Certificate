export const GET_CLASS_LIST = "[CLASS_LIST] GET_CLASS_LIST";
export const GET_CLASS_LIST_SUCCESS = "[CLASS_LIST] GET_CLASS_LIST_SUCCESS";
export const GET_CLASS_LIST_FAILED = "[CLASS_LIST] GET_CLASS_LIST_FAILED";
export const GET_DELETED_CLASS_LIST = "[CLASS_LIST] GET_DELETED_CLASS_LIST";
export const GET_DELETED_CLASS_LIST_SUCCESS = "[CLASS_LIST] GET_DELETED_CLASS_LIST_SUCCESS";
export const GET_DELETED_CLASS_LIST_FAILED = "[CLASS_LIST] GET_DELETED_CLASS_LIST_FAILED";

export const getClassList = params => {
  return {
    type: GET_CLASS_LIST,
    payload: {
      params
    }
  };
};

export const getClassListSuccess = params => {
  return {
    type: GET_CLASS_LIST_SUCCESS,
    payload: params
  };
};

export const getClassListFailed = () => {
  return {
    type: GET_CLASS_LIST_FAILED
  };
};

export const getDeletedClassList = params => {
  return {
    type: GET_DELETED_CLASS_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedClassListSuccess = params => {
  return {
    type: GET_DELETED_CLASS_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedClassListFailed = () => {
  return {
    type: GET_DELETED_CLASS_LIST_FAILED
  };
};
