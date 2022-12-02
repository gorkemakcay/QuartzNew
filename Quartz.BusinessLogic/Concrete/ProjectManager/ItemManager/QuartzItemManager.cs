using AutoMapper;
using Quartz.BusinessLogic.Interface.IProjectService.IItemService;
using Quartz.Common.ViewModels.Project.Item.QuartzItemViewModels;
using Quartz.DataAccess.Concrete.EntityFramworkCore.Context;
using Quartz.DataAccess.UnitOfWorks.Interface;
using Quartz.Entities.Concrete.Project.Item;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Quartz.BusinessLogic.Concrete.ProjectManager.ItemManager
{
    public class QuartzItemManager : GenericManager<QuartzItem>, IQuartzItemService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public QuartzItemManager(IUnitOfWork uow, IMapper mapper) : base(uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public int AddItem(QuartzItemAddViewModel model)
        {
            using var context = new QuartzContext();

            var item = new QuartzItem()
            {
                TagNo = model.TagNo,
                CreatedDate = model.CreatedDate,
                CreatedBy = model.CreatedBy,
                DrawingSettingsId = model.DrawingSettingsId,
                IsInspected = 0,
                ShowLabel = false
            };

            context.QuartzItems.Add(item);
            context.SaveChanges();

            return item.Id;
        }

        public void DeleteItem(QuartzItemDeleteViewModel model)
        {
            Delete(_mapper.Map<QuartzItem>(model));
            _uow.SaveChange();
        }

        public List<QuartzItemFilter> FilterItems(QuartzItemFilter model)
        {
            //var items = _mapper.Map<List<QuartzItemFilterViewModel>>(GetAll());

            using var ctx = new QuartzContext();
            {
                var items = ctx.vw_SearchItem.FromSqlRaw("SELECT * FROM vw_SearchItem").ToList();

                if (model.TagNo != null)
                    items = items.Where(I => I.TagNo != null && I.TagNo.ToLower().Contains(model.TagNo.ToLower())).ToList();

                if (model.FittingType != "value")
                    items = items.Where(I => I.FittingType != "value" && I.FittingType == model.FittingType).ToList();

                if (model.WeldType != "value")
                    items = items.Where(I => I.WeldType != "value" && I.WeldType == model.WeldType).ToList();

                if (model.PlantArea != "value")
                    items = items.Where(I => I.PlantArea != "value" && I.PlantArea == model.PlantArea).ToList();

                if (model.PlantSystem != "value")
                    items = items.Where(I => I.PlantSystem != "value" && I.PlantSystem == model.PlantSystem).ToList();

                if (model.IsInspected != 2)
                {
                    if (model.IsInspected == 0)
                        items = items.Where(I => I.IsInspected == 0).ToList();
                    if (model.IsInspected == 1)
                        items = items.Where(I => I.IsInspected == 1).ToList();
                }

                return items;
            }
        }

        public List<QuartzItemListViewModel> GetAllItems(int drawingSettingsId)
        {
            return _mapper.Map<List<QuartzItemListViewModel>>(GetAll(I => I.DrawingSettingsId == drawingSettingsId));
        }

        public QuartzItemUpdateViewModel GetItemDetail(int itemId)
        {
            return _mapper.Map<QuartzItemUpdateViewModel>(GetFirstOrDefult(I => I.Id == itemId));
        }

        public void UpdateItem(QuartzItemUpdateViewModel model)
        {
            Update(_mapper.Map<QuartzItem>(model));
            _uow.SaveChange();
        }
    }
}
