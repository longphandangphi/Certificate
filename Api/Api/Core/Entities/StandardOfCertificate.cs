using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("StandardOfCertificate")]
    public class StandardOfCertificate : BaseEntity
    {
        public StandardOfCertificate() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsRequirePhysicalEducation { get; set; }


        [Required]
        public string PhysicalEducationReference{ get; set; }

        [Required]
        public bool IsRequireNationalDefenseAndSecurity { get; set; }


        [Required]
        public string NationalDefenseAndSecurityReference { get; set; }

        [Required]
        public bool IsRequireInformatics { get; set; }

        [Required]
        public string InformaticsReference { get; set; }

        [Required]
        public bool IsRequireLanguage { get; set; }

        [Required]
        public string LanguageReference { get; set; }

        [Required]
        public bool IsRequireExtracurricularPoint { get; set; }

        [Required]
        public string ExtracurricularPointReference { get; set; }
    }
}
