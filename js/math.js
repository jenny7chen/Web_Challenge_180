function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
};
