export const GET_EXTRACURRICULAR_LIST = "[EXTRACURRICULAR_LIST] GET_EXTRACURRICULAR_LIST";
export const GET_EXTRACURRICULAR_LIST_SUCCESS = "[EXTRACURRICULAR_LIST] GET_EXTRACURRICULAR_LIST_SUCCESS";
export const GET_EXTRACURRICULAR_LIST_FAILED = "[EXTRACURRICULAR_LIST] GET_EXTRACURRICULAR_LIST_FAILED";
export const GET_DELETED_EXTRACURRICULAR_LIST = "[EXTRACURRICULAR_LIST] GET_DELETED_EXTRACURRICULAR_LIST";
export const GET_DELETED_EXTRACURRICULAR_LIST_SUCCESS =
  "[EXTRACURRICULAR_LIST] GET_DELETED_EXTRACURRICULAR_LIST_SUCCESS";
export const GET_DELETED_EXTRACURRICULAR_LIST_FAILED = "[EXTRACURRICULAR_LIST] GET_DELETED_EXTRACURRICULAR_LIST_FAILED";

export const getExtracurricularList = params => {
  return {
    type: GET_EXTRACURRICULAR_LIST,
    payload: {
      params
    }
  };
};

export const getExtracurricularListSuccess = params => {
  return {
    type: GET_EXTRACURRICULAR_LIST_SUCCESS,
    payload: params
  };
};

export const getExtracurricularListFailed = () => {
  return {
    type: GET_EXTRACURRICULAR_LIST_FAILED
  };
};

export const getDeletedExtracurricularList = params => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedExtracurricularListSuccess = params => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedExtracurricularListFailed = () => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_LIST_FAILED
  };
};
