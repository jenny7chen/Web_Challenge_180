$(document).ready(function(){
  var mouseX = 0;
  var mouseY = 0;
  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();

  $(document).on("mousemove", function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
    mouseX = e.pageX;
    mouseY = e.pageY;
  }, false);

  setInterval(function(){
    moveImage(mouseX, mouseY);
  }, 30);

  function moveImage(mouseX, mouseY){
    var pageX = mouseX - ($(window).width() / 2);
    var pageY = mouseY - ($(window).height() / 2);
    var newvalueX = width * pageX * -1 - 50;
    var newvalueY = height * pageY * -1 - 50;
    $('#image_container').css("background-position", newvalueX + "px " + newvalueY + "px");
  }

  var listener = new AnimationListener();
  listener.onAnimationEnd = function(){
    $("h1").css("top", "200px");
  }

  setTimeout(function(){
    animateCss($("h1"), "down_slow", listener);
  }, 1500);
});
