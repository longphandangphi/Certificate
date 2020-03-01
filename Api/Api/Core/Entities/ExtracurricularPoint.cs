using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("ExtracurricularPoint")]
    public class ExtracurricularPoint : BaseEntity
    {
        public ExtracurricularPoint() : base()
        {

        }

        public int MyProperty { get; set; }
    }
}
