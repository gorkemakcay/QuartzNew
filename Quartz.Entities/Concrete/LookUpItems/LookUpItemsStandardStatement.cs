﻿using Quartz.Entities.Interface;

namespace Quartz.Entities.Concrete.LookUpItems
{
    public class LookUpItemsStandardStatement : ITable
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
