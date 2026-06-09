'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── DATA ────────────────────────────────────────────────────────────
const targetDate = new Date('2026-07-11T09:00:00+08:00')

const galleryImages = [
  { src: '/img/SR1.jpeg', alt: 'Prewedding 1' },
  { src: '/img/SR2.jpeg', alt: 'Prewedding 2' },
  { src: '/img/SR3.jpeg', alt: 'Prewedding 3' },
  { src: '/img/SR4.jpeg', alt: 'Prewedding 4' },
  { src: '/img/SR1-Photoroom (1).png', alt: 'Prewedding 5' },
  { src: '/img/Gemini_Generated_Image_swa8fzswa8fzswa8.png', alt: 'Prewedding 6' },
]

const bankAccounts = [
  { bank: 'Bank BCA', number: '1234567890', holder: 'Sarah Amara Syakira' },
  { bank: 'Bank Mandiri', number: '9876543210', holder: 'Ryan Malik Azhar' },
]

const navItems = [
  { id: 'initial', label: 'Pembuka' },
  { id: 'quran', label: 'Quran' },
  { id: 'couple', label: 'Pasangan' },
  { id: 'date', label: 'Tanggal' },
  { id: 'event', label: 'Acara' },
  { id: 'gallery', label: 'Galeri' },
  { id: 'gift', label: 'Hadiah' },
  { id: 'wishes', label: 'Ucapan' },
]

const WEBHOOK_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE'

// ─── ESCAPE HTML ─────────────────────────────────────────────────────
function esc(text: string): string {
  const d = document.createElement('div')
  d.appendChild(document.createTextNode(text))
  return d.innerHTML
}

// ─── HELPER: SPRING TRANSITION ─────────────────────────────────────
const spring = { type: 'spring' as const, stiffness: 60, damping: 20 }

// ─── SECTION WRAPPER ─────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 max-w-lg w-full">
        {children}
      </div>
    </section>
  )
}

// ─── 1. COVER SECTION ────────────────────────────────────────────────
function Cover({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false)
  const handleOpen = () => { setOpened(true); setTimeout(onOpen, 1200) }

  return (
    <AnimatePresence>
      {!opened && (
        <motion.section
          key="cover"
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-white/70 text-xs sm:text-sm uppercase tracking-[0.3em] font-sans mb-6"
            >
              The Wedding of
            </motion.p>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="mb-8"
            >
              <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-champagne/80" fill="currentColor">
                <path d="M58 8H6a4 4 0 0 0-4 4v40a4 4 0 0 0 4 4h52a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4zm-2 8v2.5L32 36 8 18.5V16h48zM6 48V22.5l24 16.8a2 2 0 0 0 2.2 0l24-16.8V48H6z" />
              </svg>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow mb-4"
            >
              Sarah &amp; Ryan
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-[1.5px] bg-champagne/60 mx-auto mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-white/80 text-xs sm:text-sm font-sans mb-8"
            >
              Anda telah diundang ke pernikahan kami
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-sans text-sm font-medium rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer tracking-wider"
            >
              Buka Undangan
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

// ─── 2. INITIAL SECTION ──────────────────────────────────────────────
function Initial() {
  return (
    <Section>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={spring} viewport={{ once: true, margin: '-100px' }}>
        <div className="border border-champagne/30 rounded-[3rem] p-8 sm:p-12 bg-black/10 backdrop-blur-sm">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }} viewport={{ once: true }}
            className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-sans mb-4">
            Undangan Pernikahan
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center" />
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.5 }} viewport={{ once: true }}
            className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight">
            Sarah
          </motion.h2>
          <motion.p initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.7, type: 'spring', stiffness: 120 }} viewport={{ once: true }}
            className="font-serif text-champagne text-lg sm:text-xl italic my-2">&amp;</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.8 }} viewport={{ once: true }}
            className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight">
            Ryan
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mt-6 mb-4 origin-center" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} viewport={{ once: true }}
            className="text-white/70 text-xs sm:text-sm font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </motion.p>
        </div>
      </motion.div>
    </Section>
  )
}

// ─── 3. QURAN VERSE ──────────────────────────────────────────────────
function QuranVerse() {
  return (
    <Section>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={spring} viewport={{ once: true, margin: '-100px' }}>
        <div className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-2xl p-6 sm:p-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.2 }} viewport={{ once: true }}
            className="font-serif text-champagne/80 text-sm sm:text-base italic mb-4">
            QS. Ar-Rum Ayat 21
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.4 }} viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl text-white leading-[2] mb-6"
            style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', serif" }}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/30 mx-auto mb-4 origin-center" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.7 }} viewport={{ once: true }}
            className="text-white/70 text-xs sm:text-sm leading-relaxed italic">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
            dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </motion.p>
        </div>
      </motion.div>
    </Section>
  )
}

// ─── 4. COUPLE PROFILES ──────────────────────────────────────────────
const bride = { name: 'Sarah Amara Syakira', title: 'S.Ds.', parents: 'Putri dari Bapak Alex Budiman & Ibu Dewi Lestari', img: '/img/bride.jpg' }
const groom = { name: 'Ryan Malik Azhar', title: 'S.H.', parents: 'Putra dari Bapak Hendra Malik & Ibu Rina Fitriani', img: '/img/groom.jpg' }

function Couple() {
  return (
    <Section>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
        className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans mb-8">
        Mempelai
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {[{ ...bride, dir: -1 }, { ...groom, dir: 1 }].map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: p.dir * 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-champagne/40 shadow-lg shadow-black/20">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </motion.div>
            <h3 className="font-calligraphy text-2xl sm:text-3xl text-white">{p.name}</h3>
            <p className="text-champagne/70 text-xs font-sans mt-0.5">{p.title}</p>
            <p className="text-white/60 text-[11px] font-sans mt-3 max-w-[180px] mx-auto leading-relaxed">{p.parents}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── 5. COUNTDOWN TIMER ──────────────────────────────────────────────
interface TL { days: string; hours: string; minutes: string; seconds: string }
function calcTL(target: Date): TL {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  return {
    days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  }
}
const cdItems: { key: keyof TL; label: string }[] = [
  { key: 'days', label: 'Hari' }, { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' }, { key: 'seconds', label: 'Detik' },
]

function Countdown() {
  const [tl, setTl] = useState<TL>({ days: '--', hours: '--', minutes: '--', seconds: '--' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true); setTl(calcTL(targetDate))
    const id = setInterval(() => setTl(calcTL(targetDate)), 1000)
    return () => clearInterval(id)
  }, [])
  if (!mounted) return null

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {cdItems.map(({ key, label }) => (
        <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring}
          className="flex flex-col items-center min-w-[64px] sm:min-w-[76px]">
          <div className="bg-black/25 backdrop-blur-md border border-champagne/30 rounded-xl px-3 py-3 sm:px-4 sm:py-4 w-full text-center">
            <motion.span key={tl[key]} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className="block font-serif text-2xl sm:text-3xl font-bold text-champagne">
              {tl[key]}
            </motion.span>
          </div>
          <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1.5 font-sans">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── 6. SAVE THE DATE ────────────────────────────────────────────────
function SaveDate() {
  return (
    <Section>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={spring} viewport={{ once: true, margin: '-100px' }}>
        <div className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-2xl p-6 sm:p-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.2 }} viewport={{ once: true }}
            className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans mb-3">Save The Date</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }} viewport={{ once: true }}
            className="font-calligraphy text-3xl sm:text-4xl text-white mb-2">Sabtu, 11 Juli 2026</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.4 }} viewport={{ once: true }}
            className="text-white/50 text-xs font-sans mb-6">Bertepatan dengan 26 Dzulhijjah 1447 H</motion.p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center" />
          <Countdown />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.8 }} viewport={{ once: true }}
            className="text-white/40 text-[10px] font-sans mt-6 uppercase tracking-wider">Menuju Hari Bahagia</motion.p>
        </div>
      </motion.div>
    </Section>
  )
}

// ─── 7. EVENT DETAILS ────────────────────────────────────────────────
const events = [
  { title: 'Akad Nikah', time: '09:00 - 10:00 WITA', date: 'Sabtu, 11 Juli 2026',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  { title: 'Resepsi', time: '11:00 - Selesai', date: 'Sabtu, 11 Juli 2026',
    icon: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z' },
]

function Events() {
  return (
    <Section>
      <div className="space-y-6">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans">Susunan Acara</motion.p>
        {events.map((ev, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: i * 0.2 }} viewport={{ once: true }}
            className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-xl p-5 sm:p-6">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-champagne/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne" fill="currentColor"><path d={ev.icon} /></svg>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold mb-2">{ev.title}</h3>
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs font-sans mb-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
              <span>{ev.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/50 text-[11px] font-sans">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <span>{ev.date}</span>
            </div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 }} viewport={{ once: true }}
          className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-center gap-2 text-champagne/80 text-sm font-sans mb-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            Lokasi Acara
          </div>
          <h4 className="font-serif text-lg text-white font-medium mb-1">Grand Sulanjana</h4>
          <p className="text-white/60 text-xs font-sans leading-relaxed mb-3">Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat</p>
          <a href="https://maps.google.com/?q=Grand+Sulanjana+Bandung" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne/15 border border-champagne/30 text-champagne text-xs font-sans rounded-lg hover:bg-champagne/25 transition-colors duration-300 cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            Buka Google Maps
          </a>
        </motion.div>
      </div>
    </Section>
  )
}

// ─── 8. GALLERY ──────────────────────────────────────────────────────
function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Section>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
        className="text-white/60 text-xs uppercase tracking-[0.3em] text-center font-sans mb-6">Galeri Foto</motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {galleryImages.map((img, i) => (
          <motion.button key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[85vh] rounded-xl overflow-hidden">
              <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} className="w-full h-full object-contain rounded-xl" />
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer hover:bg-black/70 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

// ─── 9. WEDDING GIFT ─────────────────────────────────────────────────
function Gift() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = async (text: string, idx: number) => {
    try { await navigator.clipboard.writeText(text) } catch {
      const ta = document.createElement('textarea'); ta.value = text
      ta.style.position = 'fixed'; ta.style.opacity = '0'
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <Section>
      <div className="space-y-4">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] text-center font-sans mb-2">Wedding Gift</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.1 }} viewport={{ once: true }}
          className="text-center text-white/80 text-sm sm:text-base font-sans leading-relaxed">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah, berikut informasi rekening kami:
        </motion.p>
        {bankAccounts.map((acc, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: i * 0.15 }} viewport={{ once: true }}
            className="bg-black/20 backdrop-blur-md border border-champagne/20 rounded-xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne" fill="currentColor"><path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zM2 5l8-3 8 3-8 3-8-3z" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/50 uppercase tracking-widest">{acc.bank}</p>
              <p className="text-sm sm:text-base text-champagne font-semibold tracking-wider">{acc.number}</p>
              <p className="text-xs text-white/70">a.n {acc.holder}</p>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => copy(acc.number, i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer ${
                copiedIdx === i ? 'bg-green-500/80 text-white scale-110' : 'bg-champagne/20 text-champagne hover:bg-champagne/30'
              }`}>
              {copiedIdx === i
                ? <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                : <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
              }
            </motion.button>
          </motion.div>
        ))}
        {copiedIdx !== null && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-center text-green-400 text-sm font-sans">
            Berhasil disalin!
          </motion.p>
        )}
      </div>
    </Section>
  )
}

// ─── 10. WISHES BOARD ────────────────────────────────────────────────
interface Wish { name: string; status: string; message: string; timestamp: string }

function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    try { const s = localStorage.getItem('weddingWishes'); if (s) setWishes(JSON.parse(s)) } catch {}
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    const newWish: Wish = {
      name: esc(name.trim()), status: esc(status.trim()), message: esc(message.trim()),
      timestamp: new Date().toLocaleString('id-ID'),
    }
    const updated = [newWish, ...wishes]
    setWishes(updated)
    localStorage.setItem('weddingWishes', JSON.stringify(updated))
    setName(''); setStatus(''); setMessage('')
    setSuccess(true); setTimeout(() => setSuccess(false), 3000)
    try { await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newWish) }) } catch {}
    setSubmitting(false)
  }

  return (
    <Section>
      <div className="space-y-6">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] text-center font-sans mb-2">Ucapan & Doa</motion.p>
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-black/20 backdrop-blur-md border border-champagne/20 rounded-xl p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">Nama Anda</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">Status / Hubungan</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Teman, Sahabat, Keluarga, dll."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[11px] text-white/60 uppercase tracking-widest mb-1.5 font-sans">Ucapan & Doa</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} placeholder="Tulis ucapan dan doa Anda..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-champagne/60 transition-colors duration-200 resize-none" />
          </div>
          <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 bg-champagne/20 border border-champagne/40 text-champagne font-sans text-sm font-medium rounded-lg hover:bg-champagne/30 transition-colors duration-300 cursor-pointer disabled:opacity-50">
            {submitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
          <AnimatePresence>
            {success && (
              <motion.p key="s" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-sm text-center font-sans">
                Berhasil dikirim! Terima kasih atas doa dan ucapannya
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
        <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
          <AnimatePresence>
            {wishes.length === 0 ? (
              <p className="text-center text-white/40 text-sm font-sans py-8">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              wishes.map((w, i) => (
                <motion.div key={`${w.timestamp}-${i}`} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }} className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-champagne" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-sm font-medium text-champagne font-sans">{w.name}</p>
                        {w.status && <span className="text-[10px] text-white/40 font-sans">— {w.status}</span>}
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
    </Section>
  )
}

// ─── 11. CLOSING ─────────────────────────────────────────────────────
function Closing() {
  return (
    <Section>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={spring} viewport={{ once: true, margin: '-100px' }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.2 }} viewport={{ once: true }}
          className="text-white/70 text-sm font-sans mb-2">Kami yang berbahagia</motion.p>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
          className="w-10 h-[1px] bg-champagne/40 mx-auto mb-4 origin-center" />
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 }} viewport={{ once: true }}
          className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-white text-shadow-glow mb-4">Sarah &amp; Ryan</motion.h2>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
          className="w-10 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center" />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.6 }} viewport={{ once: true }}
          className="text-white/60 text-xs sm:text-sm font-sans mb-8 leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.7 }} viewport={{ once: true }}
          className="text-white/50 text-xs font-sans italic">Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ ...spring, delay: 0.9 }} viewport={{ once: true }}
          className="mt-10 flex justify-center">
          <svg viewBox="0 0 120 80" className="w-28 h-20 sm:w-36 sm:h-24 text-champagne/30" fill="currentColor">
            <circle cx="40" cy="20" r="8" />
            <path d="M40 30 Q30 40 28 50 Q26 60 30 68 L34 68 Q32 60 34 52 Q36 44 40 40 Q44 44 46 52 Q48 60 46 68 L50 68 Q54 60 52 50 Q50 40 40 30Z" />
            <circle cx="80" cy="20" r="8" />
            <path d="M80 30 Q70 40 68 50 Q66 60 70 68 L74 68 Q72 60 74 52 Q76 44 80 40 Q84 44 86 52 Q88 60 86 68 L90 68 Q94 60 92 50 Q90 40 80 30Z" />
            <path d="M40 50 Q60 42 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
        </motion.div>
      </motion.div>
    </Section>
  )
}

// ─── MUSIC PLAYER ────────────────────────────────────────────────────
function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [show, setShow] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/img/wedding-music.mp3')
    audio.loop = true
    audioRef.current = audio
    setShow(true)
    const handler = () => {
      if (audioRef.current && !playing) { audioRef.current.play().catch(() => {}); setPlaying(true) }
    }
    document.addEventListener('click', handler, { once: true })
    return () => { document.removeEventListener('click', handler); audio.pause() }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause(); else audioRef.current.play().catch(() => {})
    setPlaying(!playing)
  }

  if (!show) return null

  return (
    <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 1 }}
      onClick={toggle}
      className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-champagne/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors duration-300"
      aria-label={playing ? 'Pause musik' : 'Putar musik'}>
      <motion.svg animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
        viewBox="0 0 24 24" className="w-6 h-6 text-champagne" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </motion.svg>
    </motion.button>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function InvitationPage() {
  const [invitationOpened, setInvitationOpened] = useState(false)
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  if (!invitationOpened) {
    return (
      <div className="fixed inset-0 w-full h-full bg-emerald-velvet">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-floral.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-velvet/80 via-emerald-deep/70 to-black/60" />
        <Cover onOpen={() => setInvitationOpened(true)} />
      </div>
    )
  }

  return (
    <main className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory bg-emerald-velvet">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-floral.jpg')" }} />
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-velvet/80 via-emerald-deep/70 to-black/70" />

      <div className="relative z-10">
        <section id="initial"><Initial /></section>
        <section id="quran"><QuranVerse /></section>
        <section id="couple"><Couple /></section>
        <section id="date"><SaveDate /></section>
        <section id="event"><Events /></section>
        <section id="gallery"><Gallery /></section>
        <section id="gift"><Gift /></section>
        <section id="wishes"><Wishes /></section>
        <section id="closing"><Closing /></section>

        <footer className="relative z-20 text-center py-8 px-6 bg-black/20 backdrop-blur-sm border-t border-champagne/10">
          <p className="text-white/50 text-[11px] font-sans">Terima kasih atas kehadiran dan doa restunya</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-white/40 text-[11px] font-sans">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>11 Juli 2026</span>
          </div>
          <p className="font-calligraphy text-sm text-champagne/60 mt-2">Sarah &amp; Ryan</p>
        </footer>
      </div>

      <MusicPlayer />

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-black/40 backdrop-blur-xl border-t border-champagne/15 px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-white/50 hover:text-champagne transition-colors duration-200 cursor-pointer group">
              <span className="text-[9px] font-sans tracking-wider whitespace-nowrap group-hover:text-champagne transition-colors">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  )
}
