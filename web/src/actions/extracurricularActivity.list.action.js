export const GET_EXTRACURRICULAR_ACTIVITY_LIST = "[EXTRACURRICULAR_ACTIVITY_LIST] GET_EXTRACURRICULAR_ACTIVITY_LIST";
export const GET_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS =
  "[EXTRACURRICULAR_ACTIVITY_LIST] GET_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS";
export const GET_EXTRACURRICULAR_ACTIVITY_LIST_FAILED =
  "[EXTRACURRICULAR_ACTIVITY_LIST] GET_EXTRACURRICULAR_ACTIVITY_LIST_FAILED";
export const GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST =
  "[EXTRACURRICULAR_ACTIVITY_LIST] GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST";
export const GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS =
  "[EXTRACURRICULAR_ACTIVITY_LIST] GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS";
export const GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_FAILED =
  "[EXTRACURRICULAR_ACTIVITY_LIST] GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_FAILED";

export const getExtracurricularActivityList = params => {
  return {
    type: GET_EXTRACURRICULAR_ACTIVITY_LIST,
    payload: {
      params
    }
  };
};

export const getExtracurricularActivityListSuccess = params => {
  return {
    type: GET_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS,
    payload: params
  };
};

export const getExtracurricularActivityListFailed = () => {
  return {
    type: GET_EXTRACURRICULAR_ACTIVITY_LIST_FAILED
  };
};

export const getDeletedExtracurricularActivityList = params => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedExtracurricularActivityListSuccess = params => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedExtracurricularActivityListFailed = () => {
  return {
    type: GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_FAILED
  };
};
