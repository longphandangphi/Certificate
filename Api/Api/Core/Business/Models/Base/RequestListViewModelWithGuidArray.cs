using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Base
{
    public class RequestListViewModelWithGuidArray : RequestListViewModel
    {
        public RequestListViewModelWithGuidArray()
        {
        }

        public Guid[] Ids { get; set; }

    }
}
