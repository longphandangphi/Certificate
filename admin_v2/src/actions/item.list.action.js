export const GET_ITEM_LIST = "[ITEM_LIST] GET_ITEM_LIST";
export const GET_ITEM_LIST_SUCCESS = "[ITEM_LIST] GET_ITEM_LIST_SUCCESS";
export const GET_ITEM_LIST_FAILED = "[ITEM_LIST] GET_ITEM_LIST_FAILED";

export const getItemList = params => {
  return {
    type: GET_ITEM_LIST,
    payload: {
      params
    }
  };
};

export const getItemListSuccess = params => {
  return {
    type: GET_ITEM_LIST_SUCCESS,
    payload: params
  };
};

export const getItemListFailed = () => {
  return {
    type: GET_ITEM_LIST_FAILED
  };
};
