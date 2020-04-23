export default {
  items: [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      permissions: [],
      icon: "icon-speedometer",
      // badge: {
      //   variant: "info",
      //   text: "NEW"
      // }
    },
    {
      name: "Structure Manager",
      icon: "fa fa-home",
      permissions: ["Structure Manager"],
      children: [
        {
          name: "Faculty",
          url: "/admin/faculties",
          icon: "fa fa-angle-right"
        },
        {
          name: "Class",
          url: "/admin/classes",
          icon: "fa fa-angle-right"
        },
        {
          name: "Major",
          url: "/admin/majors",
          icon: "fa fa-angle-right"
        },
        {
          name: "Specialty",
          url: "/admin/specialties",
          icon: "fa fa-angle-right"
        },
        {
          name: "Standard Certificate",
          url: "/admin/standardOfCertificates",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
      name: "Article Manager",
      icon: "fa fa-newspaper-o",
      permissions: ["Article Manager"],
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
    {
      name: "User Manager",
      icon: "fa fa-address-book",
      permissions: ["User Manager"],
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
      permissions: ["Extracurricular Manager"],
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
      permissions: ["Student Manager"],
      children: [
        {
          name: "Extracurricular Assign",
          url: "/admin/extracurriculars",
          icon: "fa fa-angle-right"
        },
        
        {
          name: "Certificate Status",
          url: "/admin/certificateStatuses",
          icon: "fa fa-angle-right"
        },
        {
          name: "Student",
          url: "/admin/students",
          icon: "fa fa-angle-right"
        }
      ]
    },
    {
        name: "Report",
        url: "/admin/reports",
        permissions: ["Student Manager", "Structure Manager", "Extracurricular Manager", "Article Manager"],
        icon: "fa fa-flag"
      }
  ]
};
