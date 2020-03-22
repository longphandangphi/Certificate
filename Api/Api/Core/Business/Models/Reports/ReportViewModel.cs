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
            StudentViewModel = new StudentViewModel(report.Student);
        }

        public Guid Id { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public bool IsSolved { get; set; }

        public StudentViewModel StudentViewModel { get; set; }
    }
}