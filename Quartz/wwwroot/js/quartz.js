//const { Button } = require("../lib/bootstrap/dist/js/bootstrap.esm");

function loadQuartz() {
    // #region Elements of Quartz
    select = new ol.interaction.Select({
        condition: ol.events.condition.click,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(0, 152, 254, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0098FE',
                width: 2
            }),
            text: new ol.style.Text({
                text: '',
                scale: 1.3,
                overflow: true
            })
        })
    });

    selectPM = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgb(0, 152, 254, 0.1)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0098FE',
                width: 1
            }),
            text: new ol.style.Text({
                text: '',
                scale: 1.3,
                overflow: true
            })
        })
    });

    translate = new ol.interaction.Translate({
        features: select.getFeatures(),
        //condition: ol.events.condition.platformModifierKeyOnly
    });

    modify = new ol.interaction.Modify({
        features: select.getFeatures(),
    });

    projection = new ol.proj.Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: extent,
    });

    //rasterLayer = new ol.layer.Tile({
    //    source: new ol.source.OSM(),
    //});

    source = new ol.source.Vector({
        format: new ol.format.GeoJSON()
    });

    vectorLayer = new ol.layer.Vector({
        source: source
    });

    view = new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        zoom: 2,
        maxZoom: 5,
        minZoom: 2,
        extent: viewExtent
        //extent: [-1200, -778, 3120, 2134]
    });

    imageUrl = "/home/get?path=" + currentDrawing.Path;

    imageLayer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: imageUrl,
            projection: projection,
            imageExtent: extent,
        }),
    });

    map = new ol.Map({
        interactions: ol.interaction.defaults({ doubleClickZoom: false }).extend([]),
        layers: [imageLayer, vectorLayer],
        target: 'map',
        view: view
    });

    ////////////////////////////////////////////////// trial area



    ////////////////////////////////////////////////// trial area

    map.on('dblclick', function (evt) {
        if (typeSelect.value != 'MoveAndModify') {
            map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

                if (feature.get("Type") == "item") {
                    $.ajax({
                        type: "GET",
                        url: itemController.Item.Detail,
                        data: { itemId: feature.get("Id") },
                        success: function (response) {
                            lastClickedItem = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";
                            $("#itemModal").modal('show');
                            loadItemModalHomePage();
                        }
                    });
                }

                if (feature.get("Type") == "link") {
                    $.ajax({
                        type: "GET",
                        url: linkController.Link.Detail,
                        data: { linkId: feature.get("Id") },
                        success: function (response) {
                            lastClickedLink = jQuery.parseJSON(response);
                            clickedOrCreated = "clicked";

                            if (lastClickedLink.DrawingSettingsId == 1) {
                                $("#linkModal").modal('show');
                                $("#createdLinkMode").removeAttr("hidden");
                                $("#clickedLinkMode").attr("hidden", "");

                                addLinkUploadDrawingArea = false;
                                document.getElementById("AddLinkUploadDrawingArea").setAttribute("hidden", "");
                                document.getElementById("AddLinkUploadDrawingAreaCreatedMode").setAttribute("hidden", "");
                                $("#addLinkSelectDrawing").removeAttr("disabled");

                                loadLinkModal();
                            }
                            else {
                                currentQuartzLink = lastClickedLink;
                                $.ajax({
                                    type: "GET",
                                    url: linkController.DrawingSettings.Detail,
                                    data: { drawingSettingsId: currentQuartzLink.DrawingSettingsId },
                                    success: function (response) {
                                        currentDrawingSettings = jQuery.parseJSON(response);

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
                                                        $.ajax({
                                                            type: "GET",
                                                            url: linkController.QuartzPartialView,
                                                            success: function (html) {
                                                                $("#main").children().remove();
                                                                $("#main").html(html);

                                                                loadQuartz();

                                                                crumbCount++;
                                                                $(".breadCrumb").append(
                                                                    $('<li>', {
                                                                        text: currentDrawingSettings.DrawingNo,
                                                                        value: crumbCount,
                                                                        onclick: "goDrawing(" + currentQuartzLink.Id + " , " + 0 + " ," + crumbCount + ")",
                                                                        class: "crumb"
                                                                    })
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
                        }
                    });
                }
            });
        }
    });
    // #endregion

    // #region Loading Spinner
    map.on('loadstart', function () {
        map.getTargetElement().classList.add('spinner');
    });
    map.on('loadend', function () {
        map.getTargetElement().classList.remove('spinner');
    });
    // #endregion

    // #region Tıklanan Feature'a ait buton'un işaretlenmesi
    map.on('click', function (evt) {
        this.forEachFeatureAtPixel(evt.pixel, function (f) {
            selectedFeature = f;

            var linkButtons = $("[name='link']");
            var itemButtons = $("[name='item']");

            createList();

            // seçilen feature'ın id'sini ve type'ını değişkene ata
            var buttonId = selectedFeature.get('Id');
            var buttonType = selectedFeature.get('Type');

            // null check
            if (buttonId != null && buttonType != null) {
                //$("#" + lastClickedButtonId + "").removeAttr('style', 'background: #5494b1');
                lastClickedButtonId = buttonId;
                var buttons;
                var buttonBackground;
                if (buttonType == "item") {
                    buttons = $("[name='item']");
                    buttonBackground = "background: #c67610; font-weight: 700;";
                }

                if (buttonType == "link") {
                    buttons = $("[name='link']");
                    buttonBackground = "background: #5493af; font-weight: 700;";
                }

                function wait() {
                    for (var i = 0; i < buttons.length; i++) {
                        if (buttons[i].getAttribute('Id') == buttonId) {
                            buttons[i].setAttribute('style', buttonBackground);
                            return;
                        }
                    }
                }
                setTimeout(wait, 100);
            }
        });
    });
    // #endregion

    addFeatureToSource();

    interactionSettings();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////// [FUNCTIONS]

    createList();

    function interactionSettings() {
        if (typeSelect.value == 'None') {
            document.getElementById('main').style.cursor = 'grab';
            map.removeInteraction(draw);
            map.removeInteraction(translate);
            map.removeInteraction(modify);

            map.addInteraction(select);
            map.addInteraction(selectPM);
        }

        if (typeSelect.value == 'BoxItem' || typeSelect.value == 'BoxLink' || typeSelect.value == 'PolygonItem' || typeSelect.value == 'PolygonLink') {
            document.getElementById('main').style.cursor = 'crosshair';
            map.removeInteraction(selectPM);
            map.removeInteraction(select);
            map.removeInteraction(translate);
            map.removeInteraction(modify);
            map.removeInteraction(draw);

            if (typeSelect.value == 'BoxItem' || typeSelect.value == 'BoxLink') {
                draw = new ol.interaction.Draw({
                    source: source,
                    type: 'Circle',
                    geometryFunction: ol.interaction.Draw.createBox()
                });
            }

            if (typeSelect.value == 'PolygonItem' || typeSelect.value == 'PolygonLink') {
                draw = new ol.interaction.Draw({
                    source: source,
                    type: 'Polygon'
                });
            }

            map.addInteraction(draw);

            // #region Feature "drawend" Function   
            draw.on("drawend", function (evt) {
                map.addInteraction(select);

                // #region Create LonLat For Feature's Set LonLat Property
                selectedFeature = evt.feature;
                var featuresExtent = selectedFeature.getGeometry().getExtent();
                var featuresGetCenter = ol.extent.getCenter(featuresExtent);
                featuresLonLat = ol.proj.toLonLat(featuresGetCenter);
                // #endregion

                // #region Add QuartzLink to DB
                if (typeSelect.value == 'BoxLink' || typeSelect.value == 'PolygonLink') {
                    linkIdCount++;
                    linkId = "Link - " + Math.floor(Math.random() * 1000);
                    shapeId = linkId;

                    var linkModel = {
                        TagNo: shapeId,
                        ShowLabel: false,
                        CreatedDate: getDate(),
                        CreatedBy: loginUserInfo.FullName,
                        MainDrawingSettingsId: currentQuartzLink.DrawingSettingsId,
                        DrawingSettingsId: 1
                    };

                    $.ajax({
                        type: "POST",
                        url: linkController.Link.Add,
                        data: { model: linkModel },
                        success: function (response) {
                            lastCreatedLink = jQuery.parseJSON(response);
                            clickedOrCreated = "created";
                            getVectorSource();

                            // #region Feature Set Properties
                            evt.feature.setProperties({ 'LonLat': featuresLonLat });
                            evt.feature.setProperties({ 'Id': lastCreatedLink.Id });
                            evt.feature.setProperties({ 'Name': lastCreatedLink.TagNo });
                            evt.feature.setProperties({ 'Type': "link" });
                            evt.feature.setProperties({ 'ShowLabel': lastCreatedLink.ShowLabel });

                            setTimeout(addDrawingFeaturesJSON, 100);

                            // #endregion

                            // #region Link Modal Settings
                            $("#clickedLinkMode").attr("hidden", "");
                            $("#createdLinkMode").removeAttr("hidden");
                            addLinkUploadDrawingAreaCreatedMode = false;
                            document.getElementById("AddLinkUploadDrawingArea").setAttribute("hidden", "");
                            document.getElementById("AddLinkUploadDrawingAreaCreatedMode").setAttribute("hidden", "");
                            $("#addLinkSelectDrawing").removeAttr("disabled");

                            $("#linkModal").modal('show');
                            $("#addLinkTagNo").val(lastCreatedLink.TagNo);
                            $("#linkShowLabel").prop('checked', false);

                            loadLinkModal();
                            // #endregion

                            toast("Link Add Successful!");
                        },
                        error: function (error) {
                            alert("error: link doesn't saved!");
                        }
                    });
                }
                // #endregion

                // #region Add QuartzItem to DB
                if (typeSelect.value == 'BoxItem' || typeSelect.value == 'PolygonItem') {
                    itemIdCount++;
                    itemId = "Item - " + Math.floor(Math.random() * 1000);
                    shapeId = itemId;

                    var itemModel = {
                        TagNo: shapeId,
                        CreatedDate: getDate(),
                        CreatedBy: loginUserInfo.FullName,
                        ShowLabel: false,
                        IsInspected: 0,
                        DrawingSettingsId: currentQuartzLink.DrawingSettingsId
                    };

                    $.ajax({
                        type: "POST",
                        url: itemController.Item.Add,
                        data: { model: itemModel },
                        success: function (response) {
                            lastCreatedItem = jQuery.parseJSON(response);
                            clickedOrCreated = "created";
                            //isInformationCreated = false;

                            var itemInformationAddModel = {
                                TagNo: lastCreatedItem.TagNo,
                                QuartzItemId: lastCreatedItem.Id
                            }

                            $.ajax({
                                type: "POST",
                                url: itemController.Information.Add,
                                data: { model: itemInformationAddModel },
                                error: function (error) {
                                    alert("error!");
                                    console.log(error.responseText);
                                }
                            });

                            isInformationCreated = true;
                            getVectorSource();

                            // #region Feature Set Properties
                            evt.feature.setProperties({ 'LonLat': featuresLonLat });
                            evt.feature.setProperties({ 'Id': lastCreatedItem.Id });
                            evt.feature.setProperties({ 'Name': lastCreatedItem.TagNo });
                            evt.feature.setProperties({ 'Type': "item" });
                            evt.feature.setProperties({ 'ShowLabel': lastCreatedItem.ShowLabel });

                            setTimeout(addDrawingFeaturesJSON, 100);
                            // #endregion

                            // #region Item Modal Settings
                            $("#itemModal").modal('show');
                            loadItemModalHomePage();
                            // #endregion

                            toast("Item Add Successful!");
                        },
                        error: function (error) {
                            alert("error: item doesn't saved!");
                        }
                    });
                }
                // #endregion

                function waitFunc() {
                    typeSelect.value = 'None';
                    map.removeInteraction(draw);
                    map.removeInteraction(translate);
                    map.removeInteraction(modify);

                    map.addInteraction(select);
                    map.addInteraction(selectPM);

                    //$("#shapeArea").children().remove();
                    createList();
                    // Load Spinner Yap! [TAMAMLANMADI]
                }
                setTimeout(waitFunc, 100);
                document.getElementById('main').style.cursor = 'grab';
            });
            // #endregion
        }

        if (typeSelect.value == 'MoveAndModify') {
            document.getElementById('main').style.cursor = 'grab';
            map.removeInteraction(draw);
            map.removeInteraction(selectPM);

            map.addInteraction(select);
            map.addInteraction(translate);
            map.addInteraction(modify);
        }
    }

    function addDrawingFeaturesJSON() {
        // list all current features's details (geoJSON format)

        if (currentDrawingFeatures == 0) {
            var json = new ol.format.GeoJSON().writeFeatures(vectorLayer.getSource().getFeatures(), {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            var drawingFeaturesAddModel = {
                Features: json,
                DrawingSettingsId: currentQuartzLink.DrawingSettingsId
            };

            $.ajax({
                type: "POST",
                url: linkController.DrawingFeatures.Add,
                data: { model: drawingFeaturesAddModel },
                success: function () {
                    getVectorSource();
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        }
        else updateDrawingFeatures();

    }

    translate.on('translateend', function (evt) {
        var featuresExtent = selectedFeature.getGeometry().getExtent();
        var featuresGetCenter = ol.extent.getCenter(featuresExtent);
        featuresLonLat = ol.proj.toLonLat(featuresGetCenter);
        selectedFeature.setProperties({ 'LonLat': featuresLonLat });

        updateDrawingFeatures();
    });

    modify.on('modifyend', function (evt) {
        var featuresExtent = selectedFeature.getGeometry().getExtent();
        var featuresGetCenter = ol.extent.getCenter(featuresExtent);
        featuresLonLat = ol.proj.toLonLat(featuresGetCenter);
        selectedFeature.setProperties({ 'LonLat': featuresLonLat });

        updateDrawingFeatures();
    });

    $("#type").on('change', function () {
        interactionSettings();
    });

    loadQuartzSuccess = true;
    return 1;
}

function refreshQuartz() {
    $.ajax({
        type: "GET",
        url: linkController.QuartzPartialView,
        success: function (html) {
            //$("#shapeArea").children().remove();
            createList();

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