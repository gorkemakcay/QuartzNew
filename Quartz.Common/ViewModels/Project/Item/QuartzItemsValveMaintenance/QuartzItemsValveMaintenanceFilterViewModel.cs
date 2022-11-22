﻿using System;

namespace Quartz.Common.ViewModels.Project.Item.QuartzItemsValveMaintenance
{
    public class QuartzItemsValveMaintenanceFilterViewModel
    {
        public string PlantArea { get; set; }
        public string KKSNo { get; set; }
        public string SerialNo { get; set; }
        public string SupplierManufacturare { get; set; }
        public string Designation { get; set; }
        public string Remarks { get; set; }
        public DateTime TestDate { get; set; }
        public float IdealBarg { get; set; }
        public float OpeningPressureBarg { get; set; }
        public int QuartzItemId { get; set; }
    }
}
