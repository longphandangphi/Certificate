export const GET_FACULTY_LIST = "[FACULTY_LIST] GET_FACULTY_LIST";
export const GET_FACULTY_LIST_SUCCESS = "[FACULTY_LIST] GET_FACULTY_LIST_SUCCESS";
export const GET_FACULTY_LIST_FAILED = "[FACULTY_LIST] GET_FACULTY_LIST_FAILED";
export const GET_DELETED_FACULTY_LIST = "[FACULTY_LIST] GET_DELETED_FACULTY_LIST";
export const GET_DELETED_FACULTY_LIST_SUCCESS = "[FACULTY_LIST] GET_DELETED_FACULTY_LIST_SUCCESS";
export const GET_DELETED_FACULTY_LIST_FAILED = "[FACULTY_LIST] GET_DELETED_FACULTY_LIST_FAILED";

export const getFacultyList = params => {
  return {
    type: GET_FACULTY_LIST,
    payload: {
      params
    }
  };
};

export const getFacultyListSuccess = params => {
  return {
    type: GET_FACULTY_LIST_SUCCESS,
    payload: params
  };
};

export const getFacultyListFailed = () => {
  return {
    type: GET_FACULTY_LIST_FAILED
  };
};

export const getDeletedFacultyList = params => {
  return {
    type: GET_DELETED_FACULTY_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedFacultyListSuccess = params => {
  return {
    type: GET_DELETED_FACULTY_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedFacultyListFailed = () => {
  return {
    type: GET_DELETED_FACULTY_LIST_FAILED
  };
};
