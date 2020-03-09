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
        public const string SA = "075c1072-92a2-4f99-ac11-bf985b23da6e";

        public const string CA = "0E3F8FDA-F42A-414A-943A-3E21C02031B2";

        public const string WT = "57960451-18EF-45F2-B9CB-53C800F50818";

        public const string CF = "2BB61E38-CFD3-4A50-AE55-E3F6C9FDA0C7";

        public const string ST = "d6f8610c-7437-4021-92eb-d1bd5b03cb1f";

        public static Guid SuperAdminId = new Guid(SA);

        public static Guid CashierId = new Guid(CA);

        public static Guid WaiterId = new Guid(WT);

        public static Guid ChefId = new Guid(CF);

        public static Guid Student = new Guid(ST);

        public const string AllRole = SA;
    }
}
