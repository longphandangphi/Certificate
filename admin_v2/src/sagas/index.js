import { all, fork } from "redux-saga/effects";

import { watchUserListSagasAsync } from "./user.list.saga";
import { watchItemListSagasAsync } from "./item.list.saga";
import { watchTableListSagasAsync } from "./table.list.saga";
import { watchPromotionListSagasAsync } from "./promotion.list.saga";
import { watchMenuListSagasAsync, watchDeletedMenuListSagasAsync } from "./menu.list.saga";
import { watchFacultyListSagasAsync, watchDeletedFacultyListSagasAsync } from "./faculty.list.saga";
import { watchOrderListSagasAsync, watchDeletedOrderListSagasAsync } from "./order.list.saga";
import { watchCustomerListSagasAsync } from "./customer.list.saga";
import { watchProfileSagasAsync } from "./profile.saga";
import { watchRoleListSagasAsync } from "./role.list.saga";
import { watchClassListSagasAsync } from "./class.list.saga";
import { watchMajorListSagasAsync } from "./major.list.saga";
import { watchReviewListSagasAsync } from "./review.list.saga";
import { watchBookingListSagasAsync } from "./booking.list.saga";

export default function* sagas() {
  yield all([
    fork(watchUserListSagasAsync),
    fork(watchPromotionListSagasAsync),
    fork(watchMenuListSagasAsync),
    fork(watchDeletedMenuListSagasAsync),
    fork(watchFacultyListSagasAsync),
    fork(watchDeletedFacultyListSagasAsync),
    fork(watchItemListSagasAsync),
    fork(watchOrderListSagasAsync),
    fork(watchDeletedOrderListSagasAsync),
    fork(watchTableListSagasAsync),
    fork(watchRoleListSagasAsync),
    fork(watchClassListSagasAsync),
    fork(watchMajorListSagasAsync),
    fork(watchReviewListSagasAsync),
    fork(watchBookingListSagasAsync),
    fork(watchCustomerListSagasAsync),
    fork(watchProfileSagasAsync)
  ]);
}
