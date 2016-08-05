function Scene(ctx, canvas){
  this.ctx = ctx;
  this.canvas = canvas;
  this.sceneNumber = 0;
  this.start = function(){
    console.log("start");
  }
  this.stop = function(){
    console.log("stop");
  }
}

function createScene(){
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 800;
  canvas.style.display= 'block';
  $("#scene_container").append(canvas);
  return [ctx, canvas];
}

function loadScene(scene){
  var data = createScene();
  var ctx = data[0];
  var canvas = data[1];
  startScene1(ctx, canvas);
  registerEvent();
}

$(document).ready(function(){
  var sceneCount = 5;
  loadScene(1);
});

//   function drawImageScaled(img, ctx) {
//    var canvas = ctx.canvas ;
//    var hRatio = canvas.width  / img.width    ;
//    var vRatio =  canvas.height / img.height  ;
//    var ratio  = Math.min ( hRatio, vRatio );
//    var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
//    var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
//    ctx.clearRect(0,0,canvas.width, canvas.height);
//    ctx.drawImage(img, 0,0, img.width, img.height,
//                       centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
// }
