$(document).ready(function(){
  var imagePrefix = "../image/dice/";
  var imageAfterFix = ".png";
  var imageArray = ["dice1", "dice2", "dice3", "dice4", "dice5", "dice6"];

  function getRandomDice(){
    return Math.floor(Math.random() * 6);
  }

  $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass(animationName).one(animationEnd, function() {
                $(this).removeClass(animationName);
                showResult();
            });
        }
    });

  function showResult(){
    var dice1 = getRandomDice();
    var dice2 = getRandomDice();
    $("#dice1").attr("src", imagePrefix + imageArray[dice1] + imageAfterFix);
    $("#dice2").attr("src", imagePrefix + imageArray[dice2] + imageAfterFix);
  }

  $("#shake_button").click(function(){
    $("#shake").animateCss("move");
  });
});
