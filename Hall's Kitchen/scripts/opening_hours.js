var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var opening_hours = ["16:00 - 23:00", "16:00 - 23:00", "16:00 - 23:00", "16:00 - 23:00", "17:00 - 01:00", "17:00 - 01:00", "15:00 - 22:00"];

var ul = document.getElementById("opening_hours");

for (var i = 0; i < days.length; i++) {
    var element = document.createElement("li");
    element.appendChild(document.createTextNode(days[i] + ":  " + opening_hours[i]));
    ul.appendChild(element);    
}