$(document).ready(function(){
  function addZero(time) {
    if(time < 10){
      time = "0" + time.toString();
    }
    return time;
  }
  function addZeroToColor(color) {
    if(color.length < 2){
      color = "0" + color.toString();
    }
    return color;
  }
  //add new function getTimeNow for Date
  Date.prototype.getTimeNow = function(){
    var time = addZero(this.getHours()) + ":" + addZero(this.getMinutes()) + ":" + addZero(this.getSeconds());
    return time;
  }

  function getCurrentColor(date){
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    //get color percentage of current time;
    red = Math.round(255 * (hour / 23)).toString(16);
    green = Math.round(255 * (minute / 59)).toString(16);
    blue = Math.round(255 * (second / 59)).toString(16);
    return "#" + addZeroToColor(red) + addZeroToColor(green) + addZeroToColor(blue);
  }

  function startClock(){
    var date = new Date();
    var time = date.getTimeNow();
    var color = getCurrentColor(date);
    $("#current_time").text(time);
    $("#current_color").text(color);
    $("body").css("background-color", color);

    setTimeout(function(){
      startClock();
    }, 1000);
  }

  startClock();
});
