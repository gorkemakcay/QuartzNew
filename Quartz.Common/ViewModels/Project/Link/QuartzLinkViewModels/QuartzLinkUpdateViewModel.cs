﻿using System;

namespace Quartz.Common.ViewModels.Project.Link.QuartzLinkViewModels
{
    public class QuartzLinkUpdateViewModel
    {
        public int Id { get; set; }
        public string TagNo { get; set; }
        public bool ShowLabel { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int MainQuartzLinkId { get; set; } // Linkin ait olduğu üst linkin Id'si
        public int CurrentDrawingId { get; set; } // Linkin mevcut çiziminin Id'si
        public string Hierarchy { get; set; }
    }
}
