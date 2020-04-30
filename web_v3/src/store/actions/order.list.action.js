export const GET_ORDER_LIST = "[ORDER_LIST] GET_ORDER_LIST";
export const GET_ORDER_LIST_SUCCESS = "[ORDER_LIST] GET_ORDER_LIST_SUCCESS";
export const GET_ORDER_LIST_FAILED = "[ORDER_LIST] GET_ORDER_LIST_FAILED";
export const GET_DELETED_ORDER_LIST = "[ORDER_LIST] GET_DELETED_ORDER_LIST";
export const GET_DELETED_ORDER_LIST_SUCCESS = "[ORDER_LIST] GET_DELETED_ORDER_LIST_SUCCESS";
export const GET_DELETED_ORDER_LIST_FAILED = "[ORDER_LIST] GET_DELETED_ORDER_LIST_FAILED";

export const getOrderList = params => {
  return {
    type: GET_ORDER_LIST,
    payload: {
      params
    }
  };
};

export const getOrderListSuccess = params => {
  return {
    type: GET_ORDER_LIST_SUCCESS,
    payload: params
  };
};

export const getOrderListFailed = () => {
  return {
    type: GET_ORDER_LIST_FAILED
  };
};

export const getDeletedOrderList = params => {
  return {
    type: GET_DELETED_ORDER_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedOrderListSuccess = params => {
  return {
    type: GET_DELETED_ORDER_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedOrderListFailed = () => {
  return {
    type: GET_DELETED_ORDER_LIST_FAILED
  };
};
