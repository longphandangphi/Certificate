export const GET_CUSTOMER_LIST = "[CUSTOMER_LIST] GET_CUSTOMER_LIST";
export const GET_CUSTOMER_LIST_SUCCESS = "[CUSTOMER_LIST] GET_CUSTOMER_LIST_SUCCESS";
export const GET_CUSTOMER_LIST_FAILED = "[CUSTOMER_LIST] GET_CUSTOMER_LIST_FAILED";

export const getCustomerList = params => {
  return {
    type: GET_CUSTOMER_LIST,
    payload: {
      params
    }
  };
};

export const getCustomerListSuccess = params => {
  return {
    type: GET_CUSTOMER_LIST_SUCCESS,
    payload: params
  };
};

export const getCustomerListFailed = () => {
  return {
    type: GET_CUSTOMER_LIST_FAILED
  };
};
