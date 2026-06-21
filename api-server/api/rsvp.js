const { neon } = require('@neondatabase/serverless')

const ALLOWED_ORIGINS = [
  'https://undangan.applab.my.id',
  'http://localhost:3000',
  'http://localhost:3001',
]

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : 'https://undangan.applab.my.id',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || ''
  const headers = corsHeaders(origin)

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    return res.end()
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    if (req.method === 'POST') {
      const { name, attending } = req.body || {}
      if (!name?.trim() || !attending) {
        res.writeHead(400, { ...headers, 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'Name and attending are required' }))
      }

      const timestamp = new Date().toLocaleString('id-ID')
      await sql`INSERT INTO rsvp (name, attending, timestamp) VALUES (${name.trim()}, ${attending}, ${timestamp})`

      res.writeHead(201, { ...headers, 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ success: true }))
    }

    if (req.method === 'GET') {
      const limit = Math.min(Number(req.query.limit) || 50, 100)
      const rows = await sql`SELECT name, attending, timestamp FROM rsvp ORDER BY created_at DESC LIMIT ${limit}`

      res.writeHead(200, { ...headers, 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(rows))
    }

    res.writeHead(405, { ...headers, 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error(err)
    res.writeHead(500, { ...headers, 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
