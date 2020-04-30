import {
  GET_CUSTOMER_LIST,
  GET_CUSTOMER_LIST_SUCCESS,
  GET_CUSTOMER_LIST_FAILED
} from "../actions/customer.list.action";

const initialState = {
  customerPagedList: {},
  loading: false,
  failed: false
};

export function customerListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_CUSTOMER_LIST_SUCCESS:
      return Object.assign({}, state, {
        customerPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_CUSTOMER_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
