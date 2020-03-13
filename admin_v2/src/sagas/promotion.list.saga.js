import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PROMOTION_LIST,
  getPromotionListSuccess,
  getPromotionListFailed
} from "../actions/promotion.list.action";
import ApiPromotion from "../api/api.promotion";

function* getPromotionList(action) {
  try {
    const payload = yield call(
      ApiPromotion.getPromotionList,
      action.payload.params
    );
    yield put(getPromotionListSuccess(payload));
  } catch (error) {
    yield put(getPromotionListFailed());
  }
}

export function* watchPromotionListSagasAsync() {
  yield takeLatest(GET_PROMOTION_LIST, getPromotionList);
}
