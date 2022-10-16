using System.Text.Json;
using System.Text.Json.Serialization;

namespace AnimalRescue.Application.Helpers;

public class JsonHelper
{
    public static T Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new JsonStringEnumConverter(),
            },
        });
    }

    public static string Serialize<T>(T @value)
    {
        return JsonSerializer.Serialize(@value, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters =
            {
                new JsonStringEnumConverter(),
            },
        });
    }
}