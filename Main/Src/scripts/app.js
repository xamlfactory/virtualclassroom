
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
    $('body').layout(layoutOpts);
    $('.button').button();
    $('#selectable').selectable();
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

function user(name, id) {
    var self = this;
    self.name = ko.observable(name);
    self.id = ko.observable(id);
}

// main viewmodel
function mainViewModel(username) {
    var self = this;
    var start = new Date();

    // connect to server
    var url = "ws://localhost:8181/";
    var websocket = new WebSocket(url + username);

    self.chatViewModel = ko.observable(new chatViewModel(websocket, username));
    self.users = ko.observableArray();
    self.time = ko.observable();
    self.recipients = ko.computed(function () {
        if (self.users().length > 0) {
            var reps = self.users();
            reps.slice(0, 0, new user("All", "all"));
            return reps;
        }
    }, this);

    websocket.onmessage = function (e) {
        if (e.data == "newuser") {
            getUsers();
        }
        else {
            self.chatViewModel().onmessage(e);
        }
    }

    websocket.onopen = function () {
        websocket.send("newuser");
    }

    function getUsers() {
        getData("Server/Services/classroomservice.asmx/GetAllUsers",
        function (data, status, xhr) {
            self.users.removeAll();
            var users = [];
            $.each(data.d, function (index, value) {
                users.push(new user(value.Name, value.Id));
            });
            self.users(users);
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
