import { GET_TABLE_LIST, GET_TABLE_LIST_SUCCESS, GET_TABLE_LIST_FAILED } from "../actions/table.list.action";

const initialState = {
  tablePagedList: {},
  loading: false,
  failed: false
};

export function tableListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TABLE_LIST:
      return Object.assign({}, state, {
        loading: true,
        failed: false
      });
    case GET_TABLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        tablePagedList: action.payload,
        loading: false,
        failed: false
      });
    case GET_TABLE_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        failed: true
      });
    default:
      return state;
  }
}
