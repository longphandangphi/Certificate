export const GET_TABLE_LIST = "[TABLE_LIST] GET_TABLE_LIST";
export const GET_TABLE_LIST_SUCCESS = "[TABLE_LIST] GET_TABLE_LIST_SUCCESS";
export const GET_TABLE_LIST_FAILED = "[TABLE_LIST] GET_TABLE_LIST_FAILED";

export const getTableList = params => {
  return {
    type: GET_TABLE_LIST,
    payload: {
      params
    }
  };
};

export const getTableListSuccess = params => {
  return {
    type: GET_TABLE_LIST_SUCCESS,
    payload: params
  };
};

export const getTableListFailed = () => {
  return {
    type: GET_TABLE_LIST_FAILED
  };
};
