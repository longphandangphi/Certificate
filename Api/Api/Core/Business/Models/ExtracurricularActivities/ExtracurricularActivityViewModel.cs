using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.ExtracurricularActivities
{
    public class ExtracurricularActivityViewModel
    {
        public ExtracurricularActivityViewModel()
        {

        }

        public ExtracurricularActivityViewModel(ExtracurricularActivity extracurricularActivity) : this()
        {
            if (extracurricularActivity != null)
            {
                Id = extracurricularActivity.Id;
                Name = extracurricularActivity.Name;
                Semester = extracurricularActivity.Semester;
                OrgnizedTime = extracurricularActivity.OrgnizedTime;
                ExpectedLocation = extracurricularActivity.ExpectedLocation;
                OrgnizedUnit = extracurricularActivity.OrgnizedUnit;
                Point = extracurricularActivity.Point;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Semester { get; set; }

        public string OrgnizedTime { get; set; }

        public string ExpectedLocation { get; set; }

        public string OrgnizedUnit { get; set; }

        public int Point { get; set; }
    }
}
