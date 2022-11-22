﻿using AutoMapper;
using Quartz.BusinessLogic.Interface.ILookUpItemsService;
using Quartz.Common.ViewModels.LookUpItems.LookUpItemsSpecificationViewModels;
using Quartz.DataAccess.UnitOfWorks.Interface;
using Quartz.Entities.Concrete.LookUpItems;
using System.Collections.Generic;

namespace Quartz.BusinessLogic.Concrete.LookUpItemsManager
{
    public class LookUpItemsSpecificationManager : GenericManager<LookUpItemsSpecification>, ILookUpItemsSpecificationService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public LookUpItemsSpecificationManager(IUnitOfWork uow, IMapper mapper) : base(uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public void AddSpecification(LookUpItemsSpecificationAddViewModel model)
        {
            Add(_mapper.Map<LookUpItemsSpecification>(model));
            _uow.SaveChange();
        }

        public void DeleteSpecification(LookUpItemsSpecificationDeleteViewModel model)
        {
            Delete(_mapper.Map<LookUpItemsSpecification>(model));
            _uow.SaveChange();
        }

        public List<LookUpItemsSpecificationListViewModel> GetAllSpecifications()
        {
            return _mapper.Map<List<LookUpItemsSpecificationListViewModel>>(GetAll());
        }

        public LookUpItemsSpecificationListViewModel GetSpecificationDetail(int specificationId)
        {
            return _mapper.Map<LookUpItemsSpecificationListViewModel>(GetById(specificationId));
        }

        public void UpdateSpecification(LookUpItemsSpecificationUpdateViewModel model)
        {
            Update(_mapper.Map<LookUpItemsSpecification>(model));
            _uow.SaveChange();
        }
    }
}
