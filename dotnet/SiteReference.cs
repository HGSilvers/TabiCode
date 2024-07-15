﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.SiteReferences
{
    public class SiteReference
    {
        public int Id { get; set; }
        public LookUp ReferenceType { get; set; }  
        public BaseUser User { get; set; }
    }
}
