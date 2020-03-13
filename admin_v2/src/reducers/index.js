import { combineReducers } from "redux";
import { promotionListReducer } from "./promotion.list.reducer";
import { menuListReducer } from "./menu.list.reducer";
import { itemListReducer } from "./item.list.reducer";
import { orderListReducer } from "./order.list.reducer";
import { tableListReducer } from "./table.list.reducer";
import { customerListReducer } from "./customer.list.reducer";
import { userListReducer } from "./user.list.reducer";
import { profileReducer } from "./profile.reducer";
import { roleListReducer } from "./role.list.reducer";
import { reviewListReducer } from "./review.list.reducer";
import { bookingListReducer } from "./booking.list.reducer";

export default combineReducers({
  userPagedListReducer: userListReducer,
  promotionPagedListReducer: promotionListReducer,
  menuPagedListReducer: menuListReducer,
  itemPagedListReducer: itemListReducer,
  orderPagedListReducer: orderListReducer,
  tablePagedListReducer: tableListReducer,
  rolePagedListReducer: roleListReducer,
  reviewPagedListReducer: reviewListReducer,
  bookingPagedListReducer: bookingListReducer,
  customerPagedListReducer: customerListReducer,
  profileReducer: profileReducer
});
