////const { forEach } = require("../lib/fontawesome-free-6.1.2-web/js/v4-shims");

//const { registerFont } = require("ol/render/canvas");

//const { get } = require("ol/proj");

function createPDF() {
    switch (activeSearch) {
        case "drawing":
            // open pdf's modal
            //$("#showPdfeModal").modal("toggle");

            // #region PDF HEADER
            $("#showPdfModalPartialArea").children().remove();
            $("#showPdfModalPartialArea").html(`
                <div id="drawingPDF" style="font-size: 12px;">
                    <page size="A4">
                        <br />
                        <h5><strong>QUARTZ Search Report - Drawing Details</strong></h5>
                        <br />
                        <h6 style="color: gray;">Project: ` + projectName + `</h6>
                        <h6 style="color: gray;">Date: `+ getDate().split('T')[0] + `</h6>
                        <br />
                        <br />
                        <br />
                        <div id="drawingTableArea">
                        </div>
                    </page>
                </div>
            `);
            // #endregion

            // #region Drawing Table
            $("#drawingTableArea").append(`
                <div style="border: 1px solid black">
                    <table class="table table-hover text-sm table-responsive-sm table-sm mb-0">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 12%;">Drawing No</th>
                                <th class="text-center" style="width: 12%;">Plant Area</th>
                                <th class="text-center" style="width: 12%;">Plant System</th>
                                <th class="text-center" style="width: 12%;">Description</th>
                            </tr>
                        </thead>

                        <tbody class="drawingSettingsTablesBody">
                        </tbody>
                    </table>
                </div>
            `);

            printDrawingModelsArray.forEach(function (drawing) {
                $(".drawingSettingsTablesBody").append(
                    $('<tr>').append(
                        $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                            drawing.DrawingNo
                        ),
                        $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                            drawing.PlantArea
                        ),
                        $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                            drawing.PlantSystem
                        ),
                        $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '40%').css('max-width', '40%').append(
                            drawing.Description
                        )
                    )
                );
            });
            // #endregion

            // Download PDF
            createDrawingPDF();
            break;

        case "item":

            // open pdf's modal
            //$("#showPdfeModal").modal("toggle");

            // #region PDF HEADER
            $("#showPdfModalPartialArea").children().remove();
            $("#showPdfModalPartialArea").html(`
                <div id="itemPDF" style="font-size: 12px;">
                    <page size="A4">
                        <br />
                        <h5><strong>QUARTZ Search Report - Item Details</strong></h5>
                        <br />
                        <h6 style="color: gray;">Project: ` + projectName + `</h6>
                        <h6 style="color: gray;">Date: `+ getDate().split('T')[0] + `</h6>
                        <br />
                        <div id="itemTableArea">
                        </div>
                    </page>
                </div>
            `);
            // #endregion

            // #region item'ın yapıldığı çizimlerin isimlerinin tutulduğu dizi
            allDrawingReferences = [];
            drawingsPlantAreas = [];
            printItemModelsArray.forEach(function (item) {
                if (!allDrawingReferences.includes(item.MainLinkName)) {
                    allDrawingReferences.push(item.MainLinkName);
                    drawingsPlantAreas.push(item.MainLinkPlantArea);
                }
            });
            // #endregion

            // #region Item Table
            for (var i = 0; i < allDrawingReferences.length; i++) {
                $("#itemTableArea").append(`
                    <div>
                        <p class="m-0 pdfHeader"><strong>Plant Area: </strong> `+ drawingsPlantAreas[i] + `</p>
                        <p class="pdfHeader"><strong>Drawing Location:</strong> `+ allDrawingReferences[i] + `</p>
                    </div>

                    <div style="border: 1px solid black">
                        <table class="table table-hover text-sm table-responsive-sm table-sm mb-0">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 20%;">Plant Ident</th>
                                    <th class="text-center" style="width: 20%;">Original Ident</th>
                                    <th class="text-center" style="width: 20%;">Fitting Type</th>
                                    <th class="text-center" style="width: 20%;">Specification</th>
                                    <th class="text-center" style="width: 20%;">Inspection History</th>
                                </tr>
                            </thead>

                            <tbody class="`+ allDrawingReferences[i] + `TablesBody">
                            </tbody>
                        </table>
                    </div>

                    <br />
                    <br />
                `);

                printItemModelsArray.forEach(function (item) {
                    if (allDrawingReferences[i] == item.MainLinkName) {
                        $("." + allDrawingReferences[i] + "TablesBody").append(
                            $('<tr>').append(
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '20%').css('max-width', '20%').append(
                                    item.TagNo
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '20%').css('max-width', '20%').append(
                                    item.SerialNo
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '20%').css('max-width', '20%').append(
                                    item.FittingType
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '20%').css('max-width', '20%').append(
                                    item.Specification
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '20%').css('max-width', '20%').append(
                                    item.InspectionHistory
                                )
                            )
                        );
                    }
                });

                // arraylerin içini boşalt!
                allDrawingReferences = [];
                drawingsPlantAreas = [];

                // Download PDF
                createItemPDF();
            }
            // #endregion
            break;

        case "inspection":

            // open pdf's modal
            //$("#showPdfeModal").modal("toggle");

            // #region PDF HEADER
            $("#showPdfModalPartialArea").children().remove();
            $("#showPdfModalPartialArea").html(`
                <div id="inspectionPDF" style="font-size: 12px;">
                    <page size="A4">
                        <br />
                        <h5><strong>QUARTZ Search Report - Inspection Details</strong></h5>
                        <br />
                        <h6 style="color: gray;">Project: ` + projectName + `</h6>
                        <h6 style="color: gray;">Date: `+ getDate().split('T')[0] + `</h6>
                        <br />
                        <div id="inspectionTableArea">
                        </div>
                    </page>
                </div>
            `);
            // #endregion

            // #region inspection'ın yapıldığı çizimlerin isimlerinin tutulduğu dizi
            allDrawingReferences = [];
            drawingsPlantAreas = [];
            printInspectionModelsArray.forEach(function (inspection) {
                if (!allDrawingReferences.includes(inspection.DrawingRef)) {
                    allDrawingReferences.push(inspection.DrawingRef);
                    drawingsPlantAreas.push(inspection.PlantArea);
                }
            });
            // #endregion

            // #region Inspection Table
            for (var i = 0; i < allDrawingReferences.length; i++) {
                $("#inspectionTableArea").append(`
                    <div>
                        <p class="m-0 pdfHeader"><strong>Plant Area: </strong> `+ drawingsPlantAreas[i] + `</p>
                        <p class="pdfHeader"><strong>Drawing Location:</strong> `+ allDrawingReferences[i] + `</p>
                    </div>

                    <div style="border: 1px solid black">
                        <table class="table table-hover text-sm table-responsive-sm table-sm mb-0">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 12%;">Plant Ident</th>
                                    <th class="text-center" style="width: 12%;">Insp. Date</th>
                                    <th class="text-center" style="width: 12%;">Procedure</th>
                                    <th class="text-center" style="width: 12%;">Report No</th>
                                    <th class="text-center" style="width: 12%;">Status</th>
                                    <th class="text-center" style="width: 40%;">Details</th>
                                </tr>
                            </thead>

                            <tbody class="`+ allDrawingReferences[i] + `TablesBody">
                            </tbody>
                        </table>
                    </div>

                    <br />
                    <br />
                `);

                printInspectionModelsArray.forEach(function (inspection) {
                    if (allDrawingReferences[i] == inspection.DrawingRef) {
                        $("." + allDrawingReferences[i] + "TablesBody").append(
                            $('<tr>').append(
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                                    inspection.PlantIdent
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                                    inspection.InspDate
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                                    inspection.Procedure
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                                    inspection.ReportNo
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '12%').css('max-width', '12%').append(
                                    inspection.Status
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '40%').css('max-width', '40%').append(
                                    inspection.Details
                                )
                            )
                        );
                    }
                });
            }
            // #endregion

            // arraylerin içini boşalt!
            allDrawingReferences = [];
            drawingsPlantAreas = [];

            // Download PDF
            createInspectionPDF();
            break;

        case "valveMaintenance":
            // open pdf's modal
            //$("#showPdfeModal").modal("toggle");

            // #region PDF HEADER
            $("#showPdfModalPartialArea").children().remove();
            $("#showPdfModalPartialArea").html(`
                <div id="valveMaintenancePDF" style="font-size: 12px;">
                    <page size="A4">
                        <br />
                        <h5><strong>QUARTZ Search Report - Valve Maintenance Details</strong></h5>
                        <br />
                        <h6 style="color: gray;">Project: ` + projectName + `</h6>
                        <h6 style="color: gray;">Date: `+ getDate().split('T')[0] + `</h6>
                        <br />
                        <div id="valveMaintenanceTableArea">
                        </div>
                    </page>
                </div>
            `);
            // #endregion

            // #region valve maintenance'ın yapıldığı çizimlerin isimlerinin tutulduğu dizi
            allDrawingReferences = [];
            drawingsPlantAreas = [];
            printValveMaintenanceModelsArray.forEach(function (inspection) {
                if (!allDrawingReferences.includes(inspection.MainLinkName)) {
                    allDrawingReferences.push(inspection.MainLinkName);
                    drawingsPlantAreas.push(inspection.MainLinkPlantArea);
                }
            });
            // #endregion

            // #region Valve Maintenance Table
            for (var i = 0; i < allDrawingReferences.length; i++) {
                $("#valveMaintenanceTableArea").append(`
                    <div>
                        <p class="m-0 pdfHeader"><strong>Plant Area: </strong> `+ drawingsPlantAreas[i] + `</p>
                        <p class="pdfHeader"><strong>Drawing Location:</strong> `+ allDrawingReferences[i] + `</p>
                    </div>

                    <div class="`+ allDrawingReferences[i] + `VmArea">
                       
                    </div>

                    <br />
                    <br />
                `);

                printValveMaintenanceModelsArray.forEach(function (valveMaintenance) {
                    if (allDrawingReferences[i] == valveMaintenance.MainLinkName) {
                        $("." + allDrawingReferences[i] + "VmArea").append(`
                            <div class="pageBreak" style="border: 1px solid black;">
                        
                                <div class="row">
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>KKS No:</strong> `+ valveMaintenance.KKSNo + `</p>
                                    </div>
                        
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Serial No:</strong> `+ valveMaintenance.SerialNo + `</p>
                                    </div>
                        
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Plant Area:</strong> `+ valveMaintenance.PlantArea + `</p>
                                    </div>
                                </div>
                        
                                <hr class="m-0" />
                        
                                <div class="row">
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Ideal Barg:</strong> `+ valveMaintenance.IdealBarg + `</p>
                                    </div>
                                    
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Opening Pressure Barg:</strong> `+ valveMaintenance.OpeningPressureBarg + `</p>
                                    </div>
                        
                                    <div class="col-4">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Test Date:</strong> `+ valveMaintenance.TestDate + `</p>
                                    </div>
                                </div>
                        
                                <hr class="m-0" />
                        
                                <div class="row">
                                    <div class="col-6">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Supplier Manufacturare:</strong> `+ valveMaintenance.SupplierManufacturare + `</p>
                                    </div>
                        
                                    <div class="col-6">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Designation:</strong> `+ valveMaintenance.Designation + `</p>
                                    </div>
                                </div>
                        
                                <hr class="m-0" />
                        
                                <div class="row">
                                    <div class="col-12">
                                        <p class="my-1" style="padding-left: 5px;"><strong>Remarks:</strong> `+ valveMaintenance.Remarks + `</p>
                                    </div>
                              </div>
                        
                          </div>
                            <br />
                        `);
                    }
                });
            }
            // #endregion

            // arraylerin içini boşalt!
            allDrawingReferences = [];
            drawingsPlantAreas = [];

            // Download PDF
            createValveMaintenancePDF();
            break;

        case "thicknessMeasurement":
            // open pdf's modal
            //$("#showPdfeModal").modal("toggle");

            // #region PDF HEADER
            $("#showPdfModalPartialArea").children().remove();
            $("#showPdfModalPartialArea").html(`
                <div id="thicknessMeasurementPDF" style="font-size: 12px;">
                    <page size="A4">
                        <br />
                        <h5><strong>QUARTZ Search Report - Thickness Measurement Details</strong></h5>
                        <br />
                        <h6 style="color: gray;">Project: ` + projectName + `</h6>
                        <h6 style="color: gray;">Date: `+ getDate().split('T')[0] + `</h6>
                        <br />
                        <div id="thicknessMeasurementTableArea">
                        </div>
                    </page>
                </div>
            `);
            // #endregion

            // #region thickness measurement'ın yapıldığı çizimlerin isimlerinin tutulduğu dizi
            allDrawingReferences = [];
            drawingsPlantAreas = [];
            printThicknessMeasurementModelsArray.forEach(function (thicknessMeasurement) {
                if (!allDrawingReferences.includes(thicknessMeasurement.MainLinkName)) {
                    allDrawingReferences.push(thicknessMeasurement.MainLinkName);
                    drawingsPlantAreas.push(thicknessMeasurement.MainLinkPlantArea);
                }
            });
            // #endregion

            // #region Thickness Measurement Table
            for (var i = 0; i < allDrawingReferences.length; i++) {
                $("#thicknessMeasurementTableArea").append(`
                    <div>
                        <p class="m-0 pdfHeader"><strong>Plant Area: </strong> `+ drawingsPlantAreas[i] + `</p>
                        <p class="pdfHeader"><strong>Drawing Location:</strong> `+ allDrawingReferences[i] + `</p>
                    </div>

                    <div style="border: 1px solid black">
                        <table class="table table-hover text-sm table-responsive-sm table-sm mb-0">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 10%;">Plant Area</th>
                                    <th class="text-center" style="width: 12%;">Plant System</th>
                                    <th class="text-center" style="width: 10%;">Specification</th>
                                    <th class="text-center" style="width: 10%;">Nominal T.</th>
                                    <th class="text-center" style="width: 12%;">Measured T.</th>
                                    <th class="text-center" style="width: 12%;">Created Date</th>
                                    <th class="text-center" style="width: 34%;">Description</th>
                                </tr>
                            </thead>

                            <tbody class="`+ allDrawingReferences[i] + `TablesBody">
                            </tbody>
                        </table>
                    </div>

                    <br />
                    <br />
                `);

                printThicknessMeasurementModelsArray.forEach(function (thicknessMeasurement) {
                    if (allDrawingReferences[i] == thicknessMeasurement.MainLinkName) {
                        $("." + allDrawingReferences[i] + "TablesBody").append(
                            $('<tr>').append(
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.PlantArea
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.PlantSystem
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.Specification
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.NominalThickness
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.MeasuredThickness
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '10%').css('max-width', '10%').append(
                                    thicknessMeasurement.CratedDate
                                ),
                                $('<td>').css('text-align', 'center').css('word-wrap', 'break-word').css('min-width', '40%').css('max-width', '40%').append(
                                    thicknessMeasurement.Description
                                )
                            )
                        );
                    }
                });
            }
            // #endregion

            // arraylerin içini boşalt!
            allDrawingReferences = [];
            drawingsPlantAreas = [];

            // Download PDF
            createThicknessMeasurementPDF();
            break;

        default:
    }
}

function createDrawingPDF() {
    var pdf = document.getElementById("drawingPDF");
    var opt = {
        filename: 'Drawing_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdf).save();
}

function createItemPDF() {
    var pdf = document.getElementById("itemPDF");
    var opt = {
        filename: 'Item_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdf).save();
}

function createInspectionPDF() {
    var pdf = document.getElementById("inspectionPDF");
    var opt = {
        filename: 'Inspection_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdf).save();
}

function createValveMaintenancePDF() {
    var pdf = document.getElementById("valveMaintenancePDF");
    var opt = {
        filename: 'Valve_Maintenance_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdf).save();
}

function createThicknessMeasurementPDF() {
    var pdf = document.getElementById("thicknessMeasurementPDF");
    var opt = {
        filename: 'Thickness_Measurement_Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdf).save();
}