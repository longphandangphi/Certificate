import {
  GET_MAJOR_LIST,
  GET_MAJOR_LIST_SUCCESS,
  GET_MAJOR_LIST_FAILED,
  GET_DELETED_MAJOR_LIST,
  GET_DELETED_MAJOR_LIST_SUCCESS,
  GET_DELETED_MAJOR_LIST_FAILED
} from "../actions/major.list.action";

const initialState = {
  majorPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function majorListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MAJOR_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_MAJOR_LIST_SUCCESS:
      return Object.assign({}, state, {
        majorPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_MAJOR_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_MAJOR_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_MAJOR_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_MAJOR_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
