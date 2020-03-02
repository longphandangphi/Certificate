using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    public class ExtracurricularActivity : BaseEntity
    {
        public ExtracurricularActivity() : base()
        {

        }

        public string Name { get; set; }

        public string Semester { get; set; }

        public string OrgnizedTime { get; set; }

        public string ExpectedLocation { get; set; }

        public string OrgnizedUnit { get; set; }

        public int Point { get; set; }



        public virtual IList<Extracurricular> Extracurriculars { get; set; }
    }
}
