import {
  GET_REPORT_LIST,
  GET_REPORT_LIST_SUCCESS,
  GET_REPORT_LIST_FAILED,
  GET_DELETED_REPORT_LIST,
  GET_DELETED_REPORT_LIST_SUCCESS,
  GET_DELETED_REPORT_LIST_FAILED
} from "../actions/report.list.action";

const initialState = {
  reportPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function reportListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_REPORT_LIST_SUCCESS:
      return Object.assign({}, state, {
        reportPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_REPORT_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_REPORT_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_REPORT_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_REPORT_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
