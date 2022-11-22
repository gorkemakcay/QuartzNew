﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quartz.BusinessLogic.Interface.IFileUploadService;
using Quartz.Common.ViewModels.FileUpload.FileUploadViewModels;
using Quartz.DataAccess.UnitOfWorks.Interface;
using Quartz.Entities.Concrete.FileUploads;
using Quartz.Entities.Concrete.Users;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace Quartz.BusinessLogic.Concrete.FileUploadManager
{
    public class FileUploadManager : GenericManager<FileUpload>, IFileUploadService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public FileUploadManager(IUnitOfWork uow, IMapper mapper) : base(uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public List<FileUploadListViewModel> GetAllFiles()
        {
            return _mapper.Map<List<FileUploadListViewModel>>(GetAll());
        }

        public void UpdateFile(FileUploadUpdateViewModel model)
        {
            Update(_mapper.Map<FileUpload>(model));
            _uow.SaveChange();
        }

        public async Task<FileUpload> UploadFile(IFormFileCollection files, string user)
        {
            var date = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();
            foreach (IFormFile file in files)
            {
                file.FileName.Replace(" ", "_");
                // eski hali: var basePath = $"wwwroot/Files";
                var basePath = @"wwwroot\\Files\\";
                bool basePathIsExists = Directory.Exists(basePath);
                if (!basePathIsExists)
                    Directory.CreateDirectory(basePath);
                var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                var filePath = Path.Combine(basePath, date + "_" + file.FileName);
                var extension = Path.GetExtension(file.FileName);
                if (!File.Exists(filePath))
                {
                    using var stream = new FileStream(filePath, FileMode.Create);

                    await file.CopyToAsync(stream);

                    var fileModel = new FileUpload
                    {
                        CreatedDate = DateTime.Now,
                        Extension = extension,
                        Path = filePath,
                        Type = file.ContentType,
                        Name = fileName,
                        UploadedBy = user
                    };

                    Add(_mapper.Map<FileUpload>(fileModel));
                    _uow.SaveChange();

                    return fileModel;
                }
            }
            return null;
        }

        public FileUploadUpdateViewModel GetFileDetail(int fileId)
        {
            return _mapper.Map<FileUploadUpdateViewModel>(GetById(fileId));
        }

        public List<FileUploadListViewModel> GetAllDrawings()
        {
            return _mapper.Map<List<FileUploadListViewModel>>(GetAll(I => I.Type == "image/jpeg" || I.Type == "image/png"));
        }

        public void DeleteFile(int fileId)
        {
            var file = GetFileDetail(fileId);
            if (System.IO.File.Exists(file.Path))
            {
                System.IO.File.Delete(file.Path);
            }
            Delete(_mapper.Map<FileUpload>(file));
            _uow.SaveChange();
        }
    }
}