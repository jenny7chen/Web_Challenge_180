$(document).ready(function(){
  $('img').click(function(){
    var current = $(this).css('box-shadow');
    var a = current.split('px');
    var blur = a[a.length-3];
    var spread = a[a.length-2];
    var newBlur = parseInt(blur) + 1;
    var newSpread = parseInt(spread) + 3;
    $(this).css('box-shadow', 'rgb(77, 148, 255) 0px 0px ' + newBlur + 'px ' + newSpread + 'px');
    // $(this).css("box-shadow", getNewShadow(newBlur, newSpread));
  });

  $('.text_shadow').click(function(){
    var current = $(this).css('text-shadow');
    var a = current.split('px');
    var blur = a[a.length - 2];
    var verticalShadow = a[a.length - 3];
    var newBlur = parseInt(blur) + 1;
    var newVert = parseInt(verticalShadow) + 1;
    $(this).css('text-shadow', 'rgb(77, 148, 255) 1px ' + newVert + 'px ' + newBlur + 'px');
  });
});
