import React from "react";
//import DefaultLayout from "./pages/admin/Admin";

const Dashboard = React.lazy(() => import("./pages/admin/Dashboard/Dashboard"));

//const PromotionListPage = React.lazy(() => import("./pages/admin/promotion/promotion.list.page"));

const UserListPage = React.lazy(() => import("./pages/admin/user/user.list.page"));

//const MenuListPage = React.lazy(() => import("./pages/admin/menu/menu.list.page"));

//const OrderListPage = React.lazy(() => import("./pages/admin/order/order.list.page"));

//const TableListPage = React.lazy(() => import("./pages/admin/table/table.list.page"));

//const CustomerListPage = React.lazy(() => import("./pages/admin/customer/customer.list.page"));

//const ReviewListPage = React.lazy(() => import("./pages/admin/review/review.list.page"));

const RoleListPage = React.lazy(() => import("./pages/admin/role/role.list.page"));

//const ItemListPage = React.lazy(() => import("./pages/admin/item/item.list.page"));

const FacultyListPage = React.lazy(() => import("./pages/admin/faculty/faculty.list.page"));

const ClassListPage = React.lazy(() => import("./pages/admin/class/class.list.page"));

const SpecialtyListPage = React.lazy(() => import("./pages/admin/specialty/specialty.list.page"));

const ArticleListPage = React.lazy(() => import("./pages/admin/article/article.list.page"));

const ExtracurricularListPage = React.lazy(() => import("./pages/admin/extracurricular/extracurricularActivity.list.page"));

const ReportListPage = React.lazy(() => import("./pages/admin/report/report.list.page"));

const ExtracurricularActivityListPage = React.lazy(() =>
  import("./pages/admin/extracurricularActivity/extracurricularActivity.list.page")
);

const MajorListPage = React.lazy(() => import("./pages/admin/major/major.list.page"));

const StandardCertificateListPage = React.lazy(() =>
  import("./pages/admin/standardCertificate/standardCertificate.list.page")
);

const CertificateStatusListPage = React.lazy(() =>
  import("./pages/admin/certificateStatus/certificateStatus.list.page")
);

const ArticleCategoryListPage = React.lazy(() => import("./pages/admin/articleCategory/articleCategory.list.page"));

const StudentListPage = React.lazy(() => import("./pages/admin/student/student.list.page"));

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Admin",
  //   component: DefaultLayout
  // },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard, permissions: [] },
  // { path: "/promotions", name: "Promotion", component: PromotionListPage },
  // { path: "/menus", name: "Menu", component: MenuListPage },
  // { path: "/items", name: "Item", component: ItemListPage },
  // { path: "/orders", name: "Order", component: OrderListPage },
  // { path: "/tables", name: "Table", component: TableListPage },
  // { path: "/customers", name: "Customer", component: CustomerListPage },
  { path: "/admin/roles", name: "Role", component: RoleListPage, permissions: ["User Manager"] },
  { path: "/admin/classes", name: "Class", component: ClassListPage, permissions: ["Structure Manager"] },
  { path: "/admin/articles", name: "Article", component: ArticleListPage, permissions: ["Article Manager"] },
  {
    path: "/admin/extracurriculars",
    name: "Extracurricular",
    component: ExtracurricularListPage,
    permissions: ["Extracurricular Manager"]
  },
  { path: "/admin/reports", name: "Report", component: ReportListPage, permissions: ["Student Manager", "Structure Manager", "Extracurricular Manager", "Article Manager"] },
  {
    path: "/admin/extracurricularActivities",
    name: "Extracurricular Activity",
    component: ExtracurricularActivityListPage,
    permissions: ["Extracurricular Manager"]
  },
  { path: "/admin/majors", name: "Major", component: MajorListPage, permissions: ["Structure Manager"] },
  {
    path: "/admin/articleCategories",
    name: "Article Category",
    component: ArticleCategoryListPage,
    permissions: ["Article Manager"]
  },
  { path: "/admin/users", name: "User", component: UserListPage, permissions: ["User Manager"] },
  { path: "/admin/faculties", name: "Faculty", component: FacultyListPage, permissions: ["Structure Manager"] },
  {
    path: "/admin/standardOfCertificates",
    name: "Standard Certificate",
    component: StandardCertificateListPage,
    permissions: ["Structure Manager"]
  },
  {
    path: "/admin/certificateStatuses",
    name: "Certificate Status",
    component: CertificateStatusListPage,
    permissions: []
  },
  {
    path: "/admin/specialties",
    name: "Specialty",
    component: SpecialtyListPage,
    permissions: ["Structure Manager"]
  },
  {
    path: "/admin/students",
    name: "Student",
    component: StudentListPage,
    permissions: ["User Manager"]
  }
];

export default routes;
