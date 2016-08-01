$(document).ready(function(){
  var puzzles = ["pie_p"];
  var puzzleWidth = [3];

  function getOriginalPuzzle(index){
    var puzzleCount = puzzleWidth[index] * puzzleWidth[index];
    var puzzle = [];
    for(var i = 0; i < puzzleCount; i++){
      var piece = puzzles[index] + (i + 1);
      puzzle[i] = piece;
    }
    return puzzle;
  }

  function makePuzzle(index){
    var puzzle = getOriginalPuzzle(index);
    shuffle(puzzle);
    return puzzle;
  }

  function initPuzzleElement(puzzle, index){
    var width = puzzleWidth[index];
    $("#puzzle_container").css("width", ("" + (width * 200) + "px"));
    $("#puzzle_container").css("height", ("" + (width * 200) + "px"));
    var count = (width * width);
    for(var i = 0; i < count; i++){
      var div = document.createElement('div');
      var container = document.createElement('div');
      var image = document.createElement('img');
      image.classList.add("piece");
      div.classList.add("piece_container");
      div.classList.add("" + i);

      var id = puzzles[index] + (i);
      image.id = id;
      image.setAttribute("src", "../image/puzzle/" + puzzle[i] + ".jpg");
      div.appendChild(image);
      $("#puzzle_container").append(div);
    }
  }

  function putPuzzle(puzzle, index){
    initPuzzleElement(puzzle, index);
    var $lastPlace;
    $(".piece").draggable({
      revert: "invalid",
      zIndex: 100,
      snap: true,
      snapTolerance: 40,
      snapMode: "inner",
      start: function(){
        $(this).parent().addClass("lastPlace");
        $(this).addClass("active");
      }
    });

    $(".piece_container").droppable({
      drop:function(event, ui){
        $(this).children().detach().appendTo($(".lastPlace"));
        console.log("the block move to = " + $(".lastPlace").prop("className"));
        $(".active").detach().appendTo($(this));
        $(".active").css("z-index", 0);
        $(".lastPlace").removeClass("lastPlace");
        $(".active").removeClass(".active");
      },
      // tolerance: 'intersect'
    });
  }

  /*Fisher-Yates (aka Knuth) Shuffle.
  See https://github.com/coolaj86/knuth-shuffle
  https://bost.ocks.org/mike/shuffle/*/
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  var puzzle = makePuzzle(0);
  putPuzzle(puzzle, 0);

});
