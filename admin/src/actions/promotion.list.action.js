export const GET_PROMOTION_LIST = "[PROMOTION_LIST] GET_PROMOTION_LIST";
export const GET_PROMOTION_LIST_SUCCESS =
  "[PROMOTION_LIST] GET_PROMOTION_LIST_SUCCESS";
export const GET_PROMOTION_LIST_FAILED =
  "[PROMOTION_LIST] GET_PROMOTION_LIST_FAILED";

export const getPromotionList = (params) =>{
    return {
        type : GET_PROMOTION_LIST,
        payload : {
            params
        }
    }
}

export const getPromotionListSuccess = params =>{
    return {
        type : GET_PROMOTION_LIST_SUCCESS,
        payload : params
    }
}

export const getPromotionListFailed = () =>{
    return {
        type : GET_PROMOTION_LIST_FAILED
    }
}
