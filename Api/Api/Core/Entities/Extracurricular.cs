﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("Extracurricular")]
    public class Extracurricular : BaseEntity
    {
        public Extracurricular() : base()
        {

        }

        public Guid ExtracurricularPointId { get; set; }

        public ExtracurricularPoint ExtracurricularPoint { get; set; }

        public Guid ExtracurricularActivityId { get; set; }

        public ExtracurricularActivity ExtracurricularActivity { get; set; }
    }
}
