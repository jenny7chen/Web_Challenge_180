$(document).ready(function(){
  //use this to detect css animation end
  $.fn.extend({
      animateCss: function (animationName) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          $(this).addClass(animationName).one(animationEnd, function() {
              $(this).removeClass(animationName);
          });
      }
  });

  var animations = ["move", "tada", "spin_back", "spin"];
  function getRandAnimation(){
    var randInt = Math.round((Math.random() * (animations.length - 1)) + 0);
    return animations[randInt];
  }

  $(".image").click(function(){
    var animation = getRandAnimation();
    $(this).animateCss(animation);
  });
});
