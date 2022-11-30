using System;

namespace Quartz.Common.ViewModels.Project.Link.QuartzLinkViewModels
{
    public class QuartzLinkAddViewModel
    {
        public string TagNo { get; set; }
        public bool ShowLabel { get; set; } = true;
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int MainDrawingSettingsId { get; set; } // Linkin ait olduğu Drawing Settings'in Id'si
        public int DrawingSettingsId { get; set; } // Foreign Key
    }
}
