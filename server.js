const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new Database(path.join(__dirname, 'farmlearn.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unique_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    session_duration_sec INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    accuracy_percent REAL DEFAULT 0,
    avg_response_time_sec REAL DEFAULT 0,
    levels_completed INTEGER DEFAULT 0,
    finished INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id TEXT NOT NULL REFERENCES participants(unique_id),
    answer_index INTEGER,
    timestamp TEXT,
    session_time_ms INTEGER,
    module TEXT,
    module_name TEXT,
    level INTEGER,
    question_index INTEGER,
    question_total INTEGER,
    question_text TEXT,
    selected_answer TEXT,
    correct_answer TEXT,
    is_correct INTEGER,
    response_time_ms INTEGER,
    response_time_sec REAL
  );

  CREATE TABLE IF NOT EXISTS surveys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id TEXT UNIQUE NOT NULL REFERENCES participants(unique_id),
    submitted_at TEXT DEFAULT (datetime('now')),
    sus1 INTEGER, sus2 INTEGER, sus3 INTEGER, sus4 INTEGER, sus5 INTEGER,
    sus6 INTEGER, sus7 INTEGER, sus8 INTEGER, sus9 INTEGER, sus10 INTEGER,
    sus_score REAL,
    pu1 INTEGER, pu2 INTEGER, pu3 INTEGER, pu4 INTEGER,
    pu_mean REAL,
    peou1 INTEGER, peou2 INTEGER, peou3 INTEGER, peou4 INTEGER,
    peou_mean REAL,
    eng1 INTEGER, eng2 INTEGER, eng3 INTEGER, eng4 INTEGER, eng5 INTEGER,
    eng_mean REAL,
    open_like TEXT,
    open_improve TEXT
  );
`);

// Prepared statements
const insertParticipant = db.prepare(`
  INSERT INTO participants (unique_id, name) VALUES (?, ?)
`);

const updateParticipant = db.prepare(`
  UPDATE participants SET
    session_duration_sec = ?, total_questions = ?, correct_answers = ?,
    accuracy_percent = ?, avg_response_time_sec = ?, levels_completed = ?, finished = ?
  WHERE unique_id = ?
`);

const insertAnswer = db.prepare(`
  INSERT INTO answers (participant_id, answer_index, timestamp, session_time_ms, module, module_name,
    level, question_index, question_total, question_text, selected_answer, correct_answer,
    is_correct, response_time_ms, response_time_sec)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertSurvey = db.prepare(`
  INSERT OR REPLACE INTO surveys (participant_id, sus1, sus2, sus3, sus4, sus5, sus6, sus7, sus8, sus9, sus10,
    sus_score, pu1, pu2, pu3, pu4, pu_mean, peou1, peou2, peou3, peou4, peou_mean,
    eng1, eng2, eng3, eng4, eng5, eng_mean, open_like, open_improve)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const checkName = db.prepare(`SELECT COUNT(*) as cnt FROM participants WHERE LOWER(name) = LOWER(?)`);

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ========== API ==========

// Check if name is available
app.get('/api/check-name/:name', (req, res) => {
  const result = checkName.get(req.params.name);
  res.json({ available: result.cnt === 0 });
});

// Register new participant
app.post('/api/participants', (req, res) => {
  const { uniqueId, name } = req.body;
  if (!uniqueId || !name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }
  try {
    insertParticipant.run(uniqueId, name.trim());
    res.json({ ok: true });
  } catch (e) {
    if (e.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Participant already exists' });
    }
    res.status(500).json({ error: e.message });
  }
});

// Save answer (one at a time, after each question)
app.post('/api/answers', (req, res) => {
  const a = req.body;
  if (!a.participantId) return res.status(400).json({ error: 'Missing participantId' });
  try {
    insertAnswer.run(
      a.participantId, a.answerIndex, a.timestamp, a.sessionTimeMs,
      a.module, a.moduleName, a.level, a.questionIndex, a.questionTotal,
      a.questionText, a.selectedAnswer, a.correctAnswer,
      a.isCorrect ? 1 : 0, a.responseTimeMs, a.responseTimeSec
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update participant progress (called periodically and at end)
app.put('/api/participants/:id', (req, res) => {
  const { duration, total, correct, accuracy, avgTime, levelsCompleted, finished } = req.body;
  try {
    updateParticipant.run(duration, total, correct, accuracy, avgTime, levelsCompleted, finished ? 1 : 0, req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Submit survey
app.post('/api/surveys', (req, res) => {
  const s = req.body;
  if (!s.participantId) return res.status(400).json({ error: 'Missing participantId' });
  try {
    insertSurvey.run(
      s.participantId,
      s.sus1, s.sus2, s.sus3, s.sus4, s.sus5, s.sus6, s.sus7, s.sus8, s.sus9, s.sus10,
      s.susScore,
      s.pu1, s.pu2, s.pu3, s.pu4, s.puMean,
      s.peou1, s.peou2, s.peou3, s.peou4, s.peouMean,
      s.eng1, s.eng2, s.eng3, s.eng4, s.eng5, s.engMean,
      s.openLike, s.openImprove
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ========== ADMIN ENDPOINTS ==========

// Get all results as JSON
app.get('/api/admin/results', (req, res) => {
  const participants = db.prepare(`
    SELECT p.*, s.sus_score, s.pu_mean, s.peou_mean, s.eng_mean,
           s.sus1, s.sus2, s.sus3, s.sus4, s.sus5, s.sus6, s.sus7, s.sus8, s.sus9, s.sus10,
           s.pu1, s.pu2, s.pu3, s.pu4, s.peou1, s.peou2, s.peou3, s.peou4,
           s.eng1, s.eng2, s.eng3, s.eng4, s.eng5,
           s.open_like, s.open_improve
    FROM participants p LEFT JOIN surveys s ON p.unique_id = s.participant_id
    ORDER BY p.created_at DESC
  `).all();

  const answers = db.prepare(`SELECT * FROM answers ORDER BY participant_id, answer_index`).all();

  res.json({ participants, answers, exportedAt: new Date().toISOString() });
});

// Export summary CSV
app.get('/api/admin/csv/summary', (req, res) => {
  const rows = db.prepare(`
    SELECT p.unique_id, p.name, p.created_at, p.session_duration_sec, p.total_questions,
           p.correct_answers, p.accuracy_percent, p.avg_response_time_sec, p.levels_completed, p.finished,
           s.sus_score, s.pu_mean, s.peou_mean, s.eng_mean,
           s.sus1, s.sus2, s.sus3, s.sus4, s.sus5, s.sus6, s.sus7, s.sus8, s.sus9, s.sus10,
           s.pu1, s.pu2, s.pu3, s.pu4, s.peou1, s.peou2, s.peou3, s.peou4,
           s.eng1, s.eng2, s.eng3, s.eng4, s.eng5,
           s.open_like, s.open_improve
    FROM participants p LEFT JOIN surveys s ON p.unique_id = s.participant_id
    ORDER BY p.created_at
  `).all();

  const header = 'unique_id,name,created_at,session_duration_sec,total_questions,correct_answers,accuracy_percent,avg_response_time_sec,levels_completed,finished,sus_score,pu_mean,peou_mean,eng_mean,sus1,sus2,sus3,sus4,sus5,sus6,sus7,sus8,sus9,sus10,pu1,pu2,pu3,pu4,peou1,peou2,peou3,peou4,eng1,eng2,eng3,eng4,eng5,open_like,open_improve\n';

  const csvRows = rows.map(r => {
    const esc = v => v == null ? '' : '"' + String(v).replace(/"/g, '""') + '"';
    return [
      r.unique_id, esc(r.name), r.created_at, r.session_duration_sec, r.total_questions,
      r.correct_answers, r.accuracy_percent, r.avg_response_time_sec, r.levels_completed, r.finished,
      r.sus_score ?? '', r.pu_mean ?? '', r.peou_mean ?? '', r.eng_mean ?? '',
      r.sus1 ?? '', r.sus2 ?? '', r.sus3 ?? '', r.sus4 ?? '', r.sus5 ?? '',
      r.sus6 ?? '', r.sus7 ?? '', r.sus8 ?? '', r.sus9 ?? '', r.sus10 ?? '',
      r.pu1 ?? '', r.pu2 ?? '', r.pu3 ?? '', r.pu4 ?? '',
      r.peou1 ?? '', r.peou2 ?? '', r.peou3 ?? '', r.peou4 ?? '',
      r.eng1 ?? '', r.eng2 ?? '', r.eng3 ?? '', r.eng4 ?? '', r.eng5 ?? '',
      esc(r.open_like), esc(r.open_improve)
    ].join(',');
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=farmlearn_summary.csv');
  res.send(header + csvRows);
});

// Export detailed CSV (all answers)
app.get('/api/admin/csv/detailed', (req, res) => {
  const rows = db.prepare(`
    SELECT a.*, p.name as participant_name
    FROM answers a JOIN participants p ON a.participant_id = p.unique_id
    ORDER BY a.participant_id, a.answer_index
  `).all();

  const header = 'participant_id,participant_name,answer_index,timestamp,session_time_ms,module,module_name,level,question_index,question_total,question_text,selected_answer,correct_answer,is_correct,response_time_ms,response_time_sec\n';

  const csvRows = rows.map(r => {
    const esc = v => v == null ? '' : '"' + String(v).replace(/"/g, '""') + '"';
    return [
      r.participant_id, esc(r.participant_name), r.answer_index, r.timestamp, r.session_time_ms,
      r.module, esc(r.module_name), r.level, r.question_index, r.question_total,
      esc(r.question_text), esc(r.selected_answer), esc(r.correct_answer),
      r.is_correct, r.response_time_ms, r.response_time_sec
    ].join(',');
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=farmlearn_detailed.csv');
  res.send(header + csvRows);
});

// Admin dashboard
app.get('/admin', (req, res) => {
  const stats = db.prepare(`
    SELECT
      COUNT(*) as total_participants,
      SUM(CASE WHEN finished = 1 THEN 1 ELSE 0 END) as finished,
      ROUND(AVG(accuracy_percent), 1) as avg_accuracy,
      ROUND(AVG(session_duration_sec), 0) as avg_duration,
      (SELECT COUNT(*) FROM surveys) as surveys_completed
    FROM participants
  `).get();

  const participants = db.prepare(`
    SELECT p.unique_id, p.name, p.created_at, p.total_questions, p.correct_answers,
           p.accuracy_percent, p.session_duration_sec, p.levels_completed, p.finished,
           CASE WHEN s.id IS NOT NULL THEN 1 ELSE 0 END as has_survey,
           s.sus_score
    FROM participants p LEFT JOIN surveys s ON p.unique_id = s.participant_id
    ORDER BY p.created_at DESC
  `).all();

  const rows = participants.map(p => {
    const mins = Math.floor(p.session_duration_sec / 60);
    const secs = p.session_duration_sec % 60;
    const color = p.accuracy_percent >= 70 ? '#16a34a' : p.accuracy_percent >= 50 ? '#d97706' : '#dc2626';
    return `<tr>
      <td>${p.name}</td>
      <td>${new Date(p.created_at).toLocaleString()}</td>
      <td>${p.total_questions}</td>
      <td style="color:${color}; font-weight:bold;">${p.accuracy_percent}%</td>
      <td>${mins}:${secs < 10 ? '0' : ''}${secs}</td>
      <td>${p.levels_completed}/15</td>
      <td>${p.finished ? 'Yes' : 'No'}</td>
      <td>${p.has_survey ? (p.sus_score != null ? p.sus_score.toFixed(1) : 'Yes') : 'No'}</td>
    </tr>`;
  }).join('');

  res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>FarmLearn Admin</title>
<style>
  body { font-family: -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background: #f9fafb; }
  h1 { color: #166534; }
  .stats { display: flex; gap: 16px; margin: 20px 0; flex-wrap: wrap; }
  .stat { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex: 1; min-width: 150px; text-align: center; }
  .stat-num { font-size: 32px; font-weight: bold; color: #166534; }
  .stat-label { color: #666; font-size: 14px; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  th { background: #166534; color: white; padding: 12px; text-align: left; font-size: 14px; }
  td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
  tr:hover { background: #f0fdf4; }
  .btn { display: inline-block; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 4px; }
  .btn-green { background: #16a34a; color: white; }
  .btn-blue { background: #2563eb; color: white; }
</style></head><body>
  <h1>FarmLearn Admin Dashboard</h1>
  <div class="stats">
    <div class="stat"><div class="stat-num">${stats.total_participants}</div><div class="stat-label">Participants</div></div>
    <div class="stat"><div class="stat-num">${stats.finished}</div><div class="stat-label">Finished</div></div>
    <div class="stat"><div class="stat-num">${stats.surveys_completed}</div><div class="stat-label">Surveys</div></div>
    <div class="stat"><div class="stat-num">${stats.avg_accuracy || 0}%</div><div class="stat-label">Avg Accuracy</div></div>
    <div class="stat"><div class="stat-num">${Math.floor((stats.avg_duration || 0) / 60)}m</div><div class="stat-label">Avg Duration</div></div>
  </div>
  <div style="margin: 20px 0;">
    <a class="btn btn-green" href="/api/admin/csv/summary" download>Download Summary CSV</a>
    <a class="btn btn-blue" href="/api/admin/csv/detailed" download>Download Detailed CSV</a>
    <a class="btn btn-blue" href="/api/admin/results">JSON Export</a>
  </div>
  <table>
    <tr><th>Name</th><th>Date</th><th>Questions</th><th>Accuracy</th><th>Duration</th><th>Levels</th><th>Finished</th><th>Survey (SUS)</th></tr>
    ${rows}
  </table>
</body></html>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  FarmLearn server running at http://localhost:${PORT}`);
  console.log(`  Admin dashboard: http://localhost:${PORT}/admin\n`);
});

// Graceful shutdown
process.on('SIGINT', () => { db.close(); process.exit(0); });
process.on('SIGTERM', () => { db.close(); process.exit(0); });
