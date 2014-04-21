
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
               size: 20
           }
       };
    $('body').layout(layoutOpts);

    $('#usernameprompt').dialog({
        modal: true, buttons: {
            "Submit": function () {
                if ($("#username").val().length > 0) {
                    ko.applyBindings(new mainViewModel($("#username").val()));
                    $(this).dialog("close");
                }
            }
        }
    });
})

function user(name) {
    var self = this;
    self.name = name;
}

// main viewmodel
function mainViewModel(username) {
    var self = this;

    // connect to server
    var url = "ws://localhost:8181/";
    var websocket = new WebSocket(url + username);

    self.chatViewModel = ko.observable(new chatViewModel(websocket));
    self.users = ko.observableArray();

    websocket.onopen = function () {
        getData("Server/Services/classroomservice.asmx/GetAllUsers",
        function (data) {
            $.each(data.d, function (index, value) {
                self.users.push($.parseJSON(value));
            });
        },
        function (error) {
            var err = error;
        });
    }
}

function getData(url, onsucess, onerror) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onsucess,
        error: onerror
    });
}
