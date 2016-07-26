  function AnimationEndListener(){
    this.callback = function (animationName) {
      console.log(animationName);
    }
  }

  function animateCss($element, animationName, animationEndListener){
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $element.addClass(animationName).one(animationEnd, function(){
      $element.removeClass(animationName);
      animationEndListener.callback(animationName);
    });

  }
