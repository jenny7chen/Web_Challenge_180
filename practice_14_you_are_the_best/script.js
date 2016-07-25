$(document).ready(function(){
  var goodArray = ["你真是好棒棒", "真是天才", "可以拜你為師嗎？",
  "也許你應該出國比賽", "全台灣兩千三百萬人都驚呆了！", "太強了！假的！一定是我眼睛業障重", "給你一個好寶寶貼紙！",
  "唉 既生瑜，何生亮呢？這次我是輸了", "聽見了嗎？窗外的風兒都在為你歡呼", "可以幫我簽名嗎？", "大大，等您飛黃騰達了務必拉我一把啊！",
  "看得我都餓了", "嚇的我午餐都掉地上了", "寶寶覺得厲害，但寶寶不說"];

  function getRandomPhrase(){
    return goodArray[Math.floor(Math.random() * goodArray.length)];
  }

  $("#input_form").submit(function(event){
    event.preventDefault();
    $("#answer").text("你 " + $("#input").val() + "?");
    $("#reply").text(getRandomPhrase());
  });

  $('#input').focus();
});
