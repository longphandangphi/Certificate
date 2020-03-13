import {
  GET_ITEM_LIST,
  GET_ITEM_LIST_SUCCESS,
  GET_ITEM_LIST_FAILED
} from "../actions/item.list.action";

const initialState = {
  itemPagedList: {},
  loading: false,
  failed: false
};

export function itemListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_ITEM_LIST_SUCCESS:
      return Object.assign({}, state, {
        itemPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_ITEM_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
