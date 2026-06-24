require('dotenv/config')
const http = require('http')
const { URL } = require('url')

const handlers = {
  '/api/wishes': require('./api/wishes'),
  '/api/rsvp': require('./api/rsvp'),
}

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  const pathname = parsedUrl.pathname
  req.query = Object.fromEntries(parsedUrl.searchParams)

  const handler = handlers[pathname]
  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Not found' }))
  }

  let body = ''
  req.on('data', c => body += c)
  req.on('end', () => {
    try { req.body = body ? JSON.parse(body) : {} } catch { req.body = {} }
    handler(req, res)
  })
})

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
  console.log(`Routes: ${Object.keys(handlers).join(', ')}`)
})
