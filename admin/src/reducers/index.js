import { combineReducers } from "redux";
import { promotionListReducer } from "./promotion.list.reducer";
import { menuListReducer } from "./menu.list.reducer";
import { itemListReducer } from "./item.list.reducer";
import { tableListReducer } from "./table.list.reducer";
import { customerListReducer } from "./customer.list.reducer";
import { userListReducer } from "./user.list.reducer";
import { profileReducer } from "./profile.reducer";

export default combineReducers({
  userList: userListReducer,
  promotionPagedListReducer: promotionListReducer,
  menuPagedListReducer: menuListReducer,
  itemPagedListReducer: itemListReducer,
  tablePagedListReducer: tableListReducer,
  customerPagedListReducer: customerListReducer,
  profileReducer: profileReducer
});
