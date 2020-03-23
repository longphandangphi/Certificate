import { combineReducers } from "redux";
import { promotionListReducer } from "./promotion.list.reducer";
import { menuListReducer } from "./menu.list.reducer";
import { facultyListReducer } from "./faculty.list.reducer";
import { itemListReducer } from "./item.list.reducer";
import { orderListReducer } from "./order.list.reducer";
import { tableListReducer } from "./table.list.reducer";
import { customerListReducer } from "./customer.list.reducer";
import { userListReducer } from "./user.list.reducer";
import { profileReducer } from "./profile.reducer";
import { roleListReducer } from "./role.list.reducer";
import { reviewListReducer } from "./review.list.reducer";
import { bookingListReducer } from "./booking.list.reducer";
import { classListReducer } from "./class.list.reducer";
import { articleListReducer } from "./article.list.reducer";
import { reportListReducer } from "./report.list.reducer";
import { extracurricularActivityListReducer } from "./extracurricularActivity.list.reducer";
import { majorListReducer } from "./major.list.reducer";
import { articleCategoryListReducer } from "./articleCategory.list.reducer";

export default combineReducers({
  userPagedListReducer: userListReducer,
  promotionPagedListReducer: promotionListReducer,
  menuPagedListReducer: menuListReducer,
  facultyPagedListReducer: facultyListReducer,
  itemPagedListReducer: itemListReducer,
  orderPagedListReducer: orderListReducer,
  tablePagedListReducer: tableListReducer,
  rolePagedListReducer: roleListReducer,
  reviewPagedListReducer: reviewListReducer,
  bookingPagedListReducer: bookingListReducer,
  customerPagedListReducer: customerListReducer,
  classPagedListReducer: classListReducer,
  articlePagedListReducer: articleListReducer,
  reportPagedListReducer: reportListReducer,
  extracurricularActivityPagedListReducer: extracurricularActivityListReducer,
  majorPagedListReducer: majorListReducer,
  articleCategoryPagedListReducer: articleCategoryListReducer,
  profileReducer: profileReducer
});
