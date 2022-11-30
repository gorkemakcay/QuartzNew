using Quartz.Common.ViewModels.Project.Link.QuartzLinksDrawingSettingsViewModels;
using Quartz.Entities.Concrete.Project.Link;
using System.Collections.Generic;

namespace Quartz.BusinessLogic.Interface.IProjectService.ILinkService
{
    public interface IQuartzLinksDrawingSettingsService : IGenericService<QuartzLinksDrawingSettings>
    {
        int AddDrawingSettings(QuartzLinksDrawingSettingsAddViewModel model);
        void UpdateDrawingSettings(QuartzLinksDrawingSettingsUpdateViewModel model);
        QuartzLinksDrawingSettingsUpdateViewModel GetDrawingSettingsDetail(int drawingSettingsId);
        List<QuartzLinksDrawingSettingsListViewModel> GetAllDrawingSettings();
        List<QuartzLinksDrawingSettingsListViewModel> FilterDrawings(QuartzLinksDrawingSettingsListViewModel model);
    }
}
