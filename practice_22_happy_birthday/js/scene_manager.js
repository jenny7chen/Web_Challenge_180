var playerId;

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
  if(scene == 1){
    var data = createScene();
    var ctx = data[0];
    var canvas = data[1];
    startScene1(ctx, canvas);
  }
  else if(scene == 2){
    startScene2();
  }
  registerEvent();
}

function clearScene(){
  var container = document.getElementById("scene_container");
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
}

function onSceneEnd(sceneNumber){
  clearScene();
  if(sceneNumber == 1){
    loadScene(2);
  }else if(sceneNumber == 2){
    stopMusic();
  }
}
