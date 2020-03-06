﻿using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Extracurriculars
{
    public class ExtracurricularViewModel
    {
        public ExtracurricularViewModel()
        {

        }

        public ExtracurricularViewModel(Extracurricular extracurricular) : this()
        {
            if (extracurricular != null)
            {
                Id = extracurricular.Id;
                StudentId = extracurricular.StudentId;
                ExtracurricularActivityId = extracurricular.ExtracurricularActivityId;
            }
        }

        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public Guid ExtracurricularActivityId { get; set; }
    }
}
