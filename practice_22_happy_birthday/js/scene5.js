function startScene5(ctx, canvas){
  var timerId = 0;
  var story = ["你終於破門而入", "骨爾丹，在房間裡遠遠坐著打盹的就是他", "啊！好耀眼！", "小坑第一帥的稱號在他身上不斷散發著：我超帥的氣息"];
  var you = "";
  var guldan = "";
  var say = [
    "骨爾丹！給我出來！骨爾丹！", "做啥打擾我睡午覺，你誰啊？",
    "別說了骨爾丹快把東西交出來", "蛤，交什麼？",
    "當然是稱號啊！", "不要雷哈哈哈",
    "...大大算我拜託你", "你要這做蛇麼？",
    "唉說來話長，總之是我實在太帥了只能搭配這稱號", "滾",
    "好啦大大別降，怎樣你才肯還我", "我什麼都肯做",
    "好拔，那我出五個題目，答對就給你", "耶逼"];
    var currentSay = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0];
    var currentSayIndex = -1;
    var currentStoryText = 0;
    var endGuldanSay = ["沒想到你能猜出所有的答案...", "真是既生瑜何生亮阿...", "好吧, 頭銜你拿去吧", "我去睡午覺了估掰"];
    var endHeroSay = ["啊哈哈哈哈!我贏啦!!", "我成為小坑第一帥啦!!!!"];
    var endIndex = 0;
    var endCurrentSay = 1;
    var warning = "";
    var end = false;
    var sceneEnd = false;
    // Game objects
    var hero = new Hero();
    var monster = {
      x: 0,
      y: 0
    };
    var then;
    var Scene5 = new Scene(ctx, canvas);
    Scene5.bgReady = false;
    Scene5.heroReady = false;
    Scene5.monsterReady = false;
    Scene5.floorReady = false;
    Scene5.bgImage = new Image();
    Scene5.heroImage = new Image();
    Scene5.monsterImage = new Image();
    Scene5.floor;
    Scene5.sceneNumber = 5;
    Scene5.render = function(){
      if (this.bgReady) {
        ctx.drawImage(Scene5.bgImage, 0, 0, Scene5.bgImage.width, Scene5.bgImage.height, 0, 0, canvas.width, canvas.height);
      }

      if (this.heroReady) {
        ctx.drawImage(Scene5.heroImage, hero.x, hero.y, 180, 220);
      }

      if(this.floorReady){
        ctx.drawImage(Scene5.floor, 0, 600, canvas.width, 10);
      }

      if (!end && this.monsterReady) {
        ctx.drawImage(Scene5.monsterImage, monster.x, monster.y, 180, 220);
      }

      // Score
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.font = "50px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(playerId, 32, 32);
      if(currentStoryText != -1){
        ctx.font = "30px Helvetica";
        ctx.fillText(story[currentStoryText], 100, 270);
      }

      if(currentSayIndex != -1 && currentSayIndex < say.length){
        if(currentSay[currentSayIndex] == 0){
          ctx.font = "30px Helvetica";
          ctx.fillText(say[currentSayIndex], 100, 270);

        }else{
          ctx.font = "30px Helvetica";
          ctx.fillText(say[currentSayIndex], 500, 270);
        }
      }

      if(end && endIndex != -1){
        if(endCurrentSay == 0){
          ctx.font = "30px Helvetica";
          ctx.fillText(endHeroSay[endIndex], 100, 270);
        }else{
          ctx.font = "30px Helvetica";
          ctx.fillText(endGuldanSay[endIndex], 500, 270);
        }
      }

      if(warning != ""){
        ctx.font = "30px Helvetica";
        ctx.fillText(warning, 300, 270);
      }
    }
    // Reset the game when the player catches a monster
    Scene5.reset = function () {
      hero.x = 0;
      hero.y = (canvas.height / 2);

      monster.x = 800;
      monster.y = (canvas.height / 2);
    }
    Scene5.start = function(){
      Scene5.bgImage = new Image();
      Scene5.floor = new Image();
      Scene5.heroImage = new Image();
      Scene5.monsterImage = new Image();
      Scene5.heroImage.className = "hero";

      Scene5.heroImage.onload = function () {
        Scene5.heroReady = true;
      };
      Scene5.monsterImage.onload = function () {
        Scene5.monsterReady = true;
      };
      Scene5.bgImage.onload = function () {
        Scene5.bgReady = true;
      };
      Scene5.floor.onload = function () {
        Scene5.floorReady = true;
      };

      Scene5.heroImage.src = "../image/character/kai_idle.png";
      Scene5.monsterImage.src = "../image/character/guldan.png";
      Scene5.bgImage.src = "../image/character/bg.png";
      Scene5.floor.src = "../image/character/floor.png";
      then = Date.now();
      Scene5.reset();
      Scene5.main();
    };
    // The main game loop
    Scene5.main = function () {
      var now = Date.now();
      var delta = now - then;

      // Scene5.update(delta / 800);
      Scene5.render();

      then = now;

      // Request to do this again ASAP
      if(!sceneEnd){
        windowReqId = requestAnimationFrame(Scene5.main);
      }
    };
    Scene5.start();

    var qContent = ["獅子、狼、熊，哪一隻的牙齒最好?", "請問氧氣跟二氧化碳哪個比較美", "電風.雲火.暴雨哪一匹馬最瘦?", "請問紅豆、綠豆、黃豆哪一種豆子很貴?", "蝴蝶, 螞蟻, 蜘蛛, 蜈蚣, 哪一個沒有領到酬勞?"];
    var aContent = [["獅子", "狼", "熊"],["氧氣", "二氧化碳"], ["雲火", "電風", "暴雨"], ["紅豆", "綠豆", "黃豆"], ["蝴蝶", "螞蟻", "蜘蛛", "蜈蚣"]];
    var aIndexArray = [1, 0, 1, 0, 3];

    Scene5.startQuestion = function(index){
      var content = qContent[index];
      var option = aContent[index];
      $("#dialog").remove();
      $("#dialog_content").remove();
      var dialog = document.createElement("div");
      var dialogContent = document.createElement("h3");
      dialog.id = "dialog";
      dialog.className = "success-dialog";
      dialogContent.id = "dialog_content";
      dialogContent.textContent = content;
      dialog.appendChild(dialogContent);
      var buttonOption = [];

      //use this to prevent i always changed when click problem
      for (var j=0; j<option.length; j++) {
        (function(i) {
          buttonOption.push({click: function() {
            $(this).dialog("close");
            checkAnswer(index, i);
          },
          text:option[i]});
        })(j);
      }

      var dialogOpts = {
        title : "問題" + (index+1),
        draggable : false,
        modal : true,
        open: function(event, ui) {
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        },
        closeOnEscape : false,
        autoOpen : false
      };
      $("#scene_container").append(dialog);
      var theDialog = $( "#dialog" ).dialog(dialogOpts);
      theDialog.dialog( "option", "buttons", buttonOption);
      theDialog.dialog( "open" );
    }

    function checkAnswer(index, aIndex){
      if(aIndexArray[index] == aIndex){
        if(index + 1 == qContent.length){
          ending();
        }else{
          Scene5.startQuestion((index+1));
        }
      }else{
        warning = "哈哈答錯了笨蛋!"
        setTimeout(function(){
          warning = "";
        }, 2000);
        Scene5.startQuestion(index);
      }
    }

    function ending(){
      end = true;
      endCurrentSay = 1;
      timerId = setInterval(function(){
        endIndex++;
        if(endIndex == endGuldanSay.length - 1){
          clearInterval(timerId);
          endIndex = -1;

          timerId = setInterval(function(){
            endIndex++;
            endCurrentSay = 0;
            if(endIndex == endHeroSay.length - 1){
              clearInterval(timerId);
              endIndex = -1;
              warning = "從此小坑第一帥" + playerId + "過著幸福快樂的日子";
              setTimeout(function(){
                onSceneEnd(5);
                cancelAnimationFrame(windowReqId);
                sceneEnd = true;
              }, 3000);
              return;
            }
          }, 2000);
          return;
        }
      }, 2000);
    }

    Scene5.setSay = function(){
      timerId = setInterval(function(){
        currentSayIndex++;
        if(currentSayIndex == say.length - 1){
          clearInterval(timerId);
          currentSayIndex = -1;
          Scene5.startQuestion(0);
          return;
        }
      }, 2500);
    }

    timerId = setInterval(function(){
      if(currentStoryText == story.length - 1){
        clearInterval(timerId);
        currentStoryText = -1;
        Scene5.setSay();
        return;
      }
      currentStoryText++;
    }, 2500);
  }
