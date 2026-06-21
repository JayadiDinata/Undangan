import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL || '')
    const rows = await sql`SELECT name, status, message, timestamp FROM wishes ORDER BY created_at DESC LIMIT 50`
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
    const { name, status, message } = body
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('id-ID')
    await sql`INSERT INTO wishes (name, status, message, timestamp) VALUES (${name.trim()}, ${status?.trim() || ''}, ${message.trim()}, ${timestamp})`

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
