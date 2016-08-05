// Game objects
function Hero(){
  this.speed = 256; // movement in pixels per second
  this.x = 0;
  this.y = 0;
}

var goTop = 0;
var goDown = 1;
var goLeft = 2;
var goRight = 3;

function getCharacterAction(){
  if (38 in keysDown) { // Player holding up
    return goTop;
    // hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    // hero.y += hero.speed * modifier;
    return goDown;
  }
  if (37 in keysDown) { // Player holding left
    // hero.x -= hero.speed * modifier;
    return goLeft;
  }
  if (39 in keysDown) { // Player holding right
    // hero.x += hero.speed * modifier;
    return goRight;
  }
}
