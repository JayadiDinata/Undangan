import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const url = process.env.DATABASE_URL
    if (!url) return NextResponse.json([])
    const sql = neon(url)
    const rows = await sql`SELECT name, attending, timestamp FROM rsvp ORDER BY created_at DESC LIMIT 50`
    return NextResponse.json(rows)
  } catch (err) {
    console.error(err)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const url = process.env.DATABASE_URL
    if (!url) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    const sql = neon(url)
    const body = await req.json()
    const { name, attending } = body
    if (!name?.trim() || !attending) {
      return NextResponse.json({ error: 'Name and attending are required' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('id-ID')
    await sql`INSERT INTO rsvp (name, attending, timestamp) VALUES (${name.trim()}, ${attending}, ${timestamp})`

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
