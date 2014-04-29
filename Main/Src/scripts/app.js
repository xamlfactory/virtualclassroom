// Initialization...
$(document).ready(function () {
    var layoutOpts =
       {
           defaults: {
               applyDefaultStyles: false,
               closable: false,
               resizable: false,
               spacing_open: 0
           },
           north: {
               size: 50
           },
           east: {
               size: 300,
           },
           south: {
               size: 25
           }
       };
    $("#timer").countdown();

    var colors = [
        "aqua",
        "black",
        "blue",
        "lightblue",
        "darkblue",
        "fuchsia",
        "gray",
        "lightgray",
        "darkgray",
        "green",
        "lightgreen",
        "darkgreen",
        "lime",
        "maroon",
        "navy",
        "olive",
        "orange",
        "purple",
        "red",
        "pink",
        "silver",
        "teal",
        "white",
        "yellow",
    ];

    $("#color").colorpicker(
        {
            items: colors,
            selectedValue: "black",
            target: $("#chatMessageArea"),
            targetProperty: "color"
        });

    $("#submit").click(function () {
        if ($("#username").val().length > 0) {
            $("#usernameprompt").window("close");
            ko.applyBindings(new mainViewModel($("#username").val()));
        }
    })

    $("#usernameprompt").dialog();
})
