import {
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAILED,
  GET_DELETED_CLASS_LIST,
  GET_DELETED_CLASS_LIST_SUCCESS,
  GET_DELETED_CLASS_LIST_FAILED
} from "../actions/class.list.action";

const initialState = {
  classPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function classListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLASS_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_CLASS_LIST_SUCCESS:
      return Object.assign({}, state, {
        classPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_CLASS_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_CLASS_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_CLASS_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_CLASS_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
