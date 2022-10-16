namespace AnimalRescue.Contracts.Options;

public class EmailOptions
{
    public string Mail { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Host { get; set; } = string.Empty;

    public int Port { get; set; }
}