import React from "react";
import DefaultLayout from "./pages/admin/Admin";

const Dashboard = React.lazy(() => import("./pages/admin/Dashboard/Dashboard"));

const PromotionListPage = React.lazy(() => import("./pages/admin/promotion/promotion.list.page"));

const MenuListPage = React.lazy(() => import("./pages/admin/menu/menu.list.page"));

const ItemListPage = React.lazy(() => import("./pages/admin/item/item.list.page"));

const TableListPage = React.lazy(() => import("./pages/admin/table/table.list.page"));

const CustomerListPage = React.lazy(() => import("./pages/admin/customer/customer.list.page"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Admin",
    component: DefaultLayout
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/promotions", name: "Promotion", component: PromotionListPage },
  { path: "/menus", name: "Menu", component: MenuListPage },
  { path: "/items", name: "Item", component: ItemListPage },
  { path: "/tables", name: "Table", component: TableListPage },
  { path: "/customers", name: "Customer", component: CustomerListPage }
];

export default routes;
