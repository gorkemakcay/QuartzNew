using AutoMapper;
using Quartz.BusinessLogic.Interface.IProjectService.ILinkService;
using Quartz.Common.ViewModels.Project.Link.QuartzLinksDrawingSettingsViewModels;
using Quartz.DataAccess.Concrete.EntityFramworkCore.Context;
using Quartz.DataAccess.UnitOfWorks.Interface;
using Quartz.Entities.Concrete.Project.Link;
using System.Collections.Generic;
using System.Linq;

namespace Quartz.BusinessLogic.Concrete.ProjectManager.LinkManager
{
    public class QuartzLinksDrawingSettingsManager : GenericManager<QuartzLinksDrawingSettings>, IQuartzLinksDrawingSettingsService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public QuartzLinksDrawingSettingsManager(IUnitOfWork uow, IMapper mapper) : base(uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public int AddDrawingSettings(QuartzLinksDrawingSettingsAddViewModel model)
        {
            using var context = new QuartzContext();

            var drawingSettings = new QuartzLinksDrawingSettings()
            {
                DrawingNo = model.DrawingNo,
                CurrentDrawingId = model.CurrentDrawingId
            };

            context.QuartzLinksDrawingSettings.Add(drawingSettings);
            context.SaveChanges();

            return drawingSettings.Id;
        }

        public List<QuartzLinksDrawingSettingsListViewModel> FilterDrawings(QuartzLinksDrawingSettingsListViewModel model)
        {
            var drawings = _mapper.Map<List<QuartzLinksDrawingSettingsListViewModel>>(GetAll());

            if (model.DrawingNo != null)
                drawings = drawings.Where(I => I.DrawingNo != null && I.DrawingNo.ToLower().Contains(model.DrawingNo.ToLower())).ToList();

            if (model.Description != null)
                drawings = drawings.Where(I => I.Description != null && I.Description.ToLower().Contains(model.Description.ToLower())).ToList();

            if (model.PlantArea != "value")
                drawings = drawings.Where(I => I.PlantArea != null && I.PlantArea == model.PlantArea).ToList();

            if (model.PlantSystem != "value")
                drawings = drawings.Where(I => I.PlantSystem != null && I.PlantSystem == model.PlantSystem).ToList();

            drawings = drawings.Where(I => I.Id != 1).ToList();

            return drawings;
        }

        public List<QuartzLinksDrawingSettingsListViewModel> GetAllDrawingSettings()
        {
            return _mapper.Map<List<QuartzLinksDrawingSettingsListViewModel>>(GetAll());
        }

        public QuartzLinksDrawingSettingsUpdateViewModel GetDrawingSettingsDetail(int drawingSettingsId)
        {
            return _mapper.Map<QuartzLinksDrawingSettingsUpdateViewModel>(GetFirstOrDefult(I => I.Id == drawingSettingsId));
        }

        public void UpdateDrawingSettings(QuartzLinksDrawingSettingsUpdateViewModel model)
        {
            Update(_mapper.Map<QuartzLinksDrawingSettings>(model));
            _uow.SaveChange();
        }
    }
}
