// ============================================================
// Google Apps Script - backend pro FarmLearn na GitHub Pages
// ============================================================
// NAVOD:
// 1. Jdi na https://script.google.com -> New project
// 2. Smaz vse a vloz tento cely kod
// 3. Klikni Deploy > New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Zkopiruj URL deploymentu
// 5. Vloz URL do public/index.html (SCRIPT_URL promena nahore v <script>)
// ============================================================

// Sheet names
var PARTICIPANTS_SHEET = 'Participants';
var ANSWERS_SHEET = 'Answers';
var SURVEYS_SHEET = 'Surveys';
var SPREADSHEET_NAME = 'FarmLearn Data';

function getSpreadsheet() {
  // Hledej existujici spreadsheet podle jmena
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  // Neexistuje - vytvor novy
  var ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  Logger.log('Vytvoreno: ' + ss.getUrl());
  return ss;
}

function getOrCreateSheet(name, headers) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === 'checkName') {
      return checkName(data.name);
    } else if (action === 'register') {
      return register(data);
    } else if (action === 'answer') {
      return saveAnswer(data);
    } else if (action === 'progress') {
      return saveProgress(data);
    } else if (action === 'survey') {
      return saveSurvey(data);
    }

    return jsonResponse({ error: 'Unknown action: ' + action });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

function checkName(name) {
  var sheet = getOrCreateSheet(PARTICIPANTS_SHEET, participantHeaders());
  var data = sheet.getDataRange().getValues();
  var nameLower = (name || '').toLowerCase().trim();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).toLowerCase().trim() === nameLower) {
      return jsonResponse({ available: false });
    }
  }
  return jsonResponse({ available: true });
}

function participantHeaders() {
  return ['unique_id', 'name', 'created_at', 'session_duration_sec', 'total_questions',
          'correct_answers', 'accuracy_percent', 'avg_response_time_sec', 'levels_completed', 'finished'];
}

function register(data) {
  var sheet = getOrCreateSheet(PARTICIPANTS_SHEET, participantHeaders());

  // Check name uniqueness
  var existing = sheet.getDataRange().getValues();
  var nameLower = data.name.toLowerCase().trim();
  for (var i = 1; i < existing.length; i++) {
    if (String(existing[i][1]).toLowerCase().trim() === nameLower) {
      return jsonResponse({ error: 'Name already taken' });
    }
  }

  sheet.appendRow([
    data.uniqueId, data.name, new Date().toISOString(),
    0, 0, 0, 0, 0, 0, 0
  ]);

  return jsonResponse({ ok: true });
}

function saveAnswer(data) {
  var headers = ['participant_id', 'answer_index', 'timestamp', 'session_time_ms',
                 'module', 'module_name', 'level', 'question_index', 'question_total',
                 'question_text', 'selected_answer', 'correct_answer', 'is_correct',
                 'response_time_ms', 'response_time_sec'];

  var sheet = getOrCreateSheet(ANSWERS_SHEET, headers);
  sheet.appendRow([
    data.participantId, data.answerIndex, data.timestamp, data.sessionTimeMs,
    data.module, data.moduleName, data.level, data.questionIndex, data.questionTotal,
    data.questionText, data.selectedAnswer, data.correctAnswer,
    data.isCorrect ? 1 : 0, data.responseTimeMs, data.responseTimeSec
  ]);

  return jsonResponse({ ok: true });
}

function saveProgress(data) {
  var sheet = getOrCreateSheet(PARTICIPANTS_SHEET, participantHeaders());
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.uniqueId) {
      var row = i + 1;
      sheet.getRange(row, 4).setValue(data.duration);
      sheet.getRange(row, 5).setValue(data.total);
      sheet.getRange(row, 6).setValue(data.correct);
      sheet.getRange(row, 7).setValue(data.accuracy);
      sheet.getRange(row, 8).setValue(data.avgTime);
      sheet.getRange(row, 9).setValue(data.levelsCompleted);
      sheet.getRange(row, 10).setValue(data.finished ? 1 : 0);
      return jsonResponse({ ok: true });
    }
  }

  return jsonResponse({ error: 'Participant not found' });
}

function saveSurvey(data) {
  var headers = ['participant_id', 'submitted_at',
    'sus1', 'sus2', 'sus3', 'sus4', 'sus5', 'sus6', 'sus7', 'sus8', 'sus9', 'sus10', 'sus_score',
    'pu1', 'pu2', 'pu3', 'pu4', 'pu_mean',
    'peou1', 'peou2', 'peou3', 'peou4', 'peou_mean',
    'eng1', 'eng2', 'eng3', 'eng4', 'eng5', 'eng_mean',
    'open_like', 'open_improve'];

  var sheet = getOrCreateSheet(SURVEYS_SHEET, headers);
  sheet.appendRow([
    data.participantId, new Date().toISOString(),
    data.sus1, data.sus2, data.sus3, data.sus4, data.sus5,
    data.sus6, data.sus7, data.sus8, data.sus9, data.sus10, data.susScore,
    data.pu1, data.pu2, data.pu3, data.pu4, data.puMean,
    data.peou1, data.peou2, data.peou3, data.peou4, data.peouMean,
    data.eng1, data.eng2, data.eng3, data.eng4, data.eng5, data.engMean,
    data.openLike, data.openImprove
  ]);

  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
