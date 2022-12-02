using Quartz.Entities.Interface;

namespace Quartz.Entities.Concrete.Project.Item
{
    public class QuartzItemFilter : ITable
    {
        public int Id { get; set; }
        public string TagNo { get; set; }
        public string SerialNo { get; set; }
        public string Specification { get; set; }
        public string FittingType { get; set; }
        public string WeldType { get; set; }
        public int IsInspected { get; set; }
        public string DrawingNo { get; set; }
        public string PlantArea { get; set; }
        public string PlantSystem { get; set; }
        public string Description { get; set; }
    }
}
