// ============================================================
// FarmLearn - Google Apps Script
// ============================================================
// 1. Vytvor NOVY Google Sheet (prazdny)
// 2. V nem jdi do Extensions > Apps Script
// 3. Smaz vse, vloz tento kod
// 4. Deploy > New deployment > Web app > Anyone > Deploy
// 5. URL dej Honzovi
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Prvni radek = hlavicky (pokud je sheet prazdny)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['timestamp', 'action', 'participant_id', 'name', 'data']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    // Proste pridej radek - vsechno
    sheet.appendRow([
      new Date().toISOString(),
      data.action || '',
      data.participantId || data.uniqueId || '',
      data.name || '',
      JSON.stringify(data)
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
