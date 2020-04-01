// import cookie from "react-cookies";

//console.log(cookie.load("userLogin"));
// const userLogin = cookie.load("userLogin");

export default {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      permissions: [],
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      name: "Article Manager",
      icon: "fa fa-newspaper-o",
      permissions: [],
      attributes: {
        replace: true,
        activeStyle: { textTransform: "uppercase" }
      },
      children: [
        {
          name: "Article",
          url: "/admin/articles",
          icon: "fa fa-angle-right"
        },
        {
          name: "Article Category",
          url: "/admin/articleCategories",
          icon: "fa fa-angle-right"
        }
      ]
    },

    // {
    //   name: "Promotion",
    //   url: "/promotions",
    //   // permissions: ["categories"],
    //   icon: "fa fa-list"
    // },
    // {
    //   name: "Menu",
    //   url: "/menus",
    //   // permissions: ["categories"],
    //   icon: "fa fa-list"
    // },
    // {
    //   name: "Role",
    //   url: "/roles",
    //   icon: "fa fa-superpowers"
    // },
    // {
    //   name: "Order",
    //   url: "/orders",
    //   // permissions: ["categories"],
    //   icon: "fa fa-list"
    // },
    // {
    //   // name: "Table",
    //   // url: "/tables",
    //   // permissions: ["categories"],
    //   name: "User",
    //   url: "/users",
    //   icon: "fa fa-address-book"
    // },
    // {
    //   name: "Customer",
    //   url: "/customers",
    //   // permissions: ["categories"],
    //   icon: "fa fa-list"
    // },
    // {
    //   name: "Review",
    //   url: "/reviews",
    //   icon: "fa fa-list"
    // },
    // {
    //   name: "Booking",
    //   url: "/bookings",
    //   icon: "fa fa-list"
    // },
    {
      name: "Faculty",
      url: "/admin/faculties",
      permissions: [],
      icon: "fa fa-asterisk"
    },
    {
      name: "Specialty",
      url: "/admin/specialties",
      permissions: [],
      icon: "fa fa-graduation-cap"
    },
    {
      name: "Class",
      url: "/admin/classes",
      permissions: [],
      icon: "fa fa-braille"
    },
    {
      name: "Major",
      url: "/admin/majors",
      permissions: [],
      icon: "fa fa-graduation-cap"
    },
    {
      name: "User Manager",
      icon: "fa fa-address-book",
      permissions: [],
      children: [
        {
          name: "User",
          url: "/admin/users",
          icon: "fa fa-angle-right"
        },
        {
          name: "Role",
          url: "/admin/roles",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Extracurricular",
      icon: "fa fa-star",
      permissions: [],
      children: [
        {
          name: "Extracurricular Activity",
          url: "/admin/extracurricularActivities",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Student Manager",
      icon: "fa fa-graduation-cap",
      permissions: ["Cashier"],
      children: [
        {
          name: "Extracurricular",
          url: "/admin/extracurriculars",
          icon: "fa fa-angle-right"
        },
        {
          name: "Report",
          url: "/admin/reports",
          icon: "fa fa-angle-right"
        },
        {
          name: "Standard Certificate",
          url: "/admin/standardOfCertificates",
          icon: "fa fa-angle-right"
        },
        {
          name: "Certificate Status",
          url: "/admin/certificateStatuses",
          icon: "fa fa-angle-right"
        }
      ]
    }
  ]
};
