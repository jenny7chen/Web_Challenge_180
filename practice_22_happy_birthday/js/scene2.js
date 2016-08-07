function startScene2(){
  var story = ["...", "通過了星星的考驗之後,", "走阿走, 你來到了你的裝備倉庫", "俗話說:工欲善其事, 必先利其器", "要打骨爾丹沒有裝備怎麼可以", "但很不幸的你倉庫的門有設密碼鎖", "密碼是什麼呢?"];
  var hintText = "提示:  我是什麼?";
  var currentStoryText = 1;
  var timerId = 0;
  var selector = document.createElement("div");
  selector.id = "selector";
  for(var i = 0; i < 4; i++){
    var input = document.createElement("input");
    input.id = "input" + i;
    input.className = "select_item";
    input.setAttribute("type", "number");
    input.setAttribute("min", 0);
    input.setAttribute("max", 9);
    input.setAttribute("step", 1);
    input.setAttribute("value", 0);
    selector.appendChild(input);
  }
  $("#scene_container").append("<div class=\"start_area\"></div>");

  var story_texts = document.createElement("h2");
  story_texts.id = "scene2_story";
  var hint = document.createElement("h2");
  hint.id = "scene2_hint";
  $(hint).text(hintText);

  $(".start_area").append(story_texts);
  $(story_texts).text(story[0]);

  timerId = setInterval(function(){
    if(currentStoryText == story.length - 1){
      clearInterval(timerId);
      currentStoryText = -1;
      $("#scene2_story").remove();
      $(".start_area").append(hint);
      $(".start_area").append(selector);
      $(".start_area").append("<div id=\"button\"><h3 id=\"button_text\">確定</h3></div>");
      $("#button_text").click(function(){
        if(isPass()){
          $("#button_text").off("click");
          startSoundEffect("correct_answer", false);
          setTimeout(function(){
            onSceneEnd(2);
          }, 2000);

        }else{
          startSoundEffect("blip", true);
        }
      });
      return;
    }
    currentStoryText++;
    $(story_texts).text(story[currentStoryText]);
  }, 3500);

  function isPass(){
    var pass = [5, 4, 8, 7];
    var correct = 0;
    for(var i = 0; i < 4; i++){
      if(pass[i] == $("#input" + i).val()){
        correct++;
      }
    }
    return (correct == 4);
  }
}
