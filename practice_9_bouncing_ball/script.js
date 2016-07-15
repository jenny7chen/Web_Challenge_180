//use jQuery animate to implement the bounce effect

$(document).ready(function(){
  var $ball = $("#ball");
  var $hintTitle = $("#hint_title");
  var $hintContainer = $("#hint_container");
  //must add $ to target element

  var startOffset = $("#ball").offset().top;
  var endOffset = startOffset + 400;
  var speed = 2000;
  var level = 0;
  var hintTitleArray = ["Good job!", "Great!", "Awesome!", "You're god!", "You're monster!", "Legendary"];
  var speedArray = [2000, 1800, 1000, 700, 500, 300];
  var gameStart = true;

  function startBounce(){
    if(gameStart){
      $ball.animate({top:endOffset}, speedArray[level], "swing", function(){
        $ball.animate({top:startOffset}, speedArray[level], function(){
            startBounce();
        });
      });
    }
  }

  function changeLevel(){
    gameStart = false;
    $ball.stop();
    $ball.hide();
    $hintTitle.text(hintTitleArray[level]);
    $hintContainer.show();
    level++;
  }

  function startNextLevel(){
    setTimeout(function(){
      gameStart = true;
      $hintContainer.hide();
      $ball.show();
      $ball.css("top", startOffset);
      startBounce();
    }, 2000);
  }

  $ball.click(function(){
    changeLevel();
    if(level < speedArray.length){
      startNextLevel();
    }else{
      $("#replay").show();
    }
  });

  $hintContainer.hide();
  startBounce();
});
