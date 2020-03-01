﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Exceptions
{
    public class BusinessRuleException : Exception
    {
        public BusinessRuleException(string message = "") : base(message)
        {
        }
    }
}
