import React from "react";
import DefaultLayout from "./pages/admin/Admin";

const Dashboard = React.lazy(() => import("./pages/admin/Dashboard/Dashboard"));

const PromotionListPage = React.lazy(() => import("./pages/admin/promotion/promotion.list.page"));

const UserListPage = React.lazy(() => import("./pages/admin/user/user.list.page"));

const MenuListPage = React.lazy(() => import("./pages/admin/menu/menu.list.page"));

const OrderListPage = React.lazy(() => import("./pages/admin/order/order.list.page"));

const TableListPage = React.lazy(() => import("./pages/admin/table/table.list.page"));

const CustomerListPage = React.lazy(() => import("./pages/admin/customer/customer.list.page"));

const ReviewListPage = React.lazy(() => import("./pages/admin/review/review.list.page"));

const RoleListPage = React.lazy(() => import("./pages/admin/role/role.list.page"));

const ItemListPage = React.lazy(() => import("./pages/admin/item/item.list.page"));

const FacultyListPage = React.lazy(() => import("./pages/admin/faculty/faculty.list.page"));

const ClassListPage = React.lazy(() => import("./pages/admin/class/class.list.page"));

const MajorListPage = React.lazy(() => import("./pages/admin/major/major.list.page"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Admin",
    component: DefaultLayout
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  // { path: "/promotions", name: "Promotion", component: PromotionListPage },
  // { path: "/menus", name: "Menu", component: MenuListPage },
  // { path: "/items", name: "Item", component: ItemListPage },
  // { path: "/orders", name: "Order", component: OrderListPage },
  // { path: "/tables", name: "Table", component: TableListPage },
  // { path: "/customers", name: "Customer", component: CustomerListPage },
  { path: "/roles", name: "Role", component: RoleListPage },
  { path: "/classes", name: "Class", component: ClassListPage },
  { path: "/majors", name: "Major", component: MajorListPage },
  { path: "/users", name: "User", component: UserListPage },
  // { path: "/reviews", name: "Review", component: ReviewListPage },
  { path: "/faculties", name: "Faculty", component: FacultyListPage }
];

export default routes;