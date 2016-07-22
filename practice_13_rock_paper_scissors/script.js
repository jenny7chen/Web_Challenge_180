$(document).ready(function(){
  var choices = ["rock", "paper", "scissors"];
  var imagePrefix = "../image/";
  var images = ["rock.png", "paper.png", "scissors.png"];
  var choice = "rock";
  $.fn.extend({
    animateHand: function(animationName){
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass(animationName).one(animationEnd, function() {
        $(this).removeClass(animationName);
        showResult();
      });
    }
  });

  function getComputerChoice(){
    return Math.floor(Math.random() * 3);
  }

  function compare(choice1, choice2){
    var result;
    if(choice1 + choice2 == 2){
      if(choice1 > choice2){
        result = -1;
      }else{
        result = 1;
      }
    }else if(choice1 == choice2){
      return 0;

    }else{
      if(choice1 > choice2){
        result = 1;
      }else{
        result = -1;
      }
    }
    return result;
  }

  function showResult(){
    var computerChoice = getComputerChoice();
    var showResult;
    var result = compare(choice, computerChoice);
    if(result == 0){
      showResult = "Tie!";
    }else if(result == -1){
      showResult = "You lose!";
    }else{
      showResult = "You win!";
    }
    $("#result_text").text(showResult);
    $("#left_hand").attr("src", imagePrefix + images[computerChoice]);
    $("#right_hand").attr("src", imagePrefix + images[choice]);
  }

  $(".button").click(function(){
    choice = choices.indexOf($(this).attr("id"));
    $("img").animateHand("move");
  });
});
