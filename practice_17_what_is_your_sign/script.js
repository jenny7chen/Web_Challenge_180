$(document).ready(function(){
  $.datepicker.regional['zh-TW']={
    dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
    dayNamesMin:["日","一","二","三","四","五","六"],
    monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    monthNamesShort:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    prevText:"上月",
    nextText:"次月",
    weekHeader:"週"
  };
  $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
  $("#datepicker").datepicker({dateFormat:"yy-mm-dd",showMonthAfterYear:true, firstDay:1, changeMonth:true, changeYear:true});

  function setSignText(birthday){
    var date = $("#datepicker").datepicker( "getDate" );
    var sign = getSign(date.getMonth(), date.getDay());
    var url = "http://widgets.fabulously40.com/horoscope.json?";
    $("#sign_name").text("Your sign is " + sign);
    url = url + "sign=" + sign;
    getTodayText(url);
  }

  function getTodayText(url){
    jQuery.get(url, function(res){
      ok(
        !!(res && res.responseText),
        'GET Request to Google.com succeeded!'
      );
      setTodayText(res.responseText);
      start();
    });
  }

  function setTodayText(responseText){
    responseText = responseText.replace("<html>", "");
    responseText = responseText.replace("</html>", "");
    responseText = responseText.replace("<body>", "");
    responseText = responseText.replace("</body>", "");
    responseText = responseText.replace("</head>", "");
    responseText = responseText.replace("<head/>", "");
    console.log(responseText);
    var json = jQuery.parseJSON(responseText)
    $("#sign_content").text(json.horoscope.horoscope);
  }

  $("#send").click(function(){
    var birthday = $("#datepicker").val();
    setSignText(birthday);
  });

  function getSign(month, day){
    var zod_signs = ["Capricorn" , "Aquarius", "Pisces", "Aries",
    "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius"];
    var zodiacSign = "";
    switch(month)
    {
      case 0: {//January
        if(day < 20)
        zodiacSign = zod_signs[0];
        else
        zodiacSign = zod_signs[1];
      }break;
      case 1: {//February
        if(day < 19)
        zodiacSign = zod_signs[1];
        else
        zodiacSign = zod_signs[2];
      }break;
      case 2: {//March
        if(day < 21)
        zodiacSign = zod_signs[2];
        else
        zodiacSign = zod_signs[3];
      }break;
      case 3: {//April
        if(day < 20)
        zodiacSign = zod_signs[3];
        else
        zodiacSign = zod_signs[4];
      }break;
      case 4: {//May
        if(day < 21)
        zodiacSign = zod_signs[4];
        else
        zodiacSign = zod_signs[5];
      }break;
      case 5: {//June
        if(day < 21)
        zodiacSign = zod_signs[5];
        else
        zodiacSign = zod_signs[6];
      }break;
      case 6: {//July
        if(day < 23)
        zodiacSign = zod_signs[6];
        else
        zodiacSign = zod_signs[7];
      }break;
      case 7: {//August
        if(day < 23)
        zodiacSign = zod_signs[7];
        else
        zodiacSign = zod_signs[8];
      }break;
      case 8: {//September
        if(day < 23)
        zodiacSign = zod_signs[8];
        else
        zodiacSign = zod_signs[9];
      }break;
      case 9: {//October
        if(day < 23)
        zodiacSign = zod_signs[9];
        else
        zodiacSign = zod_signs[10];
      }break;
      case 10: {//November
        if(day < 22)
        zodiacSign = zod_signs[10];
        else
        zodiacSign = zod_signs[11];
      }break;
      case 11: {//December
        if(day < 22)
        zodiacSign = zod_signs[11];
        else
        zodiacSign = zod_signs[0];
      }break;
    }
    return zodiacSign;
  }
});
