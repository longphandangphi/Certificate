export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      name: "Article Manager",
      icon: "fa fa-newspaper-o",
      children: [
        {
          name: "Article",
          url: "/articles",
          icon: "fa fa-angle-right"
        },
        {
          name: "Article Category",
          url: "/articleCategories",
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
      url: "/faculties",
      icon: "fa fa-asterisk"
    },
    {
      name: "Class",
      url: "/classes",
      icon: "fa fa-braille"
    },
    {
      name: "Major",
      url: "/majors",
      icon: "fa fa-graduation-cap"
    },
    {
      name: "User Manager",
      icon: "fa fa-address-book",
      children: [
        {
          name: "User",
          url: "/users",
          icon: "fa fa-angle-right"
        },
        {
          name: "Role",
          url: "/roles",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Extracurricular",
      icon: "fa fa-star",
      children: [
        {
          name: "Extracurricular Activity",
          url: "/extracurricularActivities",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Student Manager",
      icon: "fa fa-graduation-cap",
      children: [
        {
          name: "Extracurricular",
          url: "/extracurriculars",
          icon: "fa fa-angle-right"
        },
        {
          name: "Report",
          url: "/reports",
          icon: "fa fa-angle-right"
        },
        {
          name: "Certificate Status",
          url: "/extracurriculars",
          icon: "fa fa-angle-right"
        }
      ]
    }
  ]
};
