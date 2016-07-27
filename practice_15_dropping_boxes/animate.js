  function AnimationListener(){
    this.onAnimationEnd = function (animationName) {
      console.log("AnimationEnd: " + animationName);
    }
    this.onAnimationStart = function(animationName){
      console.log("AnimationStart: " + animationName);
    }
  }

  function animateCss($element, animationName, animationListener){
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    animationListener.onAnimationStart(animationName);
    $element.addClass(animationName).one(animationEnd, function(){
      $element.removeClass(animationName);
      animationListener.onAnimationEnd(animationName);
    });
  }

  function getRandAnimation(animationArray){
    var randInt = Math.round((Math.random() * (animationArray.length - 1)) + 0);
    return animationArray[randInt];
  }
