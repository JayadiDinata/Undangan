CREATE TABLE IF NOT EXISTS wishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT '',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes (created_at DESC);
