$(document).ready(function(){
  $("#scene_container").append("<div class=\"start_area\"></div>");
  $(".start_area").append("<h1 class=\"start\">邪惡的小遊戲</h1>");
  $(".start_area").append("<input type=\"text\" id=\"id\" placeholder=\"在此輸入你的遊戲ID\" autofocus></input>");

  $(".start_area").append("<div id=\"start\" class=\"start\"><h3 id=\"start_text\">開始</h3></div>");
  $("#start_text").click(function(){
    var id = $("#id").val();
    if(id == ""){
      return;
    }
    playerId = id;
    clearScene();
    var sceneCount = 5;
    loadScene(1);
  });
});
