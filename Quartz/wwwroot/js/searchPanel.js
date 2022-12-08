function filterDrawing() {
    activeSearch = "drawing";

    $.ajax({
        type: "GET",
        url: "QuartzLink/GetSearchPanelsDrawingPartialView",
        success: function (html) {
            $("#searchPanelsModalPartialArea").html(html);
            $("#searchPanelsModalTitle").html("Search Drawing");

            var filterDrawingModel = {
                DrawingNo: $("#drawingFilterTagNo").val(),
                PlantArea: $("#drawingFilterPlantArea").val(),
                PlantSystem: $("#drawingFilterPlantSystem").val(),
                Description: $("#drawingFilterDescription").val(),
            };

            $.ajax({
                type: "POST",
                url: "QuartzLink/FilterDrawing", // AJAX URL ROUTER'A EKLE
                data: { model: filterDrawingModel },
                success: function (response) {
                    var filteredDrawings = jQuery.parseJSON(response);
                    printDrawingModelsArray = [];

                    $("#searchPanelDrawingTable").children('tbody').children('tr').remove();

                    if (filteredDrawings != "") {
                        var drawingCount = filteredDrawings.length;
                        $("#totalSearchPanelDrawingCount").html("Filtered Drawing Count: " + drawingCount);

                        filteredDrawings.forEach(function (drawing) {
                            if (drawing.Description == null)
                                drawing.Description = ""

                            if (drawing.PlantArea == null)
                                drawing.PlantArea = ""

                            if (drawing.PlantSystem == null)
                                drawing.PlantSystem = ""

                            var printDrawingModel = {
                                Id: drawing.Id,
                                DrawingNo: drawing.DrawingNo,
                                Description: drawing.Description,
                                PlantArea: drawing.PlantArea,
                                PlantSystem: drawing.PlantSystem
                            }

                            var goDrawing = `<p class='tableColumn' style='color: blue; cursor: pointer;' onclick='goSelectedDrawing(` + drawing.Id + `)' data-bs-dismiss='modal' data-bs-toggle='tooltip' data-bs-placement='right' title='Go link'><i class='fas fa-link'></i></p>`;
                            var drawingNo = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + drawing.DrawingNo + `'>` + drawing.DrawingNo + `</p>`;
                            var plantArea = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + drawing.PlantArea + `'>` + drawing.PlantArea + `</p>`;
                            var plantSystem = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + drawing.PlantSystem + `'>` + drawing.PlantSystem + `</p>`;
                            var description = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + drawing.Description + `'>` + drawing.Description + `</p>`;

                            $("#searchPanelDrawingTable").children('tbody').append(
                                $('<tr>').append(
                                    $('<td>', { align: "center" }).append(goDrawing),
                                    $('<td>', { align: "center" }).append(drawingNo),
                                    $('<td>', { align: "center" }).append(plantArea),
                                    $('<td>', { align: "center" }).append(plantSystem),
                                    $('<td>', { align: "center" }).append(description)
                                )
                            );

                            printDrawingModelsArray.push(printDrawingModel);
                        });
                    }
                    else {
                        $("#searchPanelDrawingTable").children('tbody').append(
                            $('<tr>').append(
                                $('<td>', { colspan: "5", class: "text-center" }).append("No data available to show!")
                            )
                        );
                    }
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

function filterItem() {
    activeSearch = "item";

    $.ajax({
        type: "GET",
        url: "QuartzItem/GetSearchPanelsItemPartialView",
        success: function (html) {
            $("#searchPanelsModalPartialArea").html(html);
            $("#searchPanelsModalTitle").html("Search Item");

            var filterTagModel = {
                TagNo: $("#itemFilterTagNo").val(),
                FittingType: $("#itemFilterFittingType").val(),
                WeldType: $("#itemFilterWeldType").val(),
                PlantArea: $("#itemFilterPlantArea").val(),
                PlantSystem: $("#itemFilterPlantSystem").val(),
                IsInspected: $("#itemFilterIsInspected").val()
            };

            $.ajax({
                type: "POST",
                url: "QuartzItem/FilterItem", // AJAX URL ROUTER'A EKLE
                data: { model: filterTagModel },
                success: function (response) {
                    var filteredItems = jQuery.parseJSON(response);
                    printItemModelsArray = [];
                    $("#searchPanelItemTable").children('tbody').children('tr').remove();
                    var itemCount = filteredItems.length;
                    if (itemCount != 0) {
                        $("#totalSearchPanelItemCount").html("Filtered Item Count: " + itemCount);

                        filteredItems.forEach(function (item) {
                            if (item.FittingType == "select")
                                item.FittingType = "";

                            if (item.Specification == "select")
                                item.Specification = "";

                            if (item.SerialNo == null)
                                item.SerialNo = "";

                            var printItemModel = {
                                DrawingNo: item.DrawingNo,
                                DrawingPlantArea: item.PlantArea,
                                TagNo: item.TagNo,
                                SerialNo: item.SerialNo,
                                Specification: item.Specification,
                                FittingType: item.FittingType,
                                Specification: item.Specification,
                                InspectionHistory: item.InspectionHistory,
                                Description: item.Description
                            }

                            var isInspectedColumn;
                            if (item.IsInspected == 1) {
                                printItemModel.InspectionHistory = "YES";
                                isInspectedColumn = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + printItemModel.InspectionHistory + `'><i class='fa-solid fa-circle-check fa-lg' style='color: green;'></i></p>`;
                            }
                            else {
                                printItemModel.InspectionHistory = "NO";
                                isInspectedColumn = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + printItemModel.InspectionHistory + `'><i class='fa-solid fa-circle-xmark fa-lg' style='color: red;'></i></p>`;
                            }

                            printItemModelsArray.push(printItemModel);

                            var goItem = `<p class='tableColumn' style='color: blue; cursor: pointer;' onclick='goSelectedItem(` + item.Id + `)' data-bs-dismiss='modal' data-bs-toggle='tooltip' data-bs-placement='right' title='Go link'><i class='fas fa-link'></i></p>`;
                            var tagNo = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + item.TagNo + `'>` + item.TagNo + `</p>`;
                            var serialNo = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + item.SerialNo + `'>` + item.SerialNo + `</p>`;
                            var drawingNo = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + item.DrawingNo + `'>` + item.DrawingNo + `</p>`;
                            var fittingType = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + item.FittingType + `'>` + item.FittingType + `</p>`;
                            var specification = `<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='` + item.Specification + `'>` + item.Specification + `</p>`;

                            $("#searchPanelItemTable").children('tbody').append(
                                $('<tr>').append(
                                    $('<td>', { align: "center" }).append(goItem),
                                    $('<td>', { align: "center" }).append(tagNo),
                                    $('<td>', { align: "center" }).append(serialNo),
                                    $('<td>', { align: "center" }).append(drawingNo),
                                    $('<td>', { align: "center" }).append(fittingType),
                                    $('<td>', { align: "center" }).append(specification),
                                    $('<td>', { align: "center" }).append(isInspectedColumn),
                                )
                            );
                        });
                    }
                    else {
                        $("#searchPanelItemTable").children('tbody').append(
                            $('<tr>').append(
                                $('<td>', { colspan: "7", class: "text-center" }).append("No data available to show!")
                            )
                        );
                    }
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

function filterInspection() {
    activeSearch = "inspection";

    $.ajax({
        type: "GET",
        url: "QuartzItem/GetSearchPanelsInspectionPartialView",
        success: function (html) {
            $("#searchPanelsModalPartialArea").html(html);
            $("#searchPanelsModalTitle").html("Search Inspection");

            var date;
            var dueDate;

            if ($("#inspectionFilterDate").val().toString() == "") {
                date = null;
            }
            else date = $("#inspectionFilterDate").val();

            if ($("#inspectionFilterDueDate").val().toString() == "") {
                dueDate = null;
            }
            else dueDate = $("#inspectionFilterDueDate").val();


            var filterInspectionModel = {
                ReportNo: $("#inspectionFilterReportNo").val(),
                Method: $("#inspectionFilterMethod").val(),
                Procedure: $("#inspectionFilterProcedure").val(),
                Technique: $("#inspectionFilterTechnique").val(),
                Status: $("#inspectionFilterStatus").val(),
                Date: date,
                DueDate: dueDate,
                Details: $("#inspectionFilterDetails").val()
            };

            $.ajax({
                type: "Post",
                url: "QuartzItem/FilterInspections", // AJAX URL ROUTER'A EKLE
                data: { model: filterInspectionModel },
                success: function (response) {
                    var filteredInspections = jQuery.parseJSON(response);
                    printInspectionModelsArray = [];
                    $("#searchPanelInspectionTable").children('tbody').children('tr').remove();

                    if (filteredInspections != "") {
                        var inspectionCount = filteredInspections.length;
                        $("#totalSearchPanelInspectionCount").html("Filtered Inspection Count: " + inspectionCount);

                        filteredInspections.forEach(function (inspection) {
                            var date = inspection.Date.split('T')[0];

                            $.ajax({
                                type: "GET",
                                url: "QuartzItem/GetItemDetailJSON",
                                data: { itemId: inspection.QuartzItemId },
                                success: function (response) {
                                    var filteredInspectionsItemDetail = jQuery.parseJSON(response);

                                    $.ajax({
                                        type: "GET",
                                        url: "QuartzLink/GetDrawingSettingsDetailJSON",
                                        data: { drawingSettingsId: filteredInspectionsItemDetail.DrawingSettingsId },
                                        success: function (response) {
                                            var filteredInspectionsDrawingSettingsDetail = jQuery.parseJSON(response);

                                            if (filteredInspectionsDrawingSettingsDetail.PlantArea == "select")
                                                filteredInspectionsDrawingSettingsDetail.PlantArea = "";

                                            if (inspection.ReportNo == null)
                                                inspection.ReportNo = "";

                                            if (inspection.Details == null)
                                                inspection.Details = "";

                                            if (inspection.Status == "select")
                                                inspection.Status = "";

                                            if (inspection.Method == "select")
                                                inspection.Method = "";

                                            if (inspection.Procedure == "select")
                                                inspection.Procedure = "";

                                            var printInspectionModel = {
                                                PlantArea: filteredInspectionsDrawingSettingsDetail.PlantArea,
                                                DrawingRef: filteredInspectionsDrawingSettingsDetail.DrawingNo,
                                                PlantIdent: filteredInspectionsItemDetail.TagNo,
                                                InspDate: date.toString(),
                                                Procedure: inspection.Procedure,
                                                ReportNo: inspection.ReportNo,
                                                Details: inspection.Details,
                                                Status: inspection.Status
                                            }
                                            printInspectionModelsArray.push(printInspectionModel);

                                            $("#searchPanelInspectionTable").children('tbody').append(
                                                $('<tr>').append(
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' style='color: blue; cursor: pointer;' onclick='goSelectedInspection(" + inspection.QuartzItemId + ")' data-bs-dismiss='modal' data-bs-toggle='tooltip' data-bs-placement='right' title='Go link'><i class='fas fa-link'></i></p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + inspection.ReportNo + "'>" + inspection.ReportNo + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + filteredInspectionsDrawingSettingsDetail.DrawingNo + "'>" + filteredInspectionsDrawingSettingsDetail.DrawingNo + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + filteredInspectionsItemDetail.TagNo + "'>" + filteredInspectionsItemDetail.TagNo + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + date + "'>" + date + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + inspection.Method + "'>" + inspection.Method + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + inspection.Status + "'>" + inspection.Status + "</p>"
                                                    ),
                                                    $('<td>', { align: "center" }).append(
                                                        "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + inspection.Details + "'>" + inspection.Details + "</p>"
                                                    ),
                                                )
                                            );
                                        },
                                        error: function (error) {
                                            alert("error!");
                                            console.log(error.responseText);
                                        }
                                    });
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });

                        });


                    }
                    else {
                        $("#searchPanelInspectionTable").children('tbody').append(
                            $('<tr>').append(
                                $('<td>', { colspan: "8", class: "text-center" }).append("No data available to show!")
                            )
                        );
                    }
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

function filterValveMaintenance() {
    activeSearch = "valveMaintenance";

    $.ajax({
        type: "GET",
        url: "QuartzItem/GetSearchPanelsValveMaintenancePartialView",
        success: function (html) {
            $("#searchPanelsModalPartialArea").html(html);
            $("#searchPanelsModalTitle").html("Search Valve Maintenance");

            var testDate;
            if ($("#valveMaintenanceFilterTestDate").val().toString() != "")
                //testDate = "1.01.0001 00:00:00";
                //else testDate = $("#valveMaintenanceFilterTestDate").val();
                testDate = $("#valveMaintenanceFilterTestDate").val();

            var filterValveMaintenanceModel = {
                KKSNo: $("#valveMaintenanceFilterKKSNo").val(),
                SerialNo: $("#valveMaintenanceFilterSerialNo").val(),
                SupplierManufacturare: $("#valveMaintenanceFilterSupplierManufacturare").val(),
                Designation: $("#valveMaintenanceFilterDesignation").val(),
                TestDate: testDate,
                PlantArea: $("#valveMaintenanceFilterPlantArea").val(),
                Status: $("#valveMaintenanceFilterStatus").val()
            };

            $.ajax({
                type: "Post",
                url: "QuartzItem/FilterValveMaintenances", // AJAX URL ROUTER'A EKLE
                data: { model: filterValveMaintenanceModel },
                success: function (response) {
                    var filteredValveMaintenances = jQuery.parseJSON(response);
                    printValveMaintenanceModelsArray = [];
                    $("#searchPanelValveMaintenanceTable").children('tbody').children('tr').remove();

                    var valveMaintenanceCount = filteredValveMaintenances.length;
                    if (valveMaintenanceCount != 0) {
                        $("#totalSearchPanelValveMaintenanceCount").html("Filtered Valve Maintenance Count: " + valveMaintenanceCount);
                        filteredValveMaintenances.forEach(function (valveMaintenance) {
                            $.ajax({
                                type: "GET",
                                url: itemController.Item.Detail,
                                data: { itemId: valveMaintenance.QuartzItemId },
                                success: function (response) {
                                    var itemDetail = jQuery.parseJSON(response);

                                    $.ajax({
                                        type: "GET",
                                        url: linkController.DrawingSettings.Detail,
                                        data: { drawingSettingsId: itemDetail.DrawingSettingsId },
                                        success: function (response) {
                                            var drawingSettingsDetail = jQuery.parseJSON(response);
                                            var date = valveMaintenance.TestDate.split('T')[0];

                                            if (drawingSettingsDetail.PlantArea == "select")
                                                drawingSettingsDetail.PlantArea = "";

                                            if (valveMaintenance.KKSNo == null)
                                                valveMaintenance.KKSNo = "";

                                            if (valveMaintenance.SerialNo == null)
                                                valveMaintenance.SerialNo = "";

                                            if (valveMaintenance.PlantArea == "select")
                                                valveMaintenance.PlantArea = "";

                                            if (valveMaintenance.SupplierManufacturare == null)
                                                valveMaintenance.SupplierManufacturare = "";

                                            if (valveMaintenance.Designation == null)
                                                valveMaintenance.Designation = "";

                                            if (valveMaintenance.Remarks == null)
                                                valveMaintenance.Remarks = "";

                                            var printValveMaintenanceModel = {
                                                PlantIdent: itemDetail.TagNo,
                                                DrawingRef: drawingSettingsDetail.DrawingNo,
                                                DrawingPlantArea: drawingSettingsDetail.PlantArea,
                                                KKSNo: valveMaintenance.KKSNo,
                                                SerialNo: valveMaintenance.SerialNo,
                                                PlantArea: valveMaintenance.PlantArea,
                                                SupplierManufacturare: valveMaintenance.SupplierManufacturare,
                                                Designation: valveMaintenance.Designation,
                                                IdealBarg: valveMaintenance.IdealBarg,
                                                OpeningPressureBarg: valveMaintenance.OpeningPressureBarg,
                                                TestDate: date,
                                                Remarks: valveMaintenance.Remarks
                                            }
                                            printValveMaintenanceModelsArray.push(printValveMaintenanceModel);

                                            var templateStart = `<td align="center"><p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='`;
                                            var templateMiddle = `'>`;
                                            var templateEnd = `</p></td>`;

                                            var goValveMaintenance = `<td align="center"><p class='tableColumn' style='color: blue; cursor: pointer;' onclick='goSelectedValveMaintenance(` + valveMaintenance.QuartzItemId + `)' data-bs-dismiss='modal' data-bs-toggle='tooltip' data-bs-placement='right' title='Go link'><i class='fas fa-link'></i></p></td>`;
                                            var kksNo = templateStart + valveMaintenance.KKSNo + templateMiddle + valveMaintenance.KKSNo + templateEnd;
                                            var serialNo = templateStart + valveMaintenance.SerialNo + templateMiddle + valveMaintenance.SerialNo + templateEnd;
                                            var supplierManufacturare = templateStart + valveMaintenance.SupplierManufacturare + templateMiddle + valveMaintenance.SupplierManufacturare + templateEnd;
                                            var designation = templateStart + valveMaintenance.Designation + templateMiddle + valveMaintenance.Designation + templateEnd;
                                            var remarks = templateStart + valveMaintenance.Remarks + templateMiddle + valveMaintenance.Remarks + templateEnd;
                                            var dateColumn = templateStart + date + templateMiddle + date + templateEnd;
                                            var plantArea = templateStart + valveMaintenance.PlantArea + templateMiddle + valveMaintenance.PlantArea + templateEnd;

                                            $("#searchPanelValveMaintenanceTable").children('tbody').append(
                                                $('<tr>').append(
                                                    goValveMaintenance,
                                                    kksNo,
                                                    serialNo,
                                                    supplierManufacturare,
                                                    designation,
                                                    remarks,
                                                    dateColumn,
                                                    plantArea
                                                )
                                            );
                                        },
                                        error: function (error) {
                                            alert("error!");
                                            console.log(error.responseText);
                                        }
                                    });
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        });
                    }
                    else {
                        $("#searchPanelValveMaintenanceTable").children('tbody').append(
                            $('<tr>').append(
                                $('<td>', { colspan: "8", class: "text-center" }).append("No data available to show!")
                            )
                        );
                    }
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

function filterThicknessMeasurement() {
    activeSearch = "thicknessMeasurement";

    $.ajax({
        type: "GET",
        url: "QuartzItem/GetSearchPanelsThicknessMeasurementPartialView",
        success: function (html) {
            $("#searchPanelsModalPartialArea").html(html);
            $("#searchPanelsModalTitle").html("Search Thickness Measurement");

            var filterThicknessMeasurementModel = {
                NominalThickness: $("#thicknessMeasurementFilterNominalThickness").val(),
                MeasuredThickness: $("#thicknessMeasurementFilterMeasuredThickness").val(),
                Description: $("#thicknessMeasurementFilterDescription").val(),
                Specification: $("#thicknessMeasurementFilterSpecification").val(),
                PlantArea: $("#thicknessMeasurementFilterPlantArea").val(),
                PlantSystem: $("#thicknessMeasurementFilterPlantSystem").val(),
                Status: $("#thicknessMeasurementFilterStatus").val()
            };

            $.ajax({
                type: "POST",
                url: "QuartzItem/FilterThicknessMeasurements", // AJAX URL ROUTER'A EKLE
                data: { model: filterThicknessMeasurementModel },
                success: function (response) {
                    var filteredThicknessMeasurements = jQuery.parseJSON(response);
                    printThicknessMeasurementModelsArray = [];
                    $("#searchPanelThicknessMeasurementTable").children('tbody').children('tr').remove();

                    var thicknessMeasurementCount = filteredThicknessMeasurements.length;
                    if (thicknessMeasurementCount != 0) {
                        $("#totalSearchPanelThicknessMeasurementCount").html("Filtered Thickness Measurement Count: " + thicknessMeasurementCount);
                        filteredThicknessMeasurements.forEach(function (thicknessMeasurement) {
                            $.ajax({
                                type: "GET",
                                url: itemController.Item.Detail,
                                data: { itemId: thicknessMeasurement.QuartzItemId },
                                success: function (response) {
                                    var itemDetail = jQuery.parseJSON(response);

                                    $.ajax({
                                        type: "GET",
                                        url: linkController.DrawingSettings.Detail,
                                        data: { drawingSettingsId: itemDetail.DrawingSettingsId },
                                        success: function (response) {
                                            var drawingSettingsDetail = jQuery.parseJSON(response);

                                            if (thicknessMeasurement.PlantArea == "select")
                                                thicknessMeasurement.PlantArea = "";

                                            if (thicknessMeasurement.Specification == "select")
                                                thicknessMeasurement.Specification = "";

                                            if (thicknessMeasurement.PlantSystem == "select")
                                                thicknessMeasurement.PlantSystem = "";

                                            if (thicknessMeasurement.Description == null)
                                                thicknessMeasurement.Description = "";

                                            if (drawingSettingsDetail.PlantArea == "select")
                                                drawingSettingsDetail.PlantArea = "";

                                            var printThicknessMeasurementModel = {
                                                PlantIdent: itemDetail.TagNo,
                                                DrawingNo: drawingSettingsDetail.DrawingNo,
                                                DrawingPlantArea: drawingSettingsDetail.PlantArea,
                                                PlantArea: thicknessMeasurement.PlantArea,
                                                PlantSystem: thicknessMeasurement.PlantSystem,
                                                Specification: thicknessMeasurement.Specification,
                                                NominalThickness: thicknessMeasurement.NominalThickness,
                                                MeasuredThickness: thicknessMeasurement.MeasuredThickness,
                                                Description: thicknessMeasurement.Description,
                                                CreatedDate: thicknessMeasurement.CreatedDate.split('T')[0]
                                            }

                                            printThicknessMeasurementModelsArray.push(printThicknessMeasurementModel);

                                            var templateStart = `<td align="center"><p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='`;
                                            var templateMiddle = `'>`;
                                            var templateEnd = `</p></td>`;

                                            var goThicknessMeasurement = `<td align="center"><p class='tableColumn' style='color: blue; cursor: pointer;' onclick='goSelectedThicknessMeasurement(` + thicknessMeasurement.QuartzItemId + `)' data-bs-dismiss='modal' data-bs-toggle='tooltip' data-bs-placement='right' title='Go link'><i class='fas fa-link'></i></p></td>`;
                                            var nominalThickness = templateStart + thicknessMeasurement.NominalThickness + templateMiddle + thicknessMeasurement.NominalThickness + templateEnd;
                                            var measuredThickness = templateStart + thicknessMeasurement.MeasuredThickness + templateMiddle + thicknessMeasurement.MeasuredThickness + templateEnd;
                                            var description = templateStart + thicknessMeasurement.Description + templateMiddle + thicknessMeasurement.Description + templateEnd;
                                            var specification = templateStart + thicknessMeasurement.Specification + templateMiddle + thicknessMeasurement.Specification + templateEnd;
                                            var plantArea = templateStart + thicknessMeasurement.PlantArea + templateMiddle + thicknessMeasurement.PlantArea + templateEnd;
                                            var plantSystem = templateStart + thicknessMeasurement.PlantSystem + templateMiddle + thicknessMeasurement.PlantSystem + templateEnd;

                                            $("#searchPanelThicknessMeasurementTable").children('tbody').append(
                                                $('<tr>').append(
                                                    goThicknessMeasurement,
                                                    nominalThickness,
                                                    measuredThickness,
                                                    description,
                                                    specification,
                                                    plantArea,
                                                    plantSystem
                                                )
                                            );
                                        },
                                        error: function (error) {
                                            alert("error!");
                                            console.log(error.responseText);
                                        }
                                    });
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        });
                    }
                    else {
                        $("#searchPanelThicknessMeasurementTable").children('tbody').append(
                            $('<tr>').append(
                                $('<td>', { colspan: "7", class: "text-center" }).append("No data available to show!")
                            )
                        );
                    }
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

$("#clearSearchButton").on('click', function () {
    $(".searchInput").val("");
    loadSearchPanelsSelectOptions();
});

// bu fonksiyonlar tek bir fonksiyonda birleştirilecek

function goSelectedDrawing(drawingId) {
    $.ajax({
        type: "GET",
        url: linkController.Link.Detail,
        data: { linkId: 2 },
        success: function (response) {
            currentQuartzLink = jQuery.parseJSON(response);
            clickedOrCreated = "clicked";
            currentQuartzLink.DrawingSettingsId = drawingId;

            $.ajax({
                type: "POST",
                url: linkController.Link.Update,
                data: { model: currentQuartzLink },
                success: function (response) {
                    lastClickedLink = jQuery.parseJSON(response);
                }
            });

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { drawingSettingsId: currentQuartzLink.DrawingSettingsId },
                success: function (response) {
                    currentDrawingSettings = jQuery.parseJSON(response);
                    breadCrumb();

                    if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
                        crumbCount++;
                        $(".breadCrumb").append(
                            $('<li>', {
                                text: currentDrawingSettings.DrawingNo,
                                value: crumbCount,
                                onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                class: "crumb"
                            })
                        );
                    }

                    $.ajax({
                        type: "GET",
                        url: linkController.DrawingFeatures.GetVectorSource,
                        data: { drawingSettingsId: currentDrawingSettings.Id },
                        success: function (response) {
                            currentDrawingFeatures = jQuery.parseJSON(response);

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.CurrentDrawingId },
                                success: function (response) {
                                    currentDrawing = jQuery.parseJSON(response);
                                    if (currentDrawing != null) {
                                        $.ajax({
                                            type: "GET",
                                            url: linkController.QuartzPartialView,
                                            success: function (html) {
                                                $("#main").children().remove();
                                                $("#main").html(html);

                                                loadQuartz();
                                            },
                                            error: function (error) {
                                                alert("error!");
                                                console.log(error.responseText);
                                            }
                                        });
                                    }
                                    else {
                                        alert("Drawing Is Not Exist!");
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
    });
}

function goSelectedItem(itemId) {
    $.ajax({
        type: "GET",
        url: itemController.Item.Detail,
        data: { itemId: itemId },
        success: function (response) {
            var item = jQuery.parseJSON(response);

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { drawingSettingsId: item.DrawingSettingsId },
                success: function (response) {
                    currentDrawingSettings = jQuery.parseJSON(response);

                    $.ajax({
                        type: "GET",
                        url: linkController.Link.Detail,
                        data: { linkId: 2 },
                        success: function (response) {
                            currentQuartzLink = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";
                            currentQuartzLink.DrawingSettingsId = currentDrawingSettings.Id;
                            breadCrumb();

                            if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
                                crumbCount++;
                                $(".breadCrumb").append(
                                    $('<li>', {
                                        text: currentDrawingSettings.DrawingNo,
                                        value: crumbCount,
                                        onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                        class: "crumb"
                                    })
                                );
                            }

                            $.ajax({
                                type: "POST",
                                url: linkController.Link.Update,
                                data: { model: currentQuartzLink },
                                success: function (response) {
                                    lastClickedLink = jQuery.parseJSON(response);
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: linkController.DrawingFeatures.GetVectorSource,
                        data: { drawingSettingsId: currentDrawingSettings.Id },
                        success: function (response) {
                            currentDrawingFeatures = jQuery.parseJSON(response);

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.CurrentDrawingId },
                                success: function (response) {
                                    currentDrawing = jQuery.parseJSON(response);

                                    if (currentDrawing != null) {
                                        $.ajax({
                                            type: "GET",
                                            url: linkController.QuartzPartialView,
                                            success: function (html) {
                                                $("#main").children().remove();
                                                $("#main").html(html);

                                                loadQuartz();

                                                function wait() {
                                                    source.getFeatures().forEach(function (feature) {
                                                        if (feature.get("Id") == item.Id && feature.get("Type") == "item") {
                                                            select.getFeatures().clear();
                                                            select.getFeatures().push(feature);
                                                            selectedFeature = select.getFeatures().item(0);

                                                            view.animate({
                                                                center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                                                zoom: 3,
                                                                duration: 800
                                                            });
                                                            return;
                                                        }
                                                    });

                                                    // Select Button from List Panel
                                                    var buttonId = selectedFeature.get('Id');

                                                    $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
                                                    lastClickedButtonId = buttonId;

                                                    var buttons = $("[name='item']");

                                                    for (var i = 0; i < buttons.length; i++) {
                                                        if (buttons[i].getAttribute('Id') == buttonId) {
                                                            buttons[i].setAttribute('style', 'background: #808080');
                                                            return;
                                                        }
                                                    }
                                                }
                                                setTimeout(wait, 200);
                                            },
                                            error: function (error) {
                                                alert("error!");
                                                console.log(error.responseText);
                                            }
                                        });
                                    }
                                    else {
                                        alert("Drawing Is Not Exist!");
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
    });




















    //$.ajax({
    //    type: "GET",
    //    url: itemController.Item.Detail,
    //    data: { itemId: itemId },
    //    success: function (response) {
    //        lastClickedItem = jQuery.parseJSON(response);
    //        clickedOrCreated = "clicked";
    //        $.ajax({
    //            type: "GET",
    //            url: linkController.Link.Detail,
    //            data: { linkId: lastClickedItem.QuartzLinkId },
    //            success: function (response) {
    //                currentQuartzLink = jQuery.parseJSON(response);

    //                $.ajax({
    //                    type: "GET",
    //                    url: linkController.DrawingSettings.Detail,
    //                    data: { drawingSettingsId: currentQuartzLink.DrawingSettingsId },
    //                    success: function (response) {
    //                        currentDrawingSettings = jQuery.parseJSON(response);

    //                        breadCrumb();
    //                        crumbCount++;
    //                        if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
    //                            $(".breadCrumb").append(
    //                                $('<li>', {
    //                                    text: currentDrawingSettings.DrawingNo,
    //                                    value: crumbCount,
    //                                    onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
    //                                    class: "crumb"
    //                                })
    //                            );
    //                        }

    //                        $.ajax({
    //                            type: "GET",
    //                            url: linkController.DrawingFeatures.GetVectorSource,
    //                            data: { quartzLinkId: currentQuartzLink.Id },
    //                            success: function (response) {
    //                                currentDrawingFeatures = jQuery.parseJSON(response);

    //                                $.ajax({
    //                                    type: "GET",
    //                                    url: fileController.Detail,
    //                                    data: { fileId: currentQuartzLink.CurrentDrawingId },
    //                                    success: function (response) {
    //                                        currentDrawing = jQuery.parseJSON(response);
    //                                        if (currentDrawing != null) {
    //                                            $.ajax({
    //                                                type: "GET",
    //                                                url: linkController.QuartzPartialView,
    //                                                success: function (html) {
    //                                                    $("#main").children().remove();
    //                                                    $("#main").html(html);

    //                                                    loadQuartz();

    //                                                    function wait() {
    //                                                        source.getFeatures().forEach(function (feature) {
    //                                                            if (feature.get("Id") == lastClickedItem.Id && feature.get("Type") == "item") {
    //                                                                select.getFeatures().clear();
    //                                                                select.getFeatures().push(feature);
    //                                                                selectedFeature = select.getFeatures().item(0);

    //                                                                view.animate({
    //                                                                    center: new ol.proj.fromLonLat(feature.get("LonLat")),
    //                                                                    zoom: 3,
    //                                                                    duration: 800
    //                                                                });
    //                                                                return;
    //                                                            }
    //                                                        });

    //                                                        // Select Button from List Panel
    //                                                        var buttonId = selectedFeature.get('Id');

    //                                                        $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
    //                                                        lastClickedButtonId = buttonId;

    //                                                        var buttons = $("[name='item']");

    //                                                        for (var i = 0; i < buttons.length; i++) {
    //                                                            if (buttons[i].getAttribute('Id') == buttonId) {
    //                                                                buttons[i].setAttribute('style', 'background: #808080');
    //                                                                return;
    //                                                            }
    //                                                        }
    //                                                    }
    //                                                    setTimeout(wait, 200);
    //                                                },
    //                                                error: function (error) {
    //                                                    alert("error!");
    //                                                    console.log(error.responseText);
    //                                                }
    //                                            });
    //                                        }
    //                                        else {
    //                                            alert("Drawing Is Not Exist!");
    //                                        }
    //                                    },
    //                                    error: function (error) {
    //                                        alert("error!");
    //                                        console.log(error.responseText);
    //                                    }
    //                                });
    //                            },
    //                            error: function (error) {
    //                                alert("error!");
    //                                console.log(error.responseText);
    //                            }
    //                        });

    //                    },
    //                    error: function (error) {
    //                        alert("error!");
    //                        console.log(error.responseText);
    //                    }
    //                });
    //            },
    //            error: function (error) {
    //                alert("error!");
    //                console.log(error.responseText);
    //            }
    //        });
    //    }
    //});
}

function goSelectedInspection(itemId) {
    $.ajax({
        type: "GET",
        url: itemController.Item.Detail,
        data: { itemId: itemId },
        success: function (response) {
            var inspectionsItem = jQuery.parseJSON(response);

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { drawingSettingsId: inspectionsItem.DrawingSettingsId },
                success: function (response) {
                    currentDrawingSettings = jQuery.parseJSON(response);

                    $.ajax({
                        type: "GET",
                        url: linkController.Link.Detail,
                        data: { linkId: 2 },
                        success: function (response) {
                            currentQuartzLink = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";
                            currentQuartzLink.DrawingSettingsId = currentDrawingSettings.Id;
                            breadCrumb();

                            if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
                                crumbCount++;
                                $(".breadCrumb").append(
                                    $('<li>', {
                                        text: currentDrawingSettings.DrawingNo,
                                        value: crumbCount,
                                        onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                        class: "crumb"
                                    })
                                );
                            }

                            $.ajax({
                                type: "POST",
                                url: linkController.Link.Update,
                                data: { model: currentQuartzLink },
                                success: function (response) {
                                    lastClickedLink = jQuery.parseJSON(response);
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: linkController.DrawingFeatures.GetVectorSource,
                        data: { drawingSettingsId: currentDrawingSettings.Id },
                        success: function (response) {
                            currentDrawingFeatures = jQuery.parseJSON(response);

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.CurrentDrawingId },
                                success: function (response) {
                                    currentDrawing = jQuery.parseJSON(response);

                                    if (currentDrawing != null) {
                                        $.ajax({
                                            async: false,
                                            type: "GET",
                                            url: linkController.QuartzPartialView,
                                            success: function (html) {
                                                $("#main").children().remove();
                                                $("#main").html(html);

                                                loadQuartz();
                                            },
                                            error: function (error) {
                                                alert("error!");
                                                console.log(error.responseText);
                                            }
                                        });

                                        function wait() {
                                            source.getFeatures().forEach(function (feature) {
                                                if (feature.get("Id") == inspectionsItem.Id && feature.get("Type") == "item") {
                                                    select.getFeatures().clear();
                                                    select.getFeatures().push(feature);
                                                    selectedFeature = select.getFeatures().item(0);

                                                    view.animate({
                                                        center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                                        zoom: 3,
                                                        duration: 800
                                                    });
                                                    return;
                                                }
                                            });

                                            // Select Button from List Panel
                                            var buttonId = selectedFeature.get('Id');

                                            $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
                                            lastClickedButtonId = buttonId;

                                            var buttons = $("[name='item']");

                                            for (var i = 0; i < buttons.length; i++) {
                                                if (buttons[i].getAttribute('Id') == buttonId) {
                                                    buttons[i].setAttribute('style', 'background: #808080');
                                                    return;
                                                }
                                            }
                                        }
                                        setTimeout(wait, 200);
                                    }
                                    else {
                                        alert("Drawing Is Not Exist!");
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
    });
}

function goSelectedValveMaintenance(itemId) {
    $.ajax({
        type: "GET",
        url: itemController.Item.Detail,
        data: { itemId: itemId },
        success: function (response) {
            var valveMaintenancesItem = jQuery.parseJSON(response);

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { drawingSettingsId: valveMaintenancesItem.DrawingSettingsId },
                success: function (response) {
                    currentDrawingSettings = jQuery.parseJSON(response);

                    $.ajax({
                        type: "GET",
                        url: linkController.Link.Detail,
                        data: { linkId: 2 },
                        success: function (response) {
                            currentQuartzLink = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";
                            currentQuartzLink.DrawingSettingsId = currentDrawingSettings.Id;
                            breadCrumb();

                            if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
                                crumbCount++;
                                $(".breadCrumb").append(
                                    $('<li>', {
                                        text: currentDrawingSettings.DrawingNo,
                                        value: crumbCount,
                                        onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                        class: "crumb"
                                    })
                                );
                            }

                            $.ajax({
                                type: "POST",
                                url: linkController.Link.Update,
                                data: { model: currentQuartzLink },
                                success: function (response) {
                                    lastClickedLink = jQuery.parseJSON(response);
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: linkController.DrawingFeatures.GetVectorSource,
                        data: { drawingSettingsId: currentDrawingSettings.Id },
                        success: function (response) {
                            currentDrawingFeatures = jQuery.parseJSON(response);

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.CurrentDrawingId },
                                success: function (response) {
                                    currentDrawing = jQuery.parseJSON(response);

                                    if (currentDrawing != null) {
                                        $.ajax({
                                            async: false,
                                            type: "GET",
                                            url: linkController.QuartzPartialView,
                                            success: function (html) {
                                                $("#main").children().remove();
                                                $("#main").html(html);

                                                loadQuartz();
                                            },
                                            error: function (error) {
                                                alert("error!");
                                                console.log(error.responseText);
                                            }
                                        });

                                        function wait() {
                                            source.getFeatures().forEach(function (feature) {
                                                if (feature.get("Id") == valveMaintenancesItem.Id && feature.get("Type") == "item") {
                                                    select.getFeatures().clear();
                                                    select.getFeatures().push(feature);
                                                    selectedFeature = select.getFeatures().item(0);

                                                    view.animate({
                                                        center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                                        zoom: 3,
                                                        duration: 800
                                                    });
                                                    return;
                                                }
                                            });

                                            // Select Button from List Panel
                                            var buttonId = selectedFeature.get('Id');

                                            $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
                                            lastClickedButtonId = buttonId;

                                            var buttons = $("[name='item']");

                                            for (var i = 0; i < buttons.length; i++) {
                                                if (buttons[i].getAttribute('Id') == buttonId) {
                                                    buttons[i].setAttribute('style', 'background: #808080');
                                                    return;
                                                }
                                            }
                                        }
                                        setTimeout(wait, 200);
                                    }
                                    else {
                                        alert("Drawing Is Not Exist!");
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
    });
}

function goSelectedThicknessMeasurement(itemId) {
    $.ajax({
        type: "GET",
        url: itemController.Item.Detail,
        data: { itemId: itemId },
        success: function (response) {
            var thicknessMeasurementItem = jQuery.parseJSON(response);

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { drawingSettingsId: thicknessMeasurementItem.DrawingSettingsId },
                success: function (response) {
                    currentDrawingSettings = jQuery.parseJSON(response);

                    $.ajax({
                        type: "GET",
                        url: linkController.Link.Detail,
                        data: { linkId: 2 },
                        success: function (response) {
                            currentQuartzLink = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";
                            currentQuartzLink.DrawingSettingsId = currentDrawingSettings.Id;
                            breadCrumb();

                            if (currentDrawingSettings.DrawingNo != mainDrawingSettings.DrawingNo) {
                                crumbCount++;
                                $(".breadCrumb").append(
                                    $('<li>', {
                                        text: currentDrawingSettings.DrawingNo,
                                        value: crumbCount,
                                        onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                        class: "crumb"
                                    })
                                );
                            }

                            $.ajax({
                                type: "POST",
                                url: linkController.Link.Update,
                                data: { model: currentQuartzLink },
                                success: function (response) {
                                    lastClickedLink = jQuery.parseJSON(response);
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: linkController.DrawingFeatures.GetVectorSource,
                        data: { drawingSettingsId: currentDrawingSettings.Id },
                        success: function (response) {
                            currentDrawingFeatures = jQuery.parseJSON(response);

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.CurrentDrawingId },
                                success: function (response) {
                                    currentDrawing = jQuery.parseJSON(response);

                                    if (currentDrawing != null) {
                                        $.ajax({
                                            async: false,
                                            type: "GET",
                                            url: linkController.QuartzPartialView,
                                            success: function (html) {
                                                $("#main").children().remove();
                                                $("#main").html(html);

                                                loadQuartz();
                                            },
                                            error: function (error) {
                                                alert("error!");
                                                console.log(error.responseText);
                                            }
                                        });

                                        function wait() {
                                            source.getFeatures().forEach(function (feature) {
                                                if (feature.get("Id") == thicknessMeasurementItem.Id && feature.get("Type") == "item") {
                                                    select.getFeatures().clear();
                                                    select.getFeatures().push(feature);
                                                    selectedFeature = select.getFeatures().item(0);

                                                    view.animate({
                                                        center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                                        zoom: 3,
                                                        duration: 800
                                                    });
                                                    return;
                                                }
                                            });

                                            // Select Button from List Panel
                                            var buttonId = selectedFeature.get('Id');

                                            $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
                                            lastClickedButtonId = buttonId;

                                            var buttons = $("[name='item']");

                                            for (var i = 0; i < buttons.length; i++) {
                                                if (buttons[i].getAttribute('Id') == buttonId) {
                                                    buttons[i].setAttribute('style', 'background: #808080');
                                                    return;
                                                }
                                            }
                                        }
                                        setTimeout(wait, 200);
                                    }
                                    else {
                                        alert("Drawing Is Not Exist!");
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });

                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
    });

    //$.ajax({
    //    type: "GET",
    //    url: itemController.Item.Detail,
    //    data: { itemId: itemId },
    //    success: function (response) {
    //        var thicknessMeasurementsItem = jQuery.parseJSON(response);

    //        $.ajax({
    //            type: "GET",
    //            url: linkController.Link.Detail,
    //            data: { linkId: thicknessMeasurementsItem.QuartzLinkId },
    //            success: function (response) {
    //                currentQuartzLink = jQuery.parseJSON(response);

    //                $.ajax({
    //                    type: "GET",
    //                    url: linkController.DrawingFeatures.GetVectorSource,
    //                    data: { quartzLinkId: currentQuartzLink.Id },
    //                    success: function (response) {
    //                        currentDrawingFeatures = jQuery.parseJSON(response);

    //                        $.ajax({
    //                            type: "GET",
    //                            url: fileController.Detail,
    //                            data: { fileId: currentQuartzLink.CurrentDrawingId },
    //                            success: function (response) {
    //                                currentDrawing = jQuery.parseJSON(response);
    //                                if (currentDrawing != null) {
    //                                    $.ajax({
    //                                        type: "GET",
    //                                        url: linkController.QuartzPartialView,
    //                                        success: function (html) {
    //                                            $("#main").children().remove();
    //                                            $("#main").html(html);

    //                                            loadQuartz();

    //                                            function wait() {
    //                                                source.getFeatures().forEach(function (feature) {
    //                                                    if (feature.get("Id") == thicknessMeasurementsItem.Id && feature.get("Type") == "item") {
    //                                                        select.getFeatures().clear();
    //                                                        select.getFeatures().push(feature);
    //                                                        selectedFeature = select.getFeatures().item(0);

    //                                                        view.animate({
    //                                                            center: new ol.proj.fromLonLat(feature.get("LonLat")),
    //                                                            zoom: 3,
    //                                                            duration: 800
    //                                                        });
    //                                                        return;
    //                                                    }
    //                                                });

    //                                                // Select Button from List Panel
    //                                                var buttonId = selectedFeature.get('Id');

    //                                                $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
    //                                                lastClickedButtonId = buttonId;

    //                                                var buttons = $("[name='item']");

    //                                                for (var i = 0; i < buttons.length; i++) {
    //                                                    if (buttons[i].getAttribute('Id') == buttonId) {
    //                                                        buttons[i].setAttribute('style', 'background: #808080');
    //                                                        return;
    //                                                    }
    //                                                }
    //                                            }
    //                                            setTimeout(wait, 200); // [TAMAMLANMADI]
    //                                        },
    //                                        error: function (error) {
    //                                            alert("error!");
    //                                            console.log(error.responseText);
    //                                        }
    //                                    });
    //                                }
    //                                else {
    //                                    alert("Drawing Is Not Exist!");
    //                                }
    //                            },
    //                            error: function (error) {
    //                                alert("error!");
    //                                console.log(error.responseText);
    //                            }
    //                        });
    //                    },
    //                    error: function (error) {
    //                        alert("error!");
    //                        console.log(error.responseText);
    //                    }
    //                });
    //            },
    //            error: function (error) {
    //                alert("error!");
    //                console.log(error.responseText);
    //            }
    //        });
    //    }
    //});
}
