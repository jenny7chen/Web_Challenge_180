function startSceneEnd(){
  var timerId = 0;

  $("#scene_container").append("<div class=\"start_area\"></div>");
  $(".start_area").css("background-color", "black");
  var hintText = document.createElement("h1");
  $(hintText).text("THE END");
  $(hintText).css("margin-top", "300px");
  $(hintText).css("color", "white");
  $(".start_area").append(hintText);

  var endText = document.createElement("h3");
  $(endText).css("color", "white");
  $(endText).css("margin", "auto");
  $(endText).css("text-align", "center");
  $(endText).css("width", "500px");
  $(".start_area").append(endText);
  var endStory = ["遊戲製作:Starfalling", "美術:Starfalling", "音效:Youtube免費音效庫/小森平的免費音效", "一起想梗:二哥/醬油菜花"];
  var congrat = "Hi 劍破~祝你生日快樂唷~感謝你平常對我們這麼好~~送你一個遊戲玩一玩!!拼命做了三四天幸好來得及, 二哥也一起幫忙想梗完成了這個遊戲~還有幫忙看遊戲內容的希爾跟菜花~希望你喜歡拉~~";
  var currentIndex = -1;

  timerId = setInterval(function(){
    if(currentIndex == endStory.length - 1){
      clearInterval(timerId);
      currentIndex = -1;
      if(playerId == "劍破天下"){
        $(endText).text(congrat);
      }else{
        $(endText).text("Thanks");
      }
      return;
    }
    currentIndex++;
    $(endText).text(endStory[currentIndex]);
  }, 3500);
}
