$(document).ready(function(){
  var win = false;
  $(".start").mouseenter(function(){
    $(".end").mouseenter(function(){
      win = true;
      $("h1").text("Good!");
    });

    $("#game_container").mouseleave(function(){
      if(win == false){
        $("h1").text("You lose!");
      }
    });
  });
});
