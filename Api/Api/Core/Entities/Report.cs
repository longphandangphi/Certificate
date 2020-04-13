using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("Report")]
    public class Report : BaseEntity
    {
        public Report() : base()
        {
        }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public Guid StudentId { get; set; }

        [Required]
        public string Response { get; set; }


        public Student Student { get; set; }
    }
}
