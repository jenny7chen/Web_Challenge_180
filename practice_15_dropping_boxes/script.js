$(document).ready(function(){
  // jQuery.getScript("../js/animate.js");
  //import animate.js : already import in html
  //Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.

  //use animationEndListener to listen to the animationEnd
  var listener = new AnimationListener();
  listener.onAnimationEnd = function(){
    console.log("do something in callback");
  }

  var animationArray = ["crawl", "dangle", "bling"];

  $(".box").click(function(){
    animateCss($(this), getRandAnimation(animationArray), listener);
  });
});
