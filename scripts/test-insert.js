const { neon } = require('@neondatabase/serverless')
const sql = neon(process.env.DATABASE_URL)

sql`INSERT INTO wishes (name, status, message, timestamp) VALUES ('Test', 'Teman', 'Test message', ${new Date().toLocaleString('id-ID')})`
  .then(r => { console.log('Insert OK:', r); process.exit(0) })
  .catch(e => { console.error(e); process.exit(1) })
