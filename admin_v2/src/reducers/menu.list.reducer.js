import {
  GET_MENU_LIST,
  GET_MENU_LIST_SUCCESS,
  GET_MENU_LIST_FAILED,
  GET_DELETED_MENU_LIST,
  GET_DELETED_MENU_LIST_SUCCESS,
  GET_DELETED_MENU_LIST_FAILED
} from "../actions/menu.list.action";

const initialState = {
  menuPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function menuListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_MENU_LIST_SUCCESS:
      return Object.assign({}, state, {
        menuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_MENU_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_MENU_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_MENU_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_MENU_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
