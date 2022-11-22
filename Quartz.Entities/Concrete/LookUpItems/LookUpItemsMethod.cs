﻿using Quartz.Entities.Interface;

namespace Quartz.Entities.Concrete.LookUpItems
{
    public class LookUpItemsMethod : ITable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}