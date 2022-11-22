using Quartz.Entities.Interface;

namespace Quartz.Entities.Concrete.Project.Link
{
    public class QuartzLinksDrawingFeatures : ITable
    {
        public int Id { get; set; }
        public string Features { get; set; }
        public int DrawingSettingsId { get; set; }
        public QuartzLinksDrawingSettings DrawingSettings { get; set; }
    }
}
