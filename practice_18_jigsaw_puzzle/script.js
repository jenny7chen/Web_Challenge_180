$(document).ready(function(){
  var puzzles = ["pie_p"];
  var puzzleWidth = [3];
  var currentPuzzle = 0;

  function makePuzzle(index){
    var puzzleCount = puzzleWidth[index] * puzzleWidth[index];
    var puzzle = [];
    for(var i = 0; i < puzzleCount; i++){
      var piece = puzzles[index] + (i + 1);
      puzzle[i] = piece;
    }
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
      div.classList.add(puzzles[index] + (i + 1));

      var id = puzzle[i];
      image.id = id;
      image.classList.add(id);
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
      snapTolerance: 15,
      snapMode: "inner",
      containment: "window",
      start: function(){
        $(this).parent().addClass("lastPlace");
        // $(this).addClass("active");
      },
      stop: function(){
        $(this).parent().removeClass("lastPlace");
      }
    });

    $(".piece_container").droppable({
      drop:function(event, ui){
        var child = $(this).children().last().detach();
        child.appendTo($(".lastPlace"));
        child.attr("style","");
        child.css("position", "absolute");
        $(".lastPlace").removeClass("lastPlace");

        var dropped = ui.draggable.detach();
        dropped.detach().appendTo($(this));
        dropped.attr("style","");
        //reset the coordinate with reset style or it will be put in the wrong position

        dropped.css("position", "absolute");
        dropped.css("z-index", 0);
        dropped.removeClass("active");

        checkMatch();
      },
      tolerance: "fit"
    });
  }

  function checkMatch(){
    var match = 0;
    $('.piece_container').each(function(i, obj) {
      var child = obj.childNodes[0];
      if(obj.classList.contains(child.id)){
        match++;
      }
    });
    var width = puzzleWidth[currentPuzzle];
    var count = width * width;
    if(match == count){
      $("h1").text("All match! Congratulations!");
    }
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

  currentPuzzle = 0;
  var puzzle = makePuzzle(0);
  putPuzzle(puzzle, 0);

});
