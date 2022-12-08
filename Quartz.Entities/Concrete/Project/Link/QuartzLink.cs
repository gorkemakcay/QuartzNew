using Quartz.Entities.Interface;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quartz.Entities.Concrete.Project.Link
{
    public class QuartzLink : ITable
    {
        public int Id { get; set; }
        public string TagNo { get; set; }
        public bool ShowLabel { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int DrawingSettingsId { get; set; }
        [ForeignKey("DrawingSettings")]
        public int MainDrawingSettingsId { get; set; } // Linkin ait olduğu Drawing Settings'in Id'si - Foreign Key
        public QuartzLinksDrawingSettings DrawingSettings { get; set; } // Linke ait DrawingSettings (One-to-Many Relationship)
    }
}