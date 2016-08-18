$(document).ready(function(){
  var running = false;
  var sec  = 0;
  var min  = 0;
  var hour = 0;

  $("#start").click(function(){
    start();
  });

  $("#stop").click(function(){
    if(!running){
      return;
    }
    stop();
  });

  $("#reset").click(function(){
    reset();
  });

  function start(){
    if(!running){
      $("#start").addClass("b_disabled");
      $('#start').attr("disabled", true);
      running = true;
      startTime = new Date();
      updateDigits();
    }
  }

  function stop(){
    $("#start").removeClass("b_disabled");
    $('#start').attr("disabled", false);
    running = false;
  }

  function reset(){
    running = false;
    $("#start").removeClass("b_disabled");
    $('#start').attr("disabled", false);
    sec = 0;
    min = 0;
    hour = 0;
    $("#n1").text("00");
    $("#n2").text("00");
    $("#n3").text("00");
  }

  function updateDigits(){
    setTimeout(function(){
      if(running){
        sec++;
        if (sec == 60) {
          sec = 0;
          min += 1;
        }
        if (min == 60) {
          min = 0;
          hour += 1
        }
        var displayH = hour < 10 ? "0" + hour : hour;
        var displayM = min < 10 ? "0" + min : min;
        var displayS = sec < 10 ? "0" + sec : sec;
        $("#n1").text("" + displayH);
        $("#n2").text("" + displayM);
        $("#n3").text("" + displayS);
        updateDigits();
      }
    }, 1000);
  }
});
