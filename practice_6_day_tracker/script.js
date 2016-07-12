$(document).ready(function(){
  resetDayColor();
  setTodayColor();
});

function resetDayColor(){
  $(".weekday").css("color", "black");
}

function setTodayColor(){
  var date = new Date();
  var weekday = date.getDay();
  $("#" + weekday).addClass("today");
  var todayText = $("#" + weekday).text();
  $("#result").text("It's " + todayText + "!");
}
