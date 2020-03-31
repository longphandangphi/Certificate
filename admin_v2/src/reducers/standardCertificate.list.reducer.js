import {
  GET_STANDARD_CERTIFICATE_LIST,
  GET_STANDARD_CERTIFICATE_LIST_SUCCESS,
  GET_STANDARD_CERTIFICATE_LIST_FAILED,
  GET_DELETED_STANDARD_CERTIFICATE_LIST,
  GET_DELETED_STANDARD_CERTIFICATE_LIST_SUCCESS,
  GET_DELETED_STANDARD_CERTIFICATE_LIST_FAILED
} from "../actions/standardCertificate.list.action";

const initialState = {
  standardCertificatePagedList: {},
  deletedMenuPagedList: {},
  loading: false,
  failed: false
};

export function standardCertificateListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STANDARD_CERTIFICATE_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_STANDARD_CERTIFICATE_LIST_SUCCESS:
      return Object.assign({}, state, {
        standardCertificatePagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_STANDARD_CERTIFICATE_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_STANDARD_CERTIFICATE_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_STANDARD_CERTIFICATE_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedMenuPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_STANDARD_CERTIFICATE_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
