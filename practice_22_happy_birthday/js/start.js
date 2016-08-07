var source;
var audio;
var sound;
$(document).ready(function(){
  $("#scene_container").append("<div class=\"start_area\"></div>");
  $(".start_area").append("<h1 class=\"start\">邪惡的小遊戲</h1>");
  $(".start_area").append("<input type=\"text\" id=\"id\" placeholder=\"在此輸入你的遊戲ID\" autofocus></input>");

  $(".start_area").append("<div id=\"button\" class=\"start\"><h3 id=\"button_text\">開始</h3></div>");
  $("#button_text").click(function(){
    var id = $("#id").val();
    if(id == ""){
      return;
    }
    playerId = id;
    clearScene();

    loadScene(1);
    appendAudio();
    startSoundEffect("ok", true);
    setTimeout(function(){
      setMusic("Rodeo_Show");
    }, 500);
  });
});

function appendAudio(){
  audio = document.createElement("audio");
  audio.setAttribute("autoplay", "autoplay");
  audio.setAttribute("preload", "none");
  audio.volume = 0.2;
  $("body").append(audio);
}

function stopMusic(){
  audio.pause();
  while (audio.hasChildNodes()) {
    audio.removeChild(audio.lastChild);
  }
  source.currentTime = 0;
}

function setMusic(newMusic){
  if(source != undefined && source.parendNode != undefined){
    audio.removeChild(sound);
  }
  source = document.createElement("source");
  source.src = "music/" + newMusic + ".mp3";
  source.setAttribute("type", "audio/mpeg");
  source.id = "source";
  audio.appendChild(source);
  audio.load();
}

function startSoundEffect(newMusic, autoStop){
  if(sound != undefined && sound.parendNode != undefined){
    sound.parendNode.removeChild(sound);
  }
  sound = document.createElement("source");
  sound.src = "music/" + newMusic + ".mp3";
  sound.id = "sound";
  sound.setAttribute("type", "audio/mpeg");
  audio.insertBefore(sound, audio.children[0]);
  audio.load();

  if(autoStop){
    setTimeout(function(){
      $("#sound").remove();
      if($("#source") != undefined){
        audio.load();
      }
    }, 500);
  }
}
