import {
  GET_ORDER_LIST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILED,
  GET_DELETED_ORDER_LIST,
  GET_DELETED_ORDER_LIST_SUCCESS,
  GET_DELETED_ORDER_LIST_FAILED
} from "../actions/order.list.action";

const initialState = {
  orderPagedList: {},
  deletedOrderPagedList: {},
  loading: false,
  failed: false
};

export function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_ORDER_LIST_SUCCESS:
      return Object.assign({}, state, {
        orderPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_ORDER_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    case GET_DELETED_ORDER_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_DELETED_ORDER_LIST_SUCCESS:
      return Object.assign({}, state, {
        deletedOrderPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_DELETED_ORDER_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
