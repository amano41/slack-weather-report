function reportWeather() {

  var channel = "#general";
  var username = "天気予報";
  var icon_emoji = ":information_desk_person:";

  var properties = PropertiesService.getScriptProperties().getProperties();
  var city = properties.CITY_CODE;

  var weather = getWeather(city);
  var today = weather["forecasts"][0];
  var tomorrow = weather["forecasts"][1];
  var link = weather["link"];

  var text = weather["title"];
  var attachments = [];
  attachments.push(createForecast(today, link));
  attachments.push(createForecast(tomorrow, link));
  attachments.push(createDescription(weather));

  postSlackMessage(channel, username, icon_emoji, text, attachments);
}


function getWeather(city) {

  var url = "http://weather.livedoor.com/forecast/webservice/json/v1?city=" + city;

  var response = UrlFetchApp.fetch(url);
  if (response.getResponseCode() != 200) {
    return false;
  }

  return JSON.parse(response.getContentText("UTF-8"));
}


function getTemperature(forecast, which) {

  var temperature = forecast["temperature"][which];
  if (temperature == null) {
    return "---";
  }

  return (" " + temperature["celsius"]).slice(-2) + " ℃";
}


function createForecast(forecast, link) {

  var title = forecast["dateLabel"] + "の天気";
  var image = forecast["image"]["url"];

  var telop = forecast["telop"];
  var max = getTemperature(forecast, "max");
  var min = getTemperature(forecast, "min");
  var text = "*" + telop + "*\n最高気温 " + max + "\n最低気温 " + min;

  return createAttachment(title, link, text, image);
}


function createDescription(weather) {
  var text = weather["description"]["text"].replace(/\r?\n/g, "");
  return createAttachment("", "", text, "");
}
