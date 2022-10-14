using System.Runtime.Serialization;

namespace AnimalRescue.Domain.Exceptions;

[Serializable]
public class ValidationException : Exception
{
    public ValidationException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    public ValidationException(string message)
        : base(message)
    {
    }

    protected ValidationException(SerializationInfo serializationInfo, StreamingContext streamingContext)
        : base(serializationInfo, streamingContext)
    {
    }
}