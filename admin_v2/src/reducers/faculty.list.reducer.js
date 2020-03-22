import {
  GET_FACULTY_LIST,
  GET_FACULTY_LIST_SUCCESS,
  GET_FACULTY_LIST_FAILED,
  GET_DELETED_FACULTY_LIST,
  GET_DELETED_FACULTY_LIST_SUCCESS,
  GET_DELETED_FACULTY_LIST_FAILED
} from "../actions/faculty.list.action";

const initialState = {
  facultyPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function facultyListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FACULTY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_FACULTY_LIST_SUCCESS:
      return Object.assign({}, state, {
        facultyPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_FACULTY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_FACULTY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_FACULTY_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_FACULTY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
