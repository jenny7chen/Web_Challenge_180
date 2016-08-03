$(document).ready(function(){
  var last_step = 1;
  function goToByScroll(id){
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1500);
  }

  $("#start_text").click(function(){
    $("#last_step").show();
    goToByScroll("#question_block");
  });

  $(".button").click(function(){
    var inputName = $(this).attr("id");
    inputName = inputName.replace("#", "");
    inputName = inputName.replace("_button", "");
    var checked = $("input[name=" + inputName + "]:checked", "#form").val();
    last_step = inputName.replace("q", "");
    goToByScroll("#q" + checked + "_block");
  });

  $(".back_button").click(function(){
    last_step = 1;
    $("#last_step").hide();
    $('html, body').animate({
      scrollTop: 0
    }, 1500);
  });

  $("#last_step").click(function(){
    goToByScroll("#q" + last_step + "_block");
  });

  $("#last_step").hide();
});
