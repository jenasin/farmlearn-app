const express = require('express');
const { createClient } = require('@libsql/client');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Turso cloud database (persistent) or local SQLite fallback
const db = createClient({
  url: process.env.TURSO_URL || 'file:data.db',
  authToken: process.env.TURSO_AUTH_TOKEN || undefined
});

// Create table
(async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT DEFAULT (datetime('now')),
      action TEXT,
      participant_id TEXT,
      name TEXT,
      data TEXT
    )
  `);
  console.log('Database ready' + (process.env.TURSO_URL ? ' (Turso cloud)' : ' (local file)'));
})();

app.use(express.json({ limit: '1mb' }));
app.use(express.text({ type: 'text/plain', limit: '1mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, '.')));

// Save data
app.post('/api/save', async (req, res) => {
  try {
    let data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await db.execute({
      sql: 'INSERT INTO events (action, participant_id, name, data) VALUES (?, ?, ?, ?)',
      args: [data.action || '', data.participantId || data.uniqueId || '', data.name || '', JSON.stringify(data)]
    });
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

// Admin - view all data
app.get('/admin', async (req, res) => {
  const result = await db.execute('SELECT * FROM events ORDER BY id DESC LIMIT 500');
  const events = result.rows;
  const statsResult = await db.execute("SELECT COUNT(DISTINCT participant_id) as participants, COUNT(*) as total_events, COUNT(CASE WHEN action='answer' THEN 1 END) as answers, COUNT(CASE WHEN action='survey' THEN 1 END) as surveys FROM events");
  const stats = statsResult.rows[0];

  const rows = events.map(e => {
    const d = JSON.parse(e.data || '{}');
    let detail = '';
    if (e.action === 'answer') detail = `${d.moduleName} L${d.level} Q${d.questionIndex} ${d.isCorrect ? 'OK' : 'WRONG'} ${d.responseTimeSec}s`;
    if (e.action === 'survey') detail = `SUS:${d.susScore} PU:${d.puMean} PEOU:${d.peouMean} ENG:${d.engMean}`;
    if (e.action === 'progress') detail = `${d.correct}/${d.total} (${d.accuracy}%) ${d.levelsCompleted} levels`;
    return `<tr><td>${e.id}</td><td>${e.timestamp}</td><td><b>${e.action}</b></td><td>${e.name}</td><td style="font-size:12px">${detail}</td></tr>`;
  }).join('');

  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FarmLearn Admin</title>
<style>body{font-family:sans-serif;max-width:1000px;margin:0 auto;padding:20px}table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid #ddd;text-align:left}th{background:#166534;color:white}.s{display:flex;gap:16px;margin:20px 0}.s div{background:white;padding:16px 24px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1);text-align:center}.s b{font-size:28px;color:#166534;display:block}a{color:#166534;font-weight:bold;margin-right:16px}</style></head><body>
<h1>FarmLearn Admin</h1>
<div class="s"><div><b>${stats.participants}</b>participants</div><div><b>${stats.answers}</b>answers</div><div><b>${stats.surveys}</b>surveys</div><div><b>${stats.total_events}</b>total events</div></div>
<a href="/api/export/csv">Download CSV</a><a href="/api/export/json">Download JSON</a><a href="/results.html">Results Dashboard</a>
<table><tr><th>#</th><th>Time</th><th>Action</th><th>Name</th><th>Detail</th></tr>${rows}</table></body></html>`);
});

// Export CSV
app.get('/api/export/csv', async (req, res) => {
  const result = await db.execute('SELECT * FROM events ORDER BY id');
  let csv = 'id,timestamp,action,participant_id,name,data\n';
  result.rows.forEach(e => {
    csv += `${e.id},${e.timestamp},${e.action},"${e.participant_id}","${(e.name||'').replace(/"/g,'""')}","${(e.data||'').replace(/"/g,'""')}"\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.header('Content-Disposition', 'attachment; filename=farmlearn_export.csv');
  res.send(csv);
});

// Export JSON
app.get('/api/export/json', async (req, res) => {
  const result = await db.execute('SELECT * FROM events ORDER BY id');
  res.json(result.rows.map(e => ({ ...e, data: JSON.parse(e.data || '{}') })));
});

app.listen(PORT, () => console.log(`FarmLearn running on port ${PORT}`));
