function doGet() {
  const html = HtmlService.createTemplateFromFile("index").evaluate();
  html.addMetaTag("viewport", "width=device-width, initial-scale=1, shrink-to-fit=no");
  return html;
}

function getItems() {
  const sheetId = PropertiesService.getScriptProperties().getProperty("MENU_SHEET_ID");
  const sheet = SpreadsheetApp.openById(sheetId);
  const items = sheet.getDataRange().getValues();
  items.shift();
  return items;
}

function regist(basket) {
  const sheetId = PropertiesService.getScriptProperties().getProperty("OUTPUT_SHEET_ID");
  const sheet = SpreadsheetApp.openById(sheetId);
  const data = sheet.getDataRange().getValues();
  const date = new Date();
  const now = Utilities.formatDate(date, "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
  for (const item of basket) {
    data.push([now, item.name, item.price, item.sex, item.age]);
  }
  const rows = data.length;
  const cols = data[0].length;
  sheet.getSheets()[0].getRange(1, 1, rows, cols).setValues(data);
}
