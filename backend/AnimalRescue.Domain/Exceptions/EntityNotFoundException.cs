using System.Runtime.Serialization;

namespace AnimalRescue.Domain.Exceptions;

/// <summary>
/// Class used for not found exceptions.
/// </summary>
[Serializable]
public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(string message, Exception innerException)
        : base(message, innerException)
    {
    }

    public EntityNotFoundException(string message)
        : base(message)
    {
    }

    protected EntityNotFoundException(SerializationInfo serializationInfo, StreamingContext streamingContext)
        : base(serializationInfo, streamingContext)
    {
    }
}