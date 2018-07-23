function createTrigger() {

  // 設定する時刻
  var hours   = 6;
  var minutes = 0;

  // 現在の日付の指定した時刻
  var date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // トリガーを設定
  ScriptApp.newTrigger("main").timeBased().at(date).create();
}


function deleteTrigger() {

  // 関数名が一致するトリガーを削除
  ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction() == "main";
  })
  .forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });

}


function main() {
  deleteTrigger();
  reportWeather(); // 実際に実行したい関数
}


function init() {

  // トリガーをすべて削除する
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  })

  // 「特定日時のトリガー」を追加するトリガーを作成する
  ScriptApp.newTrigger("createTrigger").timeBased().everyDays(1).atHour(4).create()
}
