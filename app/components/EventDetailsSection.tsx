'use client'

import { motion } from 'framer-motion'

const events = [
  {
    title: 'Akad Nikah',
    time: '09:00 - 10:00 WITA',
    date: 'Sabtu, 11 Juli 2026',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  },
  {
    title: 'Resepsi',
    time: '11:00 - Selesai',
    date: 'Sabtu, 11 Juli 2026',
    icon: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z',
  },
]

export default function EventDetailsSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 max-w-lg w-full space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans"
        >
          Susunan Acara
        </motion.p>

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-xl p-5 sm:p-6"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-champagne/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne" fill="currentColor">
                <path d={ev.icon} />
              </svg>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold mb-2">{ev.title}</h3>
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs font-sans mb-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span>{ev.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/50 text-[11px] font-sans">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{ev.date}</span>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-xl p-5 sm:p-6"
        >
          <div className="flex items-center justify-center gap-2 text-champagne/80 text-sm font-sans mb-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Lokasi Acara
          </div>
          <h4 className="font-serif text-lg text-white font-medium mb-1">Grand Sulanjana</h4>
          <p className="text-white/60 text-xs font-sans leading-relaxed mb-3">
            Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat
          </p>
          <a
            href="https://maps.google.com/?q=Grand+Sulanjana+Bandung"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne/15 border border-champagne/30 text-champagne text-xs font-sans rounded-lg hover:bg-champagne/25 transition-colors duration-300 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Buka Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  )
}
