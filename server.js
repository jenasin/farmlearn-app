const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL (Render free) or crash if not set
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Create table
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      action TEXT,
      participant_id TEXT,
      name TEXT,
      data JSONB
    )
  `);
  console.log('PostgreSQL ready');
})();

app.use(express.json({ limit: '1mb' }));
app.use(express.text({ type: 'text/plain', limit: '1mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, '.')));

// Save data
app.post('/api/save', async (req, res) => {
  try {
    let data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await pool.query(
      'INSERT INTO events (action, participant_id, name, data) VALUES ($1, $2, $3, $4)',
      [data.action || '', data.participantId || data.uniqueId || '', data.name || '', JSON.stringify(data)]
    );
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

// Admin
app.get('/admin', async (req, res) => {
  const { rows: events } = await pool.query('SELECT * FROM events ORDER BY id DESC LIMIT 500');
  const { rows: [stats] } = await pool.query("SELECT COUNT(DISTINCT participant_id) as participants, COUNT(*) as total_events, COUNT(CASE WHEN action='answer' THEN 1 END) as answers, COUNT(CASE WHEN action='survey' THEN 1 END) as surveys FROM events");

  const rows = events.map(e => {
    const d = typeof e.data === 'string' ? JSON.parse(e.data) : (e.data || {});
    let detail = '';
    if (e.action === 'register') detail = `${d.country || ''} age:${d.age || '?'} ${d.gender || ''} farm:${d.farmKnowledge || '?'} app:${d.appExperience || '?'}`;
    if (e.action === 'answer') detail = `${d.moduleName} L${d.level} Q${d.questionIndex} ${d.isCorrect ? 'OK' : 'WRONG'} ${d.responseTimeSec}s`;
    if (e.action === 'survey') detail = `SUS:${d.susScore} PU:${d.puMean} PEOU:${d.peouMean} ENG:${d.engMean}`;
    if (e.action === 'progress') detail = `${d.correct}/${d.total} (${d.accuracy}%) ${d.levelsCompleted} levels`;
    const ts = e.timestamp ? new Date(e.timestamp).toISOString().replace('T',' ').slice(0,19) : '';
    return `<tr><td>${e.id}</td><td>${ts}</td><td><b>${e.action}</b></td><td>${e.name}</td><td style="font-size:12px">${detail}</td></tr>`;
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
  const { rows } = await pool.query('SELECT * FROM events ORDER BY id');
  let csv = 'id,timestamp,action,participant_id,name,data\n';
  rows.forEach(e => {
    const ts = e.timestamp ? new Date(e.timestamp).toISOString() : '';
    const dataStr = typeof e.data === 'object' ? JSON.stringify(e.data) : (e.data || '');
    csv += `${e.id},${ts},${e.action},"${e.participant_id}","${(e.name||'').replace(/"/g,'""')}","${dataStr.replace(/"/g,'""')}"\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.header('Content-Disposition', 'attachment; filename=farmlearn_export.csv');
  res.send(csv);
});

// Export JSON
app.get('/api/export/json', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY id');
  res.json(rows.map(e => ({
    ...e,
    data: typeof e.data === 'string' ? JSON.parse(e.data) : (e.data || {})
  })));
});

app.listen(PORT, () => {
  console.log(`FarmLearn running on port ${PORT}`);

  // Keep alive - ping every 14 min to prevent Render free tier sleep
  const KEEP_ALIVE_URL = process.env.RENDER_EXTERNAL_URL || process.env.KEEP_ALIVE_URL;
  if (KEEP_ALIVE_URL) {
    setInterval(() => {
      fetch(KEEP_ALIVE_URL + '/api/export/json').catch(() => {});
      console.log('Keep-alive ping sent');
    }, 14 * 60 * 1000);
    console.log('Keep-alive enabled: pinging every 14 min');
  }
});
