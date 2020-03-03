using Api.Core.Entities;
using System;

namespace Api.Core.Business.Models.Extracurriculars
{
    public class ExtracurricularManageModel
    {
        public Guid ExtracurricularPointId { get; set; }

        public Guid ExtracurricularActivityId { get; set; }

        public void GetExtracurricularFromModel(Extracurricular extracurricular)
        {
            extracurricular.ExtracurricularPointId = ExtracurricularPointId;
            extracurricular.ExtracurricularActivityId = ExtracurricularActivityId;
        }

        //validate trung ten ?

    }
}
