export const GET_MENU_LIST = "[MENU_LIST] GET_MENU_LIST";
export const GET_MENU_LIST_SUCCESS = "[MENU_LIST] GET_MENU_LIST_SUCCESS";
export const GET_MENU_LIST_FAILED = "[MENU_LIST] GET_MENU_LIST_FAILED";
export const GET_DELETED_MENU_LIST = "[MENU_LIST] GET_DELETED_MENU_LIST";
export const GET_DELETED_MENU_LIST_SUCCESS = "[MENU_LIST] GET_DELETED_MENU_LIST_SUCCESS";
export const GET_DELETED_MENU_LIST_FAILED = "[MENU_LIST] GET_DELETED_MENU_LIST_FAILED";

export const getMenuList = params => {
  return {
    type: GET_MENU_LIST,
    payload: {
      params
    }
  };
};

export const getMenuListSuccess = params => {
  return {
    type: GET_MENU_LIST_SUCCESS,
    payload: params
  };
};

export const getMenuListFailed = () => {
  return {
    type: GET_MENU_LIST_FAILED
  };
};

export const getDeletedMenuList = params => {
  return {
    type: GET_DELETED_MENU_LIST,
    payload: {
      params
    }
  };
};

export const getDeletedMenuListSuccess = params => {
  return {
    type: GET_DELETED_MENU_LIST_SUCCESS,
    payload: params
  };
};

export const getDeletedMenuListFailed = () => {
  return {
    type: GET_DELETED_MENU_LIST_FAILED
  };
};
