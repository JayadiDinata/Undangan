'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Wish {
  name: string
  status: string
  message: string
  timestamp: string
}

const WEBHOOK_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE'

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(text))
  return div.innerHTML
}

export default function WishesBoard() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('weddingWishes')
    if (stored) {
      try { setWishes(JSON.parse(stored)) } catch {}
    }
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)

    const newWish: Wish = {
      name: escapeHtml(name.trim()),
      status: escapeHtml(status.trim()),
      message: escapeHtml(message.trim()),
      timestamp: new Date().toLocaleString('id-ID'),
    }

    const updated = [newWish, ...wishes]
    setWishes(updated)
    localStorage.setItem('weddingWishes', JSON.stringify(updated))
    setName('')
    setStatus('')
    setMessage('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish),
      })
    } catch {}
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-black/20 backdrop-blur-md border border-champagne/20 rounded-xl p-4 sm:p-6 space-y-4"
      >
        <div>
          <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">
            Nama Anda
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">
            Status / Hubungan
          </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Teman, Sahabat, Keluarga, dll."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">
            Ucapan & Doa
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Tulis ucapan dan doa Anda..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200 resize-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 bg-champagne/20 border border-champagne/40 text-champagne font-sans text-sm font-medium rounded-lg hover:bg-champagne/30 transition-colors duration-300 cursor-pointer disabled:opacity-50"
        >
          {submitting ? 'Mengirim...' : 'Kirim Ucapan'}
        </motion.button>
        <AnimatePresence>
          {success && (
            <motion.p
              key="success-msg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-400 text-sm text-center font-sans"
            >
              Berhasil dikirim! Terima kasih atas doa dan ucapannya
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
        <AnimatePresence>
          {wishes.length === 0 ? (
            <p className="text-center text-white/40 text-sm font-sans py-8">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          ) : (
            wishes.map((w, i) => (
              <motion.div
                key={`${w.timestamp}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-champagne" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <p className="text-sm font-medium text-champagne font-sans">{w.name}</p>
                      {w.status && (
                        <span className="text-[10px] text-white/40 font-sans">— {w.status}</span>
                      )}
                    </div>
                    <p className="text-sm text-white/80 mt-1 leading-relaxed font-sans">{w.message}</p>
                    <p className="text-[10px] text-white/30 mt-1.5 font-sans">{w.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
