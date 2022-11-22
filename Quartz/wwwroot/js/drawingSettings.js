﻿// #region Drawing Settings Modal

// #region DSM - Upload New Drawing
//var drawingSettingsModalUploadDrawingArea = false;
//$("#btnDsmUploadDrawing").on("click", function () {
//    if (drawingSettingsModalUploadDrawingArea == false) {
//        document.getElementById("dsmUploadDrawingArea").removeAttribute("hidden");
//        drawingSettingsModalUploadDrawingArea = true;
//        return -1;
//    }
//    if (drawingSettingsModalUploadDrawingArea == true) {
//        document.getElementById("dsmUploadDrawingArea").setAttribute("hidden", "");
//        drawingSettingsModalUploadDrawingArea = false;
//        return -1;
//    }
//});
// #endregion

// #region DSM - Save Button
$("#btnDsmSave").on('click', function () {
    var drawingSettingsModel = {
        Id: currentDrawingSettings.Id,
        DrawingNo: $("#dsmDrawingNo").val(),
        Description: $("#dsmDrawingDescription").val(),
        File: $("#dsmSelectDrawing").val(),
        PlantArea: $("#dsmPlantArea").val(),
        PlantSystem: $("#dsmPlantSystem").val(),
        QuartzLinkId: currentQuartzLink.Id
    }

    if (currentDrawingSettings.File != $("#dsmSelectDrawing").val()) {
        currentDrawingSettings.File = $("#dsmSelectDrawing").val();
        drawingSettingsModel.File = currentDrawingSettings.File;

        $.ajax({
            type: "POST",
            url: linkController.DrawingSettings.Update,
            data: { model: drawingSettingsModel },
            success: function (response) {
                currentDrawingSettings = jQuery.parseJSON(response);

                $.ajax({
                    type: "GET",
                    url: fileController.Detail,
                    data: { fileId: currentDrawingSettings.File },
                    success: function (response) {
                        currentDrawing = jQuery.parseJSON(response);
                        $.ajax({
                            type: "GET",
                            url: linkController.QuartzPartialView,
                            success: function (html) {
                                refreshQuartz();

                                //$("#main").children().remove();
                                //$("#main").html(html);

                                //loadQuartz();
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
                toast("Drawing Settings Updated!");
            },
            error: function (error) {
                alert("error!");
                console.log(error.responseText);
            }
        });
    }

    if (currentDrawingSettings.DrawingNo != $("#dsmDrawingNo").val()) {
        currentQuartzLink.TagNo = $("#dsmDrawingNo").val();

        if (currentQuartzLink.MainQuartzLinkId != 0) {
            $.ajax({
                type: "GET",
                url: linkController.DrawingFeatures.GetVectorSource,
                data: { quartzLinkId: currentQuartzLink.MainQuartzLinkId },
                success: function (response) {
                    var drawingFeatures = jQuery.parseJSON(response);
                    var drawingFeaturesParse = jQuery.parseJSON(drawingFeatures.Features);

                    drawingFeaturesParse.features.forEach(function (feature) {
                        if (feature.properties.Id == currentQuartzLink.Id) {
                            feature.properties.Name = currentQuartzLink.TagNo;
                            drawingFeatures.Features = JSON.stringify(drawingFeaturesParse);
                            $.ajax({
                                type: "POST",
                                url: linkController.DrawingFeatures.Update,
                                data: { model: drawingFeatures },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                            return;
                        }
                    });
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }

        $.ajax({
            type: "POST",
            url: linkController.Link.Update,
            data: { model: currentQuartzLink },
            success: function (response) {
                linkDetail = jQuery.parseJSON(response);
                goDrawingFromSearch(linkDetail.Id);
            },
            error: function (error) {
                alert("error!");
                console.log(error.responseText);
            }
        });
    }

    $.ajax({
        type: "POST",
        url: linkController.DrawingSettings.Update,
        data: { model: drawingSettingsModel },
        success: function (response) {
            currentDrawingSettings = jQuery.parseJSON(response);
            function wait() {
                //selectedFeature.setProperties({ 'Name': link.TagNo });
                updateDrawingFeatures();
                source.clear();
                addFeatureToSource();
                $("#shapeArea").children().remove();
                createList();
                // Load Spinner Yap! [TAMAMLANMADI]
            }
            setTimeout(wait, 100);
            toast("Drawing Settings Updated!");
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });

});
// #endregion

// #region DSM - Works when DSM Button is clicked
$("#btnDrawingSettings").on('click', function () {
    loadDrawingSettingsDataPage();
});

// #endregion

// #endregion

// Data Tab [loadDrawingSettingsDataPage()]
function loadDrawingSettingsDataPage() {
    $("#dsmTitle").html("Drawing Settings");
    $("#dsmSelectDrawing").removeAttr("disabled");
    // #region DSM - Get Drawing Settings Detail from QuartzLink Controller

    $.ajax({
        type: "GET",
        url: linkController.DrawingSettings.DataPartialView,
        success: function (html) {
            $("#dsmPartialArea").html(html);

            // #region DSM - Upload Drawing Button
            var dsmUploadDrawingArea = false;
            $("#btnDsmUploadDrawing").on("click", function () {
                if (dsmUploadDrawingArea == false) {
                    document.getElementById("dsmUploadDrawingArea").removeAttribute("hidden");
                    $("#dsmSelectDrawing").attr("disabled", "");
                    dsmUploadDrawingArea = true;
                    return -1;
                }
                if (dsmUploadDrawingArea == true) {
                    document.getElementById("dsmUploadDrawingArea").setAttribute("hidden", "");
                    $("#dsmSelectDrawing").removeAttr("disabled");
                    dsmUploadDrawingArea = false;
                    return -1;
                }
            });
            // #endregion

            $.ajax({
                type: "GET",
                url: linkController.DrawingSettings.Detail,
                data: { quartzLinkId: currentQuartzLink.Id },
                success: function (result) {
                    currentDrawingSettings = jQuery.parseJSON(result);

                    drawingSettingsModalUploadDrawingArea = false;
                    document.getElementById("dsmUploadDrawingArea").setAttribute("hidden", "");
                    $("#dsmSelectedDrawing").text("");

                    // #region Choose Drawing Button > [Change Function]
                    $("#dsmUploadDrawing").on('change', function (e) {
                        var fileName = e.target.files[0].name;
                        $(".dsmSelectedDrawing").text("Selected Drawing: " + fileName);
                    });
                    // #endregion

                    // #region Get All Drawings for Select/Option
                    $.ajax({
                        type: "GET",
                        url: fileController.GetAllDrawings,
                        success: function (response) {
                            allDrawings = jQuery.parseJSON(response);

                            // #region Create & Configure Select > Option
                            $("#dsmSelectDrawing").children().remove();

                            $.ajax({
                                type: "GET",
                                url: fileController.Detail,
                                data: { fileId: currentDrawingSettings.File }, // TAMAMLANAMDI BURADA KALDIM
                                success: function (response) {
                                    var selectedDrawing = jQuery.parseJSON(response);

                                    $("#dsmSelectDrawing").append(
                                        $('<option>', {
                                            value: selectedDrawing.Id,
                                            text: selectedDrawing.Name,
                                            id: "dsmSelectedDrawingx"
                                        })
                                    );
                                    $("#dsmSelectedDrawingx").attr("hidden", "");

                                    for (var i = 0; i < allDrawings.length; i++) {
                                        $("#dsmSelectDrawing").append(
                                            $('<option>', {
                                                value: allDrawings[i].Id,
                                                text: allDrawings[i].Name,
                                            })
                                        );
                                    }
                                },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });
                            // #endregion
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                    // #endregion

                    $("#dsmDrawingNo").val(currentDrawingSettings.DrawingNo);
                    $("#dsmDrawingDescription").val(currentDrawingSettings.Description);

                    // #region DSM - Get Plant Areas For Select > Options
                    $.ajax({
                        type: "GET",
                        url: lookupItemController.PlantArea.List,
                        success: function (result) {
                            rModel = jQuery.parseJSON(result);

                            // #region DSM - Create & Configure Select > Options
                            $("#dsmPlantArea").children().remove();
                            if (currentDrawingSettings.PlantArea == null || currentDrawingSettings.PlantArea == "select") {
                                $("#dsmPlantArea").append(
                                    $('<option>', {
                                        value: "select",
                                        text: "Select Plant Area",
                                        id: "selectDsmPlantArea"
                                    })
                                );
                                $("#selectDsmPlantArea").attr("hidden", "");
                            }
                            else {
                                $("#dsmPlantArea").append(
                                    $('<option>', {
                                        value: currentDrawingSettings.PlantArea,
                                        text: currentDrawingSettings.PlantArea,
                                        id: "selectDsmPlantArea"
                                    })
                                );
                                $("#selectDsmPlantArea").attr("hidden", "");
                            }

                            for (var i = 0; i < rModel.length; i++) {
                                $("#dsmPlantArea").append(
                                    $('<option>', {
                                        value: rModel[i].Name,
                                        text: rModel[i].Name
                                    })
                                );
                            }
                            // #engregion
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                    // #endregion

                    // [TAMAMLANMADI] : Şu anda Plant System, Plant Area success'in içinde çalışıyor ama bunlar bağımsız olay. Düzelt!

                    // #region DSM - Get Plant Systems For Select>Options
                    $.ajax({
                        type: "GET",
                        url: lookupItemController.PlantSystem.List,
                        success: function (result) {
                            rModel = jQuery.parseJSON(result);

                            // #region DSM - Create & Configure Select>Options
                            $("#dsmPlantSystem").children().remove();

                            if (currentDrawingSettings.PlantSystem == null || currentDrawingSettings.PlantSystem == "select") {
                                $("#dsmPlantSystem").append(
                                    $('<option>', {
                                        value: "select",
                                        text: "Select Plant System",
                                        id: "selectDsmPlantSystem"
                                    })
                                );
                                $("#selectDsmPlantSystem").attr("hidden", "");
                            }
                            else {
                                $("#dsmPlantSystem").append(
                                    $('<option>', {
                                        value: currentDrawingSettings.PlantSystem,
                                        text: currentDrawingSettings.PlantSystem,
                                        id: "selectDsmPlantSystem"
                                    })
                                );
                                $("#selectDsmPlantSystem").attr("hidden", "");
                            }

                            for (var i = 0; i < rModel.length; i++) {
                                $("#dsmPlantSystem").append(
                                    $('<option>', {
                                        value: rModel[i].Name,
                                        text: rModel[i].Name
                                    })
                                );
                            }
                            // #endregion
                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                    // #endregion
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

    // #endregion
    // #endregion
}

// Attachment Tab [loadThicknessMeasurementAttachmentPage()]
function loadDrawingSettingsAttachmentPage() {
    $("#dsmTitle").html("Drawing Settings | Attachment");

    $.ajax({
        type: "GET",
        url: linkController.DrawingSettings.AttachmentPartialView,
        success: function (html) {
            $("#dsmPartialArea").html(html);

            // #region Choose File Button > [Change Function]
            $("#dsmUploadFile").on('change', function (e) {
                var fileName = e.target.files[0].name;
                $("#dsmSelectedFile").text("Selected File: " + fileName);
            });
            // #endregion

            // #region Create Table's Rows
            $("#dsmAttachmentTable").children('tbody').children('tr').remove();

            if (currentDrawingSettings.AttachmentIds != null) {
                if (currentDrawingSettings.AttachmentIds.indexOf(",") == -1) {
                    var attachmentId = currentDrawingSettings.AttachmentIds
                    $.ajax({
                        type: "GET",
                        url: fileController.Detail,
                        data: { fileId: attachmentId },
                        success: function (response) {
                            var attachmentModel = jQuery.parseJSON(response);

                            if (attachmentModel == null) {
                                $("#dsmAttachmentTable").children('tbody').append(
                                    $('<tr>').append(
                                        $('<td>', { colspan: "5", class: "text-center" }).append("No data available to show!")
                                    )
                                );
                            }
                            else {
                                var uploadedDate = attachmentModel.CreatedDate.split('T')[0];
                                $("#dsmAttachmentTable").children('tbody').append(
                                    $('<tr>').append(
                                        $('<td>', { align: "center" }).append(
                                            "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.Name + "'>" + attachmentModel.Name + "</p>"
                                        ),
                                        $('<td>', { align: "center" }).append(
                                            "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.Type + "'>" + attachmentModel.Type + "</p>"
                                        ),
                                        $('<td>', { align: "center" }).append(
                                            "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.UploadedBy + "'>" + attachmentModel.UploadedBy + "</p>"
                                        ),
                                        $('<td>', { align: "center" }).append(
                                            "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + uploadedDate + "'>" + uploadedDate + "</p>"
                                        ),
                                        $('<td>', { align: "center" }).append(
                                            "<button type='button' onclick='showFileModal(\"" + attachmentModel.Path + "\" , \"" + attachmentModel.Type + "\")' class='btn btn-dark p-0' style='border: 0px; border-radius: 50%; width: 25px; height: 25px; margin-right: 1px;'><i class='fa fa-eye'></i></button>",
                                            "<a href='" + downloadFile + " + " + attachmentModel.Id + "' class='btn btn-dark' style='border: 0px; border-radius: 50%; width: 25px; height: 25px;'><i class='fa fa-download' style='display: block; margin-top: -4px; margin-left: -7.5px;'></i></button>",
                                            "<button type='button' id='" + attachmentModel.Id + "' class='btn btn-dark p-0 drawingSettingsDeleteButton' data-bs-toggle='modal' data-bs-target='#areYouSureModal' style='border: 0px; border-radius: 50%; width: 25px; height: 25px; margin-left: 1px;'><i class='fa fa-trash-can'></i></button>"
                                        )
                                    ),
                                );
                            }

                            // Drawing Settings Delete Button [Click Function]
                            $(".drawingSettingsDeleteButton").on('click', function () {
                                objectIdToBeDeleted = $(this).attr('id');
                                objectTypeToBeDeleted = "attachment";
                                deleteThisWhichAttachment = "drawingSettings";

                                $("#drawingSettingsModal").modal("hide");
                            });

                        },
                        error: function (error) {
                            alert("error!");
                            console.log(error.responseText);
                        }
                    });
                }
                else {
                    var attachmentIds = currentDrawingSettings.AttachmentIds.split(',');
                    for (let id in attachmentIds) {
                        $.ajax({
                            type: "GET",
                            url: fileController.Detail,
                            data: { fileId: attachmentIds[id] },
                            success: function (response) {
                                attachmentModel = jQuery.parseJSON(response);

                                if (attachmentModel != "") {
                                    var uploadedDate = attachmentModel.CreatedDate.split('T')[0];
                                    $("#dsmAttachmentTable").children('tbody').append(
                                        $('<tr>').append(
                                            $('<td>', { align: "center" }).append(
                                                "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.Name + "'>" + attachmentModel.Name + "</p>"
                                            ),
                                            $('<td>', { align: "center" }).append(
                                                "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.Type + "'>" + attachmentModel.Type + "</p>"
                                            ),
                                            $('<td>', { align: "center" }).append(
                                                "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + attachmentModel.UploadedBy + "'>" + attachmentModel.UploadedBy + "</p>"
                                            ),
                                            $('<td>', { align: "center" }).append(
                                                "<p class='tableColumn' data-bs-toggle='tooltip' data-bs-placement='right' title='" + uploadedDate + "'>" + uploadedDate + "</p>"
                                            ),
                                            $('<td>', { align: "center" }).append(
                                                "<button type='button' onclick='showFileModal(\"" + attachmentModel.Path + "\" , \"" + attachmentModel.Type + "\")' class='btn btn-dark p-0' style='border: 0px; border-radius: 50%; width: 25px; height: 25px; margin-right: 1px;'><i class='fa fa-eye'></i></button>",
                                                "<a href='" + downloadFile + " + " + attachmentModel.Id + "' class='btn btn-dark' style='border:0px; border-radius: 50%; width: 25px; height: 25px;'><i class='fa fa-download' style='display: block; margin-top: -4px; margin-left: -7.5px;'></i></button>",
                                                "<button type='button' id='" + attachmentModel.Id + "' class='btn btn-dark p-0 drawingSettingsDeleteButton' data-bs-toggle='modal' data-bs-target='#areYouSureModal' style='border: 0px; border-radius: 50%; width: 25px; height: 25px; margin-left: 1px;'><i class='fa fa-trash-can'></i></button>"
                                            )
                                        ),
                                    );

                                    // Drawing Settings Delete Button [Click Function]
                                    $(".drawingSettingsDeleteButton").on('click', function () {
                                        objectIdToBeDeleted = $(this).attr('id');
                                        objectTypeToBeDeleted = "attachment";
                                        deleteThisWhichAttachment = "drawingSettings";

                                        $("#drawingSettingsModal").modal("hide");
                                    });
                                }
                                else {
                                    $("#dsmAttachmentTable").children('tbody').append(
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
                    }
                }
            }
            else {
                $("#dsmAttachmentTable").children('tbody').append(
                    $('<tr>').append(
                        $('<td>', { colspan: "5", class: "text-center" }).append("No data available to show!")
                    )
                );
            }
            // #endregion
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
}

// NavBar ---> Display PartialViews
$("#dsmNav a").on('click', function () {
    var info = $(this).html();
    info = info.replace(/\s+/g, '');

    switch (info) {
        case 'Data':
            loadDrawingSettingsDataPage();
            $("#btnDsmSave").removeAttr("hidden");
            break;

        case 'Attachment':
            loadDrawingSettingsAttachmentPage();
            $("#btnDsmSave").attr("hidden", "");
            break;

        default:
            break;
    }
})