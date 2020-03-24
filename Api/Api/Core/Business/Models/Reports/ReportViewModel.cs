﻿using Api.Core.Business.Models.Students;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Reports
{
    public class ReportViewModel
    {
        public ReportViewModel()
        {

        }

        public ReportViewModel(Report report) : this()
        {
            Id = report.Id;
            Subject = report.Subject;
            Content = report.Content;
            IsSolved = report.IsSolved;
            IsSeen = report.IsSeen;
            StudentViewModel = new StudentViewModel(report.Student);
            CreateOn = report.CreatedOn.ToString("dd/MM/yyyy hh:mm tt");
        }

        public Guid Id { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public bool IsSolved { get; set; }

        public bool IsSeen { get; set; }

        public string CreateOn { get; set; }

        public StudentViewModel StudentViewModel { get; set; }
    }
}
