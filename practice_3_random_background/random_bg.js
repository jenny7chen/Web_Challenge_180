$(document).ready(function(){

  $('div').click(function() {
    $('body').css('background', randomBg());
  });

  function randomBg() {
		return '#' + Math.random().toString(16).slice(2, 8);
	};
});
