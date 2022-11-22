﻿using Quartz.Entities.Concrete.Project.Item;
using Quartz.Entities.Interface;

namespace Quartz.Entities.Concrete.Projects.Item
{
    public class QuartzItemsInformation : ITable
    {
        public int Id { get; set; }
        public string TagNo { get; set; }
        public string SerialNo { get; set; }
        public string ComponentType { get; set; }
        public string Comments { get; set; }
        public string Specification { get; set; }
        public string FittingType { get; set; }
        public string WeldType { get; set; }
        public bool ShowLabel { get; set; }
        public float PipeOdIn { get; set; }
        public float PipeThicknessMm { get; set; }
        public float OperatingTempC { get; set; }
        public float OperatingPressureBar { get; set; }
        public int QuartzItemId { get; set; } // Information'ın ait olduğu Item'ın Id'si (Foreign Key)
        public QuartzItem QuartzItem { get; set; } // Information'ın ait olduğu Item (One-to-Many Relationship)
    }
}