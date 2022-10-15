namespace AnimalRescue.Application.Constants;

public class AppSettingKeys
{
    public const string CorsOrigins = "Cors:Origins";

    public const string ConnectionString = "AnimalRescueDbContext";

    public const string JwtAuthenticationKey = "JwtAuthentication:Key";

    public const string JwtAuthenticationSalt = "JwtAuthentication:Salt";

    public const string MediaRoothPath = "FilePath:MediaRootFilePath";

    public const string EmailOptions = "EmailNotifications:EmailOptions";

    public const string ViolationSubmittedNotificationOptions = "EmailNotifications:ViolationSubmittedNotificationOptions";
}