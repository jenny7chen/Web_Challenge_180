$(document).ready(function(){
  var listener = new AnimationListener();
  listener.onAnimationEnd = function(){
    console.log("do something in callback");
  }
  var animationArray = ["tada", "spin"];

  $(document).click(function(event){
    var rand = randomInt(0, 40);
    var colorClass = "color" + rand;
    var children = $("#container").children();
    var hasClass;
    for(var i = 0; i < children.length; i++){
      if($(children[i]).hasClass(colorClass)){

        //add $() to make children[i] a jquery object
        hasClass = true;
        break;
      }
    }
    if(!hasClass){
      $("#container").append("<div class=\"drop " + colorClass + "\"></div>");
    }
    $("." + colorClass).css( {top: event.pageY, left: event.pageX, backgroundColor: randomColor() });
    animateCss($("." + colorClass), getRandAnimation(animationArray), listener);
  });
});
