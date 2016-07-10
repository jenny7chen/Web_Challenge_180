$(document).ready(function(){
  var currentColor;

  $(".palette_element").click(function(){
    currentColor = $(this).css("background-color");
  });

  $(".box").click(function(){
    $(this).css("background-color", currentColor);
  });
});
