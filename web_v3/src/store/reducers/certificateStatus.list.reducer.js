import {
  GET_CERTIFICATE_STATUS_LIST,
  GET_CERTIFICATE_STATUS_LIST_SUCCESS,
  GET_CERTIFICATE_STATUS_LIST_FAILED,
  GET_DELETED_CERTIFICATE_STATUS_LIST,
  GET_DELETED_CERTIFICATE_STATUS_LIST_SUCCESS,
  GET_DELETED_CERTIFICATE_STATUS_LIST_FAILED
} from "../actions/certificateStatus.list.action";

const initialState = {
  certificateStatusPagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function certificateStatusListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CERTIFICATE_STATUS_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_CERTIFICATE_STATUS_LIST_SUCCESS:
      return Object.assign({}, state, {
        certificateStatusPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_CERTIFICATE_STATUS_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_CERTIFICATE_STATUS_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_CERTIFICATE_STATUS_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_CERTIFICATE_STATUS_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
