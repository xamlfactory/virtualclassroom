
// Chat Models
function chatMessage(sender, date, message) {
    var self = this;
    self.sender = ko.observable(sender);
    self.date = ko.observable(date);
    self.message = ko.observable(message);
}

// Chat viewmodels
function chatViewModel(socket, currentuser) {
    var self = this;

    self._socket = socket;
    self.currentUser = ko.observable(currentuser);
    self.messages = ko.observableArray();
    self.currentMessage = ko.observable("");
    self.selectedColor = ko.observable("red");

    self.sendMessage = function () {
        if (self.currentMessage()) {
            self._socket.send(self.currentMessage());
            self.currentMessage("");
        }
    }

    self.onmessage = function (e) {
        var newMessage = new chatMessage(self.currentUser(), formatTime($.now()), e.data);
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