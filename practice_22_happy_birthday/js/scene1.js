function startScene1(ctx, canvas){
  var timerId = 0;
  var story = ["簡單講就是有一天, 小坑第一帥的頭銜被邪惡的燃搔軍團搶走了", "頭銜被藏在骨爾丹的家", "身為強大的玩家, 接下來你應該知道要怎麼做了吧!", "看你大概是不知道,快速講講", "上下左右鍵控制你的人物, 與物品互動可以用空白鍵, 就降", "別想逃走啊 拉G", "Go"];
  var warning = "";
  var pass = "";
  var warningCount = 0;
  var currentStoryText = 0;
  // Game objects
  var hero = new Hero();
  var monster = {
    x: 0,
    y: 0
  };
  var monstersCaught = 0;
  var then;
  var Scene1 = new Scene(ctx, canvas);
  Scene1.bgReady = false;
  Scene1.heroReady = false;
  Scene1.monsterReady = false;
  Scene1.floorReady = false;
  Scene1.bgImage = new Image();
  Scene1.heroImage = new Image();
  Scene1.monsterImage = new Image();
  Scene1.floor;
  Scene1.sceneNumber = 1;
  Scene1.render = function(){
    if (this.bgReady) {
      ctx.drawImage(Scene1.bgImage, 0, 0, Scene1.bgImage.width, Scene1.bgImage.height, 0, 0, canvas.width, canvas.height);
    }

    if (this.heroReady) {
      ctx.drawImage(Scene1.heroImage, hero.x, hero.y, 180, 220);
    }

    if(this.floorReady){
      ctx.drawImage(Scene1.floor, 0, 600, canvas.width, 10);
    }
    if (this.monsterReady) {
      ctx.drawImage(Scene1.monsterImage, monster.x, monster.y, 70, 70);
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
    if(warning != ""){
      ctx.font = "30px Helvetica";
      ctx.fillText(warning, 100, 270);
    }
    if(pass != ""){
      ctx.font = "30px Helvetica";
      ctx.fillText(pass, 100, 270);
    }
  }
  // Reset the game when the player catches a monster
  Scene1.reset = function () {
    hero.x = 0;
    hero.y = (canvas.height / 2);

    // Throw the monster somewhere on the screen randomly
    monster.x = 300;
    monster.y = 32 + 500;
  }
  Scene1.update = function(modifier){
    var action = getCharacterAction();
    if(!canMove){
      return;
    }
    if(action == goTop){
      hero.y -= hero.speed * modifier;
      Scene1.heroImage.src = "../image/character/kai_jump.png";
    }else if(action == goDown){
      hero.y += hero.speed * modifier;
      Scene1.heroImage.src = "../image/character/kai_idle.png";
    }else if(action == goLeft){
      hero.x -= hero.speed * modifier;
      Scene1.heroImage.src = "../image/character/kai_left.png";
    }else if(action == goRight){
      hero.x += hero.speed * modifier;
      Scene1.heroImage.src = "../image/character/kai_right.png";
    }else if(action == idle){
      Scene1.heroImage.src = "../image/character/kai_idle.png";
    }

    if(hero.y > (canvas.height / 2)){
      hero.y = (canvas.height / 2);
    }else if(hero.y < 0){
      hero.y = 0;
    }

    if(hero.x < -30){
      hero.x = -30;
    }else if(hero.x > 750){
      hero.x = 750;
    }


    if (
      ((hero.y + 220) >= monster.y) && (((hero.x + 180 >= monster.x + 52) && (hero.x + 180 <= monster.x + 70))||((hero.x <= monster.x + 32) && (hero.x >= monster.x))||(hero.x <= monster.x && (hero.x +180) >= (monster.x + 70)))
    ) {
      Scene1.reset();
      if(warningCount > 3){
        canMove = false;
        warning = "你被星星刺死了, 聽不懂ㄇ"
        setTimeout(function(){
          pass = "看你這麼笨, 給你過好了";
          setTimeout(function(){
            onSceneEnd(1);
          }, 2000);
        }, 2000);
      }else{
        warning = "你被星星刺死了"
      }
      warningCount++;
      setTimeout(function(){
        warning = "";
      }, 2000);
    }
  }
  Scene1.start = function(){
    Scene1.bgImage = new Image();
    Scene1.floor = new Image();
    Scene1.heroImage = new Image();
    Scene1.monsterImage = new Image();
    Scene1.heroImage.className = "hero";

    Scene1.heroImage.onload = function () {
      Scene1.heroReady = true;
    };
    Scene1.monsterImage.onload = function () {
      Scene1.monsterReady = true;
    };
    Scene1.bgImage.onload = function () {
      Scene1.bgReady = true;
    };
    Scene1.floor.onload = function () {
      Scene1.floorReady = true;
    };

    Scene1.heroImage.src = "../image/character/kai_idle.png";
    Scene1.monsterImage.src = "../image/character/star.png";
    Scene1.bgImage.src = "../image/character/bg.png";
    Scene1.floor.src = "../image/character/floor.png";

    then = Date.now();
    Scene1.reset();
    Scene1.main();
  };
  // The main game loop
  Scene1.main = function () {
    var now = Date.now();
    var delta = now - then;

    Scene1.update(delta / 800);
    Scene1.render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(Scene1.main);
  };
  Scene1.start();

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
