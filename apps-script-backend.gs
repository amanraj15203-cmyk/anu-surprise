// Google Apps Script backend for Anu Surprise interaction tracking.
// Create a Google Sheet, open Extensions → Apps Script, paste this file,
// set ADMIN_TOKEN, then deploy as a Web App (execute as you, access as anyone).

const SHEET_NAME = "Activity";
const ADMIN_TOKEN = "CHANGE_THIS_TO_A_LONG_RANDOM_TOKEN";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["timestamp", "event"]);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const allowed = ["letter_opened", "surprise_opened", "like_yes", "like_no", "mine_yes", "mine_think"];
    if (!allowed.includes(data.event)) return json_({ok:false});
    getSheet_().appendRow([data.timestamp || new Date().toISOString(), data.event]);
    return json_({ok:true});
  } catch (err) {
    return json_({ok:false});
  }
}

function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== ADMIN_TOKEN) return json_({error:"unauthorized"});
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const events = values.slice(1).filter(r => r[0] && r[1]).map(r => ({timestamp:r[0] instanceof Date ? r[0].toISOString() : String(r[0]), event:String(r[1])}));
  return json_({events:events});
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
