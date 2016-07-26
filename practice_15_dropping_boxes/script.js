$(document).ready(function(){

  // jQuery.getScript("animate.js");
  // //Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.
  // var animationEndListener = new AnimationEndListener();
  // $(".box").click(function(){
  //   animateCss($(this), "crawl", animationEndListener);
  // });

  $.fn.extend({
    animateCss: function(animationName){
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass(animationName).one(animationEnd, function(){
        $(this).removeClass(animationName);
      });
    }
  });

  $(".box").click(function(){
    $(this).animateCss("crawl");
  });
});
