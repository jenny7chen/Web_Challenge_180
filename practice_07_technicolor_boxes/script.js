$(document).ready(function(){
  $(".box").mouseenter(function(){
    $(this).css("background-color", randomColor());
    $(this).css("z-index", "10000");
    $(this).css("box-shadow", "0 0 8px white");
  });

  $(".box").mouseleave(function(){
    $(this).css("z-index", 1);
    $(this).css("box-shadow", "none");
  });

  function randomColor(){
    return '#' + Math.random().toString(16).slice(2, 8);
  }
});
