function startScene3(ctx, canvas){
  var timerId = 0;
  var story = ["拿完了武器, 粗花去骨爾丹的家囉", "路程大概有三千里路, 用走的也許會走很久", "看到一個寫著坐騎的寶箱, 感覺是好東西"];
  var warning = "";
  var pass = "";
  var currentStoryText = 0;
  var hasTurtle = false;
  var end = false;
  var resetTimes = 0;
  var resetMonsPosition = [500, 700, 300];
  // Game objects
  var hero = new Hero();
  var monster = {
    x: 0,
    y: 0
  };
  var monstersCaught = 0;
  var then;
  var Scene3 = new Scene(ctx, canvas);
  Scene3.bgReady = false;
  Scene3.heroReady = false;
  Scene3.monsterReady = false;
  Scene3.floorReady = false;
  Scene3.doorReady = false;
  Scene3.bgImage = new Image();
  Scene3.heroImage = new Image();
  Scene3.monsterImage = new Image();
  Scene3.doorImage = new Image();
  Scene3.floor;
  Scene3.sceneNumber = 3;
  Scene3.render = function(){
    if (this.bgReady) {
      ctx.drawImage(Scene3.bgImage, 0, 0, Scene3.bgImage.width, Scene3.bgImage.height, 0, 0, canvas.width, canvas.height);
    }

    if (this.heroReady) {
      ctx.drawImage(Scene3.heroImage, hero.x, hero.y, 180, 220);
    }

    if(this.floorReady){
      ctx.drawImage(Scene3.floor, 0, 600, canvas.width, 10);
    }

    if(end && this.doorReady){
      ctx.drawImage(Scene3.doorImage, 900, 500, 20, 100);
    }

    if (!hasTurtle && !end && this.monsterReady) {
      ctx.drawImage(Scene3.monsterImage, monster.x, monster.y, 120, 150);
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
  Scene3.reset = function () {
    hero.x = 0;
    hero.y = (canvas.height / 2);

    monsPosition = resetTimes % resetMonsPosition.length;
    monster.x = resetMonsPosition[monsPosition];
    monster.y = 470;
  }
  Scene3.update = function(modifier){
    var action = getCharacterAction();
    if(!canMove){
      return;
    }
    if(hasTurtle){
      hero.speed = 30;
    }else{
      hero.speed = 256;
    }
    if(!hasTurtle && action == goTop){
      hero.y -= hero.speed * modifier;
      Scene3.heroImage.src = "../image/character/kai_jump.png";
    }else if(action == goDown){
      hero.y += hero.speed * modifier;
      if(hasTurtle){
        Scene3.heroImage.src = "../image/character/kai_right_t.png";
      }else{
        Scene3.heroImage.src = "../image/character/kai_idle.png";
      }
    }else if(action == goLeft){
      hero.x -= hero.speed * modifier;
      if(hasTurtle){
        Scene3.heroImage.src = "../image/character/kai_left_t.png";
      }else{
        Scene3.heroImage.src = "../image/character/kai_left.png";
      }
    }else if(action == goRight){
      hero.x += hero.speed * modifier;
      if(hasTurtle){
        Scene3.heroImage.src = "../image/character/kai_right_t.png";
      }else{
        Scene3.heroImage.src = "../image/character/kai_right.png";
      }
    }else if(action == idle){
      Scene3.heroImage.src = "../image/character/kai_idle.png";
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

    if(!end && hero.x == 850){
      resetTimes++;
      Scene3.reset();

    }else if(end && hero.x == 850){
      onSceneEnd(3);
      cancelAnimationFrame(windowReqId);
    }
    if(!hasTurtle && !end){
      if(
        ((hero.y + 220) >= monster.y) && (((hero.x + 180 >= monster.x + 20) && (hero.x + 180 <= monster.x + 80))||((hero.x <= monster.x + 80) && (hero.x >= monster.x + 20))||(hero.x <= monster.x && (hero.x +180) >= (monster.x + 20)))
      ) {
        warning = "烏龜坐騎已加入你的收藏";
        hasTurtle = true;
        setTimeout(function(){
          warning = "";
        }, 1700);
        setTimeout(function(){
          $("#scene_container").append("<div id=\"leave_turtle_div\"><h2 id=\"leave_turtle\">離開烏龜坐騎</h2></div>");
          $("#leave_turtle").click(function(){
            var answer=confirm('你離開了烏龜烏龜會很傷心, 確定要離開嗎?');
            if(answer){
              hasTurtle = false;
              end = true;
              Scene3.reset();
              pass = "烏龜傷心的開了傳送門跑走了, 留下了往骨爾丹的家的傳送門";
              setTimeout(function(){
                pass = "烏龜坐騎已從你的收藏移除";
                setTimeout(function(){
                  pass = "";
                }, 2000);
              }, 2500);
              $("#leave_turtle_div").remove();
            }
            else{
              warning = "烏龜對你的決定感到非常安慰";
              setTimeout(function(){
                warning = "";
              }, 1700);
            }
          });
        }, 20000);
      }
    }
  }

  Scene3.start = function(){
    Scene3.bgImage = new Image();
    Scene3.floor = new Image();
    Scene3.heroImage = new Image();
    Scene3.monsterImage = new Image();
    Scene3.heroImage.className = "hero";

    Scene3.heroImage.onload = function () {
      Scene3.heroReady = true;
    };
    Scene3.monsterImage.onload = function () {
      Scene3.monsterReady = true;
    };
    Scene3.bgImage.onload = function () {
      Scene3.bgReady = true;
    };
    Scene3.floor.onload = function () {
      Scene3.floorReady = true;
    };

    Scene3.doorImage.onload = function(){
      Scene3.doorReady = true;
    }

    Scene3.heroImage.src = "../image/character/kai_idle.png";
    Scene3.monsterImage.src = "../image/character/treasure.png";
    Scene3.bgImage.src = "../image/character/bg.png";
    Scene3.floor.src = "../image/character/floor.png";
    Scene3.doorImage.src = "../image/door/blue_door.png";
    then = Date.now();
    Scene3.reset();
    Scene3.main();
  };
  // The main game loop
  Scene3.main = function () {
    var now = Date.now();
    var delta = now - then;

    Scene3.update(delta / 800);
    Scene3.render();

    then = now;

    // Request to do this again ASAP
    windowReqId = requestAnimationFrame(Scene3.main);
  };
  Scene3.start();

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
