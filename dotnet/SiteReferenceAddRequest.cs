using Sabio.Models.Domain.SiteReferences;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SiteReferences
{
    public class SiteReferenceAddRequest
    {
        [Required]
        public int ReferenceTypeId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
