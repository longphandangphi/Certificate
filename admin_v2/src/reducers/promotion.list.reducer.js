import {
  GET_PROMOTION_LIST,
  GET_PROMOTION_LIST_SUCCESS,
  GET_PROMOTION_LIST_FAILED
} from "../actions/promotion.list.action";

const initialState = {
  promotionPagedList: {},
  loading: false,
  failed: false
};

export function promotionListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROMOTION_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_PROMOTION_LIST_SUCCESS:
      return Object.assign({}, state, {
        promotionPagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_PROMOTION_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
