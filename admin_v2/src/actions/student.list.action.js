export const GET_STUDENT_LIST = "[STUDENT_LIST] GET_STUDENT_LIST";
export const GET_STUDENT_LIST_2 = "[STUDENT_LIST] GET_STUDENT_LIST_2";
export const GET_STUDENT_LIST_SUCCESS = "[STUDENT_LIST] GET_STUDENT_LIST_SUCCESS";
export const GET_STUDENT_LIST_FAILED = "[STUDENT_LIST] GET_STUDENT_LIST_FAILED";
export const GET_DELETED_STUDENT_LIST = "[STUDENT_LIST] GET_DELETED_STUDENT_LIST";
export const GET_DELETED_STUDENT_LIST_SUCCESS = "[STUDENT_LIST] GET_DELETED_STUDENT_LIST_SUCCESS";
export const GET_DELETED_STUDENT_LIST_FAILED = "[STUDENT_LIST] GET_DELETED_STUDENT_LIST_FAILED";

export const getStudentList = params => {
  return {
    type: GET_STUDENT_LIST,
    payload: {
      params
    }
  };
};

export const getStudentList2 = params => {
  return {
    type: GET_STUDENT_LIST_2,
    payload: {
      params
    }
  };
};

export const getStudentListSuccess = params => {
  return {
    type: GET_STUDENT_LIST_SUCCESS,
    payload: params
  };
};

export const getStudentListFailed = () => {
  return {
    type: GET_STUDENT_LIST_FAILED
  };
};

export const getDeletedStudentList = params => {
  return {
    type: GET_DELETED_STUDENT_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedStudentListSuccess = params => {
  return {
    type: GET_DELETED_STUDENT_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedStudentListFailed = () => {
  return {
    type: GET_DELETED_STUDENT_LIST_FAILED
  };
};
