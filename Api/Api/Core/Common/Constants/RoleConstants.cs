using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Common.Constants
{
    public static class RoleConstants
    {
        /// <summary>
        /// Super Admin
        /// </summary>
        /// 
        public const string SuperAdmin = "075c1072-92a2-4f99-ac11-bf985b23da6e";

        public const string ArticleManager = "0E3F8FDA-F42A-414A-943A-3E21C02031B2";

        public const string ExtracurricularManager = "57960451-18EF-45F2-B9CB-53C800F50818";

        public const string StructureManager = "2BB61E38-CFD3-4A50-AE55-E3F6C9FDA0C7";

        public const string UserManager = "a5067081-d20d-4178-83d8-4aa045e91372";

        public const string StudentManager = "d6f8610c-7437-4021-92eb-d1bd5b03cb1f";


        public static Guid SuperAdminId = new Guid(SuperAdmin);

        public static Guid ArticleManagerId = new Guid(ArticleManager);

        public static Guid ExtracurricularManagerId = new Guid(ExtracurricularManager);

        public static Guid StructureManagerId = new Guid(StructureManager);

        public static Guid UserManagerId = new Guid(UserManager);

        public static Guid StudentManagerId = new Guid(StudentManager);


        public const string AllRole = SuperAdmin;
    }
}
