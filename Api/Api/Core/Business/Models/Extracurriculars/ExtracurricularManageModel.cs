using Api.Core.Entities;
using System;

namespace Api.Core.Business.Models.Extracurriculars
{
    public class ExtracurricularManageModel
    {
        public Guid StudentId { get; set; }

        public Guid ExtracurricularActivityId { get; set; }

        public void GetExtracurricularFromModel(Extracurricular extracurricular)
        {
            extracurricular.StudentId = StudentId;
            extracurricular.ExtracurricularActivityId = ExtracurricularActivityId;
        }

        //validate trung ten ?
    }
}
