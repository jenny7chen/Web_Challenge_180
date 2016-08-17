var next = "html/next1.html";
var home = "index.html";
function setNextPage(nextPage){
  next = nextPage;
  home = "../index.html"
}

$(document).ready(function(){
  var complements = ["棒！", "太神啦！", "尼好像有點厲害", "你豪棒！", "膩害！"];
  var win = false;
  var start = false;
  $(".start").mouseenter(function(){
    if(win == true){
      return;
    }
    start = true;
    $(".end").mouseenter(function(){
      if(!start){
        return;
      }
      win = true;
      start = false;
      $("#hint").text(complements[randomInt(0, complements.length - 1)]);
      $("#next_button").css("display", "inline-block");
      $("#restart_button").css("display", "inline-block");
    });

    $("#game_container").mouseleave(function(){
      start = false;
      if(win == false){
        $("#hint").text("再試一次拔！");
      }
    });
  });

  $("#next_button").click(function(){
    // similar behavior as an HTTP redirect
    window.location.replace(next);
    // similar behavior as clicking on a link
    // window.location.href = "http://stackoverflow.com";
  });

  $("#restart_button").click(function(){
    window.location.replace(home);
  });
});
