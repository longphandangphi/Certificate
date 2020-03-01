using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Common.Constants
{
    public class UserConstants
    {
        /// <summary>
        /// Super Admin
        /// </summary>
        public const string SA = "1033D9FB-FAF4-43DB-8D0D-83185400DFE2";
        public static Guid SuperAdminUserId = new Guid(SA);
    }
}
