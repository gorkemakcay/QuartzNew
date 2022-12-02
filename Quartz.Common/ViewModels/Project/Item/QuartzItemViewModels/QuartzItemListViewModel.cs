namespace Quartz.Common.ViewModels.Project.Item.QuartzItemViewModels
{
    public class QuartzItemListViewModel
    {
        public int Id { get; set; }
        public string TagNo { get; set; }
        public bool ShowLabel { get; set; }
        public int IsInspected { get; set; }
        public int DrawingSettingsId { get; set; } // Item'ın ait olduğu Drawing Settings'in Id'si (Foreign Key)
    }
}
