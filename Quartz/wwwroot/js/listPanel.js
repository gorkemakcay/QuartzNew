﻿//const { fromUserCoordinate } = require("ol/proj"); // [bu ne? nereden geldi?]

// #region List Panel's createList() Function
function createList() {
    // #region Get All Links From DB & Display On The List Panel As A Button
    $("#shapeArea").children().remove();

    $.ajax({
        type: "GET",
        url: linkController.Link.List,
        data: { mainLinkId: currentQuartzLink.Id },
        success: function (response) {
            allLinks = jQuery.parseJSON(response);

            // #region Create Link Buttons
            allLinks.forEach(function (link) {
                var linkButton = $("<button id=" + link.Id + " name='link' type='button' class='btn text-dark listPanelButtons linkButton'><strong><i class='fa fa-link'></i>&nbsp;" + link.TagNo + "</strong></button>");

                $("#shapeArea").append(linkButton);
            })
            // #endregion
        },
        error: function (error) {
            alert("error!");
            console.log(error.responseText);
        }
    });
    // #endregion

    // #region Get All Items From DB & Display On The List Panel As A Button
    $.ajax({
        type: "GET",
        url: itemController.Item.List,
        data: { linkId: currentQuartzLink.Id },
        success: function (response) {
            allItems = jQuery.parseJSON(response);

            // #region Create Item Buttons
            allItems.forEach(function (item) {
                var itemButton = $("<button id=" + item.Id + " name='item' type='button' class='btn text-dark listPanelButtons itemButton'><strong><i class='fa fa-tags'></i>&nbsp;" + item.TagNo + "</strong></button>");

                $("#shapeArea").append(itemButton);
            });
            // #endregion
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

                    if (lastClickedLink.CurrentDrawingId != 0) {
                        $("#createdLinkMode").attr("hidden", "");
                        $("#clickedLinkMode").removeAttr("hidden");
                    }
                    else {
                        $("#createdLinkMode").removeAttr("hidden");
                        $("#clickedLinkMode").attr("hidden", "");
                    }

                    addLinkUploadDrawingArea = false;
                    document.getElementById("AddLinkUploadDrawingArea").setAttribute("hidden", "");
                    document.getElementById("AddLinkUploadDrawingAreaCreatedMode").setAttribute("hidden", "");
                    $("#addLinkSelectDrawing").removeAttr("disabled");

                    loadLinkModal();
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

