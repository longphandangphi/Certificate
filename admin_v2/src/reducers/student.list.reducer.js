import {
  GET_STUDENT_LIST,
  GET_STUDENT_LIST_2,
  GET_STUDENT_LIST_SUCCESS,
  GET_STUDENT_LIST_FAILED,
  GET_DELETED_STUDENT_LIST,
  GET_DELETED_STUDENT_LIST_SUCCESS,
  GET_DELETED_STUDENT_LIST_FAILED
} from "../actions/student.list.action";

const initialState = {
  studentPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function studentListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_STUDENT_LIST_2:
    return Object.assign({}, state, {
      loading: true,
      failed: false
    });
    case GET_STUDENT_LIST_SUCCESS:
      return Object.assign({}, state, {
        studentPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_STUDENT_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_STUDENT_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_STUDENT_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_STUDENT_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
