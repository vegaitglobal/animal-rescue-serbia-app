﻿namespace AnimalRescue.Domain.Models
{
    public class MediaContent
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public string ContentType { get; set; }

        public string FilePath { get; set; }

        public string RelativePath { get; set; }
    }
}
