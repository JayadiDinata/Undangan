import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL || '')
    const rows = await sql`SELECT name, attending, timestamp FROM rsvp ORDER BY created_at DESC LIMIT 50`
    return NextResponse.json(rows)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL || '')
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
