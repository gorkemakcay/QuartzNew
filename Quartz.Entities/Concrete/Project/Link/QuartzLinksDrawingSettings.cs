using Quartz.Entities.Concrete.Project.Item;
using Quartz.Entities.Interface;
using System.Collections.Generic;

namespace Quartz.Entities.Concrete.Project.Link
{
    public class QuartzLinksDrawingSettings : ITable
    {
        public int Id { get; set; }
        public string DrawingNo { get; set; }
        public string Description { get; set; }
        public int CurrentDrawingId { get; set; }
        public string PlantArea { get; set; }
        public string PlantSystem { get; set; }
        public string AttachmentIds { get; set; }
        public List<QuartzLink> QuartzLinks { get; set; }
        public List<QuartzItem> QuartItems { get; set; }
        public QuartzLinksDrawingFeatures DrawingFeatures { get; set; }
    }
}
