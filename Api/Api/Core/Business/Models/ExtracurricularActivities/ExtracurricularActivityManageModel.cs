using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.ExtracurricularActivities
{
    public class ExtracurricularActivityManageModel 
    {
        public string Name { get; set; }

        public string Semester { get; set; }

        public string OrganizedTime { get; set; }

        public string ExpectedLocation { get; set; }

        public string OrganizedUnit { get; set; }

        public int Point { get; set; }

        public void GetExtracurricularActivityFromModel(ExtracurricularActivity extracurricularActivity)
        {
            extracurricularActivity.Name = Name;
            extracurricularActivity.Semester = Semester;
            extracurricularActivity.OrganizedTime = OrganizedTime;
            extracurricularActivity.ExpectedLocation = ExpectedLocation;
            extracurricularActivity.OrganizedUnit = OrganizedUnit;
            extracurricularActivity.Point = Point;
        }
        //validate
    }
}
