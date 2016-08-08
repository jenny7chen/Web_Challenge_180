function startScene5(ctx, canvas){
  var timerId = 0;
  var story = ["你終於破門而入", "骨爾丹，在房間裡遠遠坐著打盹的就是他", "啊！好耀眼！", "小坑第一帥的稱號在他身上不斷散發著：我超帥的氣息"];
  var you = "";
  var guldan = "";
  var say = [
    "骨爾丹！給我出來！骨爾丹！", "做啥打擾我睡午覺，你誰啊？怎麼在我家！",
    "別說了骨爾丹快把東西交出來", "蛤，交什麼？",
    "當然是稱號啊！", "我這是天生麗質，不可能給你哈哈哈",
    "...大大算我拜託你", "你要這做蛇麼？",
    "唉說來話長，總之是我實在太帥了只能搭配這稱號", "滾",
    "好啦大大別降，怎樣你才肯還我", "我什麼都肯做",
    "好拔，那我出五個題目，答對就給你", "耶逼"];
    var currentSay = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    var currentStoryText = 0;
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
        ctx.drawImage(Scene5.monsterImage, monster.x, monster.y, 120, 150);
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
      if(you != ""){
        ctx.font = "30px Helvetica";
        ctx.fillText(you, 100, 270);
      }
      if(guldan != ""){
        ctx.font = "30px Helvetica";
        ctx.fillText(guldan, 100, 270);
      }
    }
    // Reset the game when the player catches a monster
    Scene5.reset = function () {
      hero.x = 0;
      hero.y = (canvas.height / 2);

      monster.x = 700;
      monster.y = 470;
    }
    Scene5.update = function(modifier){
      var action = getCharacterAction();
      if(!canMove){
        return;
      }
      if(action == goTop){
        hero.y -= hero.speed * modifier;
        Scene5.heroImage.src = "../image/character/kai_jump.png";
      }else if(action == goDown){
        hero.y += hero.speed * modifier;
        Scene5.heroImage.src = "../image/character/kai_idle.png";
      }else if(action == goLeft){
        hero.x -= hero.speed * modifier;
        Scene5.heroImage.src = "../image/character/kai_left.png";
      }else if(action == goRight){
        hero.x += hero.speed * modifier;
        Scene5.heroImage.src = "../image/character/kai_right.png";
      }else if(action == idle){
        Scene5.heroImage.src = "../image/character/kai_idle.png";
      }

      if(hero.y > (canvas.height / 2)){
        hero.y = (canvas.height / 2);
      }else if(hero.y < 0){
        hero.y = 0;
      }

      if(hero.x < -30){
        hero.x = -30;
      }else if(hero.x > 850){
        hero.x = 850;
      }

      if(end && hero.x == 850){
        onSceneEnd(3);
        cancelAnimationFrame(windowReqId);
        sceneEnd = true;
        return;
      }
      if(!end){
        if(
          ((hero.y + 220) >= monster.y) && (((hero.x + 180 >= monster.x + 20) && (hero.x + 180 <= monster.x + 80))||((hero.x <= monster.x + 80) && (hero.x >= monster.x + 20))||(hero.x <= monster.x && (hero.x +180) >= (monster.x + 20)))
        ) {


        }
      }

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
      Scene5.monsterImage.src = "../image/character/treasure.png";
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

      Scene5.update(delta / 800);
      Scene5.render();

      then = now;

      // Request to do this again ASAP
      if(!sceneEnd){
        windowReqId = requestAnimationFrame(Scene5.main);
      }
    };
    Scene5.start();

    timerId = setInterval(function(){
      if(currentStoryText == story.length - 1){
        clearInterval(timerId);
        currentStoryText = -1;
        canMove = true;
        return;
      }
      currentStoryText++;
    }, 3500);
  }
