export const GET_SPECIALTY_LIST = "[SPECIALTY_LIST] GET_SPECIALTY_LIST";
export const GET_SPECIALTY_LIST_SUCCESS = "[SPECIALTY_LIST] GET_SPECIALTY_LIST_SUCCESS";
export const GET_SPECIALTY_LIST_FAILED = "[SPECIALTY_LIST] GET_SPECIALTY_LIST_FAILED";
export const GET_DELETED_SPECIALTY_LIST = "[SPECIALTY_LIST] GET_DELETED_SPECIALTY_LIST";
export const GET_DELETED_SPECIALTY_LIST_SUCCESS = "[SPECIALTY_LIST] GET_DELETED_SPECIALTY_LIST_SUCCESS";
export const GET_DELETED_SPECIALTY_LIST_FAILED = "[SPECIALTY_LIST] GET_DELETED_SPECIALTY_LIST_FAILED";

export const getSpecialtyList = params => {
  return {
    type: GET_SPECIALTY_LIST,
    payload: {
      params
    }
  };
};

export const getSpecialtyListSuccess = params => {
  return {
    type: GET_SPECIALTY_LIST_SUCCESS,
    payload: params
  };
};

export const getSpecialtyListFailed = () => {
  return {
    type: GET_SPECIALTY_LIST_FAILED
  };
};

export const getDeletedSpecialtyList = params => {
  return {
    type: GET_DELETED_SPECIALTY_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedSpecialtyListSuccess = params => {
  return {
    type: GET_DELETED_SPECIALTY_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedSpecialtyListFailed = () => {
  return {
    type: GET_DELETED_SPECIALTY_LIST_FAILED
  };
};
