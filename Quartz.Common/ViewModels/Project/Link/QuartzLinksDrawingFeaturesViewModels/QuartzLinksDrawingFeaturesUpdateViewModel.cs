namespace Quartz.Common.ViewModels.Project.Link.QuartzLinksDrawingFeaturesViewModels
{
    public class QuartzLinksDrawingFeaturesUpdateViewModel
    {
        public int Id { get; set; }
        public string Features { get; set; }
        public int DrawingSettingsId { get; set; } // DrawFeature'ın ait olduğu DrawingSettings'in Id'si
    }
}
