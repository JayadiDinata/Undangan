require('dotenv/config')
const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  console.log('Creating tables...')
  await sql`
    CREATE TABLE IF NOT EXISTS wishes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT DEFAULT '',
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes (created_at DESC);
  `
  await sql`
    CREATE TABLE IF NOT EXISTS rsvp (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      attending TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp (created_at DESC);
  `
  console.log('Done! Tables "wishes" and "rsvp" are ready.')
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
