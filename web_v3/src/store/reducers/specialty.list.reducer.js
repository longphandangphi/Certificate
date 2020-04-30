import {
  GET_SPECIALTY_LIST,
  GET_SPECIALTY_LIST_SUCCESS,
  GET_SPECIALTY_LIST_FAILED,
  GET_DELETED_SPECIALTY_LIST,
  GET_DELETED_SPECIALTY_LIST_SUCCESS,
  GET_DELETED_SPECIALTY_LIST_FAILED
} from "../actions/specialty.list.action";

const initialState = {
  specialtyPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function specialtyListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPECIALTY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_SPECIALTY_LIST_SUCCESS:
      return Object.assign({}, state, {
        specialtyPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_SPECIALTY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_SPECIALTY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_SPECIALTY_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_SPECIALTY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
