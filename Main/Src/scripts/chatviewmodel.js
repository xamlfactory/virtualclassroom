
// Chat viewmodels
function chatViewModel(socket, currentuser) {
    var self = this;

    self._socket = socket;
    self.currentUser = ko.observable(currentuser);
    self.messages = ko.observableArray();
    self.currentMessage = ko.observable("");
    self.messageColor = ko.observable();
    self.messageFontWeight = ko.observable();
    self.messageFontStyle = ko.observable();
    self.fontSizes = [
        6,
        7,
        8,
        9,
        10,
        12,
        14,
        16,
        18,
        20,
        25,
        30
    ];
    self.messageFontSize = ko.observable(12);

    self.sendMessage = function () {
        if (self.currentMessage()) {
            var messageData = {
                "sender": self.currentUser(),
                "message": self.currentMessage(),
                "time": formatTime($.now())
            };
            self._socket.send(JSON.stringify(messageData));
            self.currentMessage("");
        }
    }

    self.toggleBold = function () {
        if (self.messageFontWeight() == "bold") {
            self.messageFontWeight("normal");
        }
        else {
            self.messageFontWeight("bold");
        }
    }

    self.toggleItalic = function () {
        if (self.messageFontStyle() == "italic") {
            self.messageFontStyle("normal");
        }
        else {
            self.messageFontStyle("italic");
        }
    }

    self.onmessage = function (e) {
        var data = JSON.parse(e.data);
        var newMessage = new chatMessage(data.sender, data.time, data.message);
        self.messages.push(newMessage);
    }
}

// Helper methods
function formatTime(date) {
    var hours = new Date(date).getHours();
    var minutes = new Date(date).getMinutes();
    if (minutes.length == 1)
        minutes = minutes.toString().replace(minutes.toString().slice(0, 0), "0")
    if (hours > 12)
        hours = hours - 12;
    return hours + " : " + minutes + " PM";
}