import {
    GET_ROLE_LIST,
    GET_ROLE_LIST_SUCCESS,
    GET_ROLE_LIST_FAILED
} from "../actions/role.list.action";

const initialState = {
    rolePagedList: {},
    loading: false,
    failed: false
};

export function roleListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLE_LIST:
            return Object.assign({}, state, {
                loading: true,
                failed: false
            });
        case GET_ROLE_LIST_SUCCESS:
            return Object.assign({}, state, {
                rolePagedList: action.payload,
                loading: false,
                failed: false
            });
        case GET_ROLE_LIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                failed: true
            });
        default:
            return state;
    }
}
