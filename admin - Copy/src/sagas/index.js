import { all, fork } from "redux-saga/effects";

import { watchUserListSagaAsync } from "./user.list.saga";
import { watchPromotionListSagasAsync } from "./promotion.list.saga";
import { watchMenuListSagasAsync } from "./menu.list.saga";
import { watchItemListSagasAsync } from "./item.list.saga";
import { watchTableListSagasAsync } from "./table.list.saga";
import { watchCustomerListSagasAsync } from "./customer.list.saga";
import { watchProfileSagasAsync } from "./profile.saga";

export default function* sagas() {
  yield all([
    fork(watchUserListSagaAsync),
    fork(watchPromotionListSagasAsync),
    fork(watchMenuListSagasAsync),
    fork(watchItemListSagasAsync),
    fork(watchTableListSagasAsync),
    fork(watchCustomerListSagasAsync),
    fork(watchProfileSagasAsync)
  ]);
}
