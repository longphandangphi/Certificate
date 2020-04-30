export const GET_MAJOR_LIST = "[MAJOR_LIST] GET_MAJOR_LIST";
export const GET_MAJOR_LIST_SUCCESS = "[MAJOR_LIST] GET_MAJOR_LIST_SUCCESS";
export const GET_MAJOR_LIST_FAILED = "[MAJOR_LIST] GET_MAJOR_LIST_FAILED";
export const GET_DELETED_MAJOR_LIST = "[MAJOR_LIST] GET_DELETED_MAJOR_LIST";
export const GET_DELETED_MAJOR_LIST_SUCCESS = "[MAJOR_LIST] GET_DELETED_MAJOR_LIST_SUCCESS";
export const GET_DELETED_MAJOR_LIST_FAILED = "[MAJOR_LIST] GET_DELETED_MAJOR_LIST_FAILED";

export const getMajorList = params => {
  return {
    type: GET_MAJOR_LIST,
    payload: {
      params
    }
  };
};

export const getMajorListSuccess = params => {
  return {
    type: GET_MAJOR_LIST_SUCCESS,
    payload: params
  };
};

export const getMajorListFailed = () => {
  return {
    type: GET_MAJOR_LIST_FAILED
  };
};

export const getDeletedMajorList = params => {
  return {
    type: GET_DELETED_MAJOR_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedMajorListSuccess = params => {
  return {
    type: GET_DELETED_MAJOR_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedMajorListFailed = () => {
  return {
    type: GET_DELETED_MAJOR_LIST_FAILED
  };
};
