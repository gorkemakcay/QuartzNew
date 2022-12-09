//const { fromUserCoordinate } = require("ol/proj"); // [bu ne? nereden geldi?]

// #region List Panel's createList() Function
function createList() {
    // #region Get All Links From DB & Display On The List Panel As A Button
    $("#shapeArea").children().remove();

    $.ajax({
        async: false,
        type: "GET",
        url: linkController.Link.List,
        data: { mainDrawingSettingsId: currentQuartzLink.DrawingSettingsId },
        success: function (response) {
            var allLinks = jQuery.parseJSON(response);

            if (allLinks.length != 0) {
                $("#shapeArea").append(`
                    <div class="row" style="height: 20px;"></div>
                    <span class='btn listPanelHeader py-0' style="margin-bottom: 5px;"><strong>Links</i></strong></span>
                `);

                // #region Create Link Buttons
                allLinks.forEach(function (link) {
                    var linkButton = `<button id="` + link.Id + `" name="link" type="button" class="btn listPanelButtons linkButton"><span class="float-start m-1 px-3"><i class="fa fa-link"></i>&nbsp; ` + link.TagNo + `</span></button>`;

                    $("#shapeArea").append(linkButton);
                })
                // #endregion
            }
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
    // #endregion

    // #region Get All Items From DB & Display On The List Panel As A Button
    $.ajax({
        async: false,
        type: "GET",
        url: itemController.Item.List,
        data: { drawingSettingsId: currentQuartzLink.DrawingSettingsId },
        success: function (response) {
            var allItems = jQuery.parseJSON(response);

            if (allItems.length != 0) {
                $("#shapeArea").append(`
                    <span class='btn listPanelHeader py-0' style="margin-top: 20px; margin-bottom: 5px;"><strong>Items</strong></span>
                `);

                // #region Create Item Buttons
                allItems.forEach(function (item) {
                    var itemButton = `<button id ="` + item.Id + `" name="item" type="button" class="btn listPanelButtons itemButton"><span class="float-start m-1 px-3"><i class="fa fa-tags"></i>&nbsp; ` + item.TagNo + `</span></button>`;

                    $("#shapeArea").append(itemButton);
                });
                // #endregion
            }


        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
    // #endregion

    // #region Link & Item Button's On Click Functions
    function wait() {
        $(".linkButton").on('dblclick', function () {
            $("#clickedLinkMode").attr("hidden", "");
            $("#createdLinkMode").removeAttr("hidden");
            loadLinkModal();
            $("#linkModal").modal('show');
        });

        $(".linkButton").on('click', function () {
            $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
            lastClickedLinkButtonId = $(this).attr('id');
            clickedOrCreated = "clicked";

            $.ajax({
                type: "GET",
                url: linkController.Link.Detail,
                data: { linkId: lastClickedLinkButtonId },
                success: function (response) {
                    lastClickedLink = jQuery.parseJSON(response);

                    source.getFeatures().forEach(function (feature) {
                        if (feature.get("Id") == lastClickedLink.Id && feature.get("Type") == "link") {
                            select.getFeatures().clear();
                            select.getFeatures().push(feature);
                            selectedFeature = select.getFeatures().item(0);

                            view.animate({
                                center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                zoom: 4,
                                duration: 500
                            });
                        }
                    });

                    //if (lastClickedLink.DrawingSettingsId != 1) {
                    //    $("#createdLinkMode").attr("hidden", "");
                    //    $("#clickedLinkMode").removeAttr("hidden");
                    //}
                    //else {
                    //    $("#createdLinkMode").removeAttr("hidden");
                    //    $("#clickedLinkMode").attr("hidden", "");
                    //}

                    //addLinkUploadDrawingArea = false;
                    //document.getElementById("AddLinkUploadDrawingArea").setAttribute("hidden", "");
                    //document.getElementById("AddLinkUploadDrawingAreaCreatedMode").setAttribute("hidden", "");
                    //$("#addLinkSelectDrawing").removeAttr("disabled");

                    /*loadLinkModal();*/
                },
                error: function (error) {
                    alert("error!");
                    console.log(error.responseText);
                }
            });
        });

        $(".itemButton").on('dblclick', function () {
            $("#itemModal").modal('show');
            loadItemModalHomePage();
        });

        $(".itemButton").on('click', function () {
            $("#" + lastClickedButtonId + "").removeAttr('style', 'background: #808080');
            lastClickedItemButtonId = $(this).attr('id');
            clickedOrCreated = "clicked";

            $.ajax({
                type: "GET",
                url: itemController.Item.Detail,
                data: { itemId: lastClickedItemButtonId },
                success: function (response) {
                    lastClickedItem = jQuery.parseJSON(response);

                    source.getFeatures().forEach(function (feature) {
                        if (feature.get("Id") == lastClickedItem.Id && feature.get("Type") == "item") {
                            select.getFeatures().clear();
                            select.getFeatures().push(feature);
                            selectedFeature = select.getFeatures().item(0);

                            view.animate({
                                center: new ol.proj.fromLonLat(feature.get("LonLat")),
                                zoom: 4,
                                duration: 500
                            });
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
    setTimeout(wait, 200);
    // #endregion
}
// #endregion

