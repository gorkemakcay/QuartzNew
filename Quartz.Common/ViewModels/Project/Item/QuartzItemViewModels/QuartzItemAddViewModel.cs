﻿using System;

namespace Quartz.Common.ViewModels.Project.Item.QuartzItemViewModels
{
    public class QuartzItemAddViewModel
    {
        public string TagNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public bool ShowLabel { get; set; }
        public bool IsInspected { get; set; }
        public int QuartzLinkId { get; set; } // Item'ın ait olduğu Link'in Id'si (Foreign Key)
    }
}
