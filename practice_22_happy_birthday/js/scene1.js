function startScene1(ctx, canvas){
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
  Scene1.bgImage = new Image();
  Scene1.heroImage = new Image();
  Scene1.monsterImage = new Image();
  Scene1.sceneNumber = 1;
  Scene1.render = function(){
    if (this.bgReady) {
      ctx.drawImage(Scene1.bgImage, 0, 0, Scene1.bgImage.width, Scene1.bgImage.height, 0, 0, canvas.width, canvas.height);
    }

    if (this.heroReady) {
      ctx.drawImage(Scene1.heroImage, hero.x, hero.y);
    }

    if (this.monsterReady) {
      ctx.drawImage(Scene1.monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
  }
  // Reset the game when the player catches a monster
  Scene1.reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
  }
  Scene1.update = function(modifier){
    var action = getCharacterAction();
    if(action == goTop){
      hero.y -= hero.speed * modifier;
    }else if(action == goDown){
      hero.y += hero.speed * modifier;
    }else if(action == goLeft){
      hero.x -= hero.speed * modifier;
    }else if(action == goRight){
      hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
      hero.x <= (monster.x + 32)
      && monster.x <= (hero.x + 32)
      && hero.y <= (monster.y + 32)
      && monster.y <= (hero.y + 32)
    ) {
      ++monstersCaught;
      Scene1.reset();
    }
  }
  Scene1.start = function(){
    // var ctx = this.ctx;
    // var canvas = this.canvas;
    // Background image
    // var bgReady = false;
    // var heroReady = false;
    // var monsterReady = false;
    Scene1.bgImage = new Image();
    Scene1.heroImage = new Image();
    Scene1.monsterImage = new Image();

    Scene1.heroImage.onload = function () {
      Scene1.heroReady = true;
    };
    Scene1.monsterImage.onload = function () {
      Scene1.monsterReady = true;
    };
    Scene1.bgImage.onload = function () {
      Scene1.bgReady = true;
    };
    Scene1.heroImage.src = "../image/door/green_door.png";
    Scene1.monsterImage.src = "../image/door/orange_door.png";
    Scene1.bgImage.src = "../image/beautiful_view.jpg";

    then = Date.now();
    Scene1.reset();
    Scene1.main();
  };
  // The main game loop
  Scene1.main = function () {
    var now = Date.now();
    var delta = now - then;

    Scene1.update(delta / 1000);
    Scene1.render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(Scene1.main);
  };
  Scene1.start();
}
