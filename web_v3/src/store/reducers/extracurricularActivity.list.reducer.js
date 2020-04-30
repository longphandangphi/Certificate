import {
  GET_EXTRACURRICULAR_ACTIVITY_LIST,
  GET_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS,
  GET_EXTRACURRICULAR_ACTIVITY_LIST_FAILED,
  GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST,
  GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS,
  GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_FAILED
} from "../actions/extracurricularActivity.list.action";

const initialState = {
  extracurricularActivityPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function extracurricularActivityListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXTRACURRICULAR_ACTIVITY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS:
      return Object.assign({}, state, {
        extracurricularActivityPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_EXTRACURRICULAR_ACTIVITY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_EXTRACURRICULAR_ACTIVITY_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
