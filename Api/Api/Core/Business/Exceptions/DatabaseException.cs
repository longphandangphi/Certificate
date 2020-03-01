using Api.Core.Common.Enums;
using System;

namespace Api.Core.Business.Exceptions
{
    public class DatabaseException : Exception
    {
        public DatabaseExceptionType ExceptionType { private set; get; }

        public DatabaseException(DatabaseExceptionType exceptionType, string message = "") : base(message)
        {
            ExceptionType = exceptionType;
        }
    }
}
