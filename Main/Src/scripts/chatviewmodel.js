
// Chat Models
function chatMessage(sender, date, message) {
    var self = this;
    self.sender = ko.observable(sender);
    self.date = ko.observable(date);
    self.message = ko.observable(message);
}

// Chat viewmodels
function chatViewModel(socket) {
    var self = this;
    self.messages = ko.observableArray([
        new chatMessage("Jawahar", formatTime($.now()), "Hi there sdfsdasd asd as d asd asd as d  as d asd asd as dasd as das d a"),
        new chatMessage("Suresh", formatTime($.now()), "Hi there"),
        new chatMessage("Jawahar", formatTime($.now()), "Hi there sdfsdasd asd as d asd asd as d  as d asd asd as dasd as das d a"),
        new chatMessage("Suresh", formatTime($.now()), "Hi there"),
        new chatMessage("Jawahar", formatTime($.now()), "Hi there sdfsdasd asd as d asd asd as d  as d asd asd as dasd as das d a"),
        new chatMessage("Suresh", formatTime($.now()), "Hi there")
    ]);
    self.title = ko.observable("Chat Room");
    self.websocket = socket;
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