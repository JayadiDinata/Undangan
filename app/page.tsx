'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence, type Easing } from 'framer-motion'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

// ─── EASING ─────────────────────────────────────────────────────────
const easeOut: Easing = [0.22, 1, 0.36, 1]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { margin: '-40px' },
    transition: { duration: 0.6, delay, ease: easeOut },
  }
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { margin: '-40px' },
    transition: { duration: 0.5, delay, ease: easeOut },
  }
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { margin: '-40px' },
    transition: { duration: 0.5, delay, ease: easeOut },
  }
}

// ─── DATA ────────────────────────────────────────────────────────────
const targetDate = new Date('2026-07-11T09:00:00+08:00')

const couples = {
  bride: { name: 'Sarah Saraswati', title: 'S.Ds.', parents: 'Putri dari Bapak Alex Budiman & Ibu Dewi Lestari', img: '/img/SR4.jpeg' },
  groom: { name: 'Ryan Malik Azhar', title: 'S.H.', parents: 'Putra dari Bapak Hendra Malik & Ibu Rina Fitriani', img: '/img/SR4.jpeg' },
}

const galleryImages = [
  { src: '/img/SR.jpeg', alt: 'Prewedding 1' },
  { src: '/img/SR2.jpeg', alt: 'Prewedding 2' },
  { src: '/img/SR3.jpeg', alt: 'Prewedding 3' },
  { src: '/img/SR4.jpeg', alt: 'Prewedding 4' },
  { src: '/img/SR1-Photoroom (1).png', alt: 'Prewedding 5' },
  { src: '/img/Gemini_Generated_Image_swa8fzswa8fzswa8.png', alt: 'Prewedding 6' },
]

const bankAccounts = [
  { bank: 'Bank BCA', number: '1234567890', holder: 'Sarah Saraswati' },
  { bank: 'Bank Mandiri', number: '9876543210', holder: 'Ryan Malik Azhar' },
]

const loveStory = [
  { title: 'Pertemuan Pertama', date: 'Januari 2020', desc: 'Berawal dari sebuah acara seminar, kami berdua dipertemukan. Tanpa sengaja duduk bersebelahan dan berbincang hingga akhir acara.', img: '/img/SR1.jpeg' },
  { title: 'Mulai Serius', date: 'Maret 2022', desc: 'Setelah dua tahun saling mengenal, kami memutuskan untuk melangkah ke jenjang yang lebih serius. Restu kedua orang tua menjadi kekuatan kami.', img: '/img/SR2.jpeg' },
  { title: 'Lamaran', date: 'Desember 2025', desc: 'Dengan penuh haru dan bahagia, proses lamaran berlangsung lancar dihadiri oleh keluarga besar kedua belah pihak.', img: '/img/SR3.jpeg' },
  { title: 'Pernikahan', date: 'Juli 2026', desc: 'Akhirnya tibalah hari yang dinanti. Dengan mengucap bismillah, kami berdua sah menjadi pasangan suami istri.', img: '/img/SR4.jpeg' },
]

const events = [
  { title: 'Akad Nikah', date: 'Sabtu, 11 Juli 2026', time: '09:00 - 10:00 WITA', location: 'Grand Sulanjana', address: 'Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat', mapUrl: 'https://maps.google.com/?q=Grand+Sulanjana+Bandung' },
  { title: 'Resepsi', date: 'Sabtu, 11 Juli 2026', time: '11:00 - Selesai', location: 'Grand Sulanjana', address: 'Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat', mapUrl: 'https://maps.google.com/?q=Grand+Sulanjana+Bandung' },
]

const navItems = [
  { id: 'cover', label: 'Cover' },
  { id: 'bride', label: 'Pasangan' },
  { id: 'schedule', label: 'Acara' },
  { id: 'lovestory', label: 'Cerita' },
  { id: 'gallery', label: 'Galeri' },
  { id: 'wishes', label: 'Ucapan' },
]

const WEBHOOK_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE'

// ─── HELPERS ─────────────────────────────────────────────────────────
function esc(text: string): string {
  const d = document.createElement('div')
  d.appendChild(document.createTextNode(text))
  return d.innerHTML
}

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
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
]

// ─── FIREFLIES ───────────────────────────────────────────────────────
function Fireflies({ count = 8 }: { count?: number }) {
  return (
    <ul className="m-0 p-0" style={{ listStyle: 'none' }}>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="firefly" />
      ))}
    </ul>
  )
}

// ─── DECORATIVE ELEMENTS ────────────────────────────────────────────
const decoConfig = [
  { src: '/img/sk-a.png', cls: 'top-0 left-0 w-16 sm:w-20', floatY: -6, dur: 3.5, x: '-30%', y: '-30%' },
  { src: '/img/sk-b.png', cls: 'top-0 right-0 w-14 sm:w-16', floatY: -8, dur: 4.2, x: '30%', y: '-30%' },
  { src: '/img/sk-c.png', cls: 'bottom-0 left-0 w-14 sm:w-16', floatY: 6, dur: 3.8, x: '-30%', y: '30%' },
  { src: '/img/sk-a.png', cls: 'bottom-0 right-0 w-16 sm:w-20', floatY: -7, dur: 4.5, x: '30%', y: '30%' },
]

function Decorations() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {decoConfig.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: easeOut }}
          className={`absolute ${d.cls}`}
          style={{ transform: `translate(${d.x}, ${d.y})` }}
        >
          <motion.img
            src={d.src}
            alt=""
            className="w-full h-full opacity-25"
            animate={{ y: [0, d.floatY, 0] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ─── HERO COVER GATE ────────────────────────────────────────────────
function CoverGate({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false)
  const [hovering, setHovering] = useState(false)
  const handleOpen = () => { setOpened(true); setTimeout(onOpen, 400) }

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="cover-gate"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: '#3E160C' }}
        >
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: "url('/img/SR.jpeg')" }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.1) 0%, rgba(62,22,12,0.6) 40%, rgba(62,22,12,0.95) 100%)' }}
          />
          <Fireflies count={8} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="relative z-20 w-[85vw] max-w-sm mx-auto bg-cream/5 backdrop-blur-xl border border-cream/20 rounded-3xl px-6 py-8 text-center shadow-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
              className="text-cream/60 text-[10px] uppercase tracking-[0.2em] font-content mb-4"
            >
              Undangan Pernikahan
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8, ease: easeOut }}
              className="font-title text-5xl sm:text-6xl text-cream leading-tight"
            >
              Sarah
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: easeOut }}
              className="font-serif text-cream/60 text-xl italic my-1"
            >
              &amp;
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: easeOut }}
              className="font-title text-5xl sm:text-6xl text-cream leading-tight mb-4"
            >
              Ryan
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: easeOut }}
              className="w-10 h-px bg-cream/30 mx-auto mb-4"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5, ease: easeOut }}
              className="text-cream/50 text-xs font-content mb-6"
            >
              Sabtu, 11 Juli 2026
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7, ease: easeOut }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-cream/10 border border-cream/30 rounded-full text-cream text-sm font-content font-medium tracking-wider overflow-hidden group cursor-pointer"
              >
                <motion.span
                  animate={hovering ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
                <span>Buka Undangan</span>
                <motion.div
                  animate={hovering ? { opacity: 1 } : { opacity: 0 }}
                  className="absolute inset-0 bg-cream/10 rounded-full -z-10"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── COUNTDOWN ───────────────────────────────────────────────────────
function Countdown() {
  const [tl, setTl] = useState<TL>({ days: '--', hours: '--', minutes: '--', seconds: '--' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTl(calcTL(targetDate))
    const id = setInterval(() => setTl(calcTL(targetDate)), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex justify-center gap-3">
      {cdItems.map(({ key, label }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: easeOut }}
          className="flex flex-col items-center min-w-[48px]"
        >
          <div className="bg-cream/10 backdrop-blur-md border border-cream/10 rounded-xl px-2 py-1.5 w-full text-center">
            <span className="block font-serif text-lg sm:text-xl font-bold text-cream">{tl[key]}</span>
          </div>
          <span className="text-[9px] text-cream/50 uppercase tracking-wider mt-1 font-content">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── COVER HERO SECTION ─────────────────────────────────────────────
function CoverSection() {
  return (
    <section id="cover" className="relative w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <p className="text-cream/60 text-xs uppercase tracking-[0.2em] font-content mb-4">
              Undangan Pernikahan
            </p>
            <h1 className="font-title text-5xl sm:text-7xl text-cream leading-tight">Sarah</h1>
            <p className="font-serif text-cream/60 text-2xl italic my-2">&amp;</p>
            <h1 className="font-title text-5xl sm:text-7xl text-cream leading-tight">Ryan</h1>
          </div>
        }
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR.jpeg')" }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.1) 0%, rgba(62,22,12,0.8) 100%)' }} />
          <Decorations />
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-5 text-center">
            <p className="text-cream/50 text-xs font-content mb-1">Sabtu, 11 Juli 2026</p>
            <p className="text-cream/40 text-[10px] font-content mb-6">Grand Sulanjana, Bandung</p>
            <Countdown />
            <p className="text-cream/30 text-[9px] font-content mt-6 animate-bounce">Scroll ke bawah</p>
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}

// ─── QUOTE SECTION (Uiverse logo card adapted) ─────────────────────
function QuoteSection() {
  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR2.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.4) 0%, rgba(62,22,12,0.85) 100%)' }} />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="quran-card"
        >
          <div className="quran-card-border" />
          <div className="quran-card-content">
            <div className="quran-card-header">
              <p className="font-serif text-[#bd9f67] text-xs italic tracking-wider mb-3">QS. Ar-Rum Ayat 21</p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="text-lg text-cream leading-[2.2] mb-4 font-arabic quran-verse"
            >
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
              className="w-8 h-px bg-[#bd9f67]/40 mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
              className="text-cream/60 text-xs leading-relaxed italic"
            >
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </motion.p>
          </div>
          <span className="quran-card-bottom">Ar-Rum · 21</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── COUPLES CARD (Uiverse-style) ────────────────────────────────────
function CouplesCard({ person, delay, isGroom }: { person: typeof couples.bride; delay: number; isGroom: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className="w-full flex justify-center cursor-pointer"
      onClick={() => setExpanded(f => !f)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={`uiverse-card ${expanded ? 'expanded' : ''}`}>
        <img src={person.img} alt={person.name} className="uiverse-card-img" />
        <div className="uiverse-card-overlay" />
        <div className="uiverse-dots">
          <span className="uiverse-dot-red" />
          <span className="uiverse-dot-yellow" />
          <span className="uiverse-dot-green" />
        </div>
        <div className="uiverse-card-bottom">
          <p className="text-cream text-xl sm:text-2xl font-title leading-tight mb-0.5">{person.name}</p>
          <p className="text-cream/70 text-xs font-content">{isGroom ? 'Laki-laki' : 'Perempuan'}</p>
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-32 mt-2' : 'max-h-0'}`}>
            <div className="w-6 h-px bg-cream/20 mx-auto mb-2" />
            <p className="text-cream/50 text-[10px] font-content leading-relaxed">{person.parents}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── COUPLES SECTION ─────────────────────────────────────────────────
function CouplesSection() {
  return (
    <section id="bride" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.85) 100%)' }} />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-5xl px-5 md:px-6">
        <motion.p {...fadeIn(0)} className="text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-8">
          Pasangan Pengantin
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-lg mx-auto md:max-w-none">
          <CouplesCard person={couples.bride} delay={0.1} isGroom={false} />
          <CouplesCard person={couples.groom} delay={0.2} isGroom={true} />
        </div>

        <motion.div {...scaleIn(0.3)} className="flex justify-center mt-6">
          <div className="text-cream/30 text-3xl font-serif italic">&amp;</div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── SCHEDULE SECTION ────────────────────────────────────────────────
function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR3.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.4) 0%, rgba(62,22,12,0.9) 100%)' }} />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6">
        <motion.p {...fadeIn(0)} className="text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-5">
          Susunan Acara
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="bg-cream/5 backdrop-blur-xl border border-cream/15 rounded-3xl p-5 md:p-6 space-y-5"
        >
          {events.map((ev, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
                className="text-center"
              >
                <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <p className="font-serif text-lg text-cream font-semibold mb-1">{ev.title}</p>
                <p className="text-cream/70 text-xs font-content mb-0.5">{ev.date}</p>
                <p className="text-cream/50 text-xs font-content mb-2">{ev.time}</p>
                <p className="text-cream text-sm font-content font-medium">{ev.location}</p>
                <p className="text-cream/40 text-[10px] font-content mb-3">{ev.address}</p>
                <motion.a
                  href={ev.mapUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/25 text-cream text-xs font-content rounded-xl hover:bg-cream/20 transition-colors duration-300 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Buka Google Maps
                </motion.a>
              </motion.div>
              {i < events.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ margin: '-40px' }}
                  transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
                  className="h-px w-3/4 mx-auto my-4 bg-cream/10"
                  style={{ borderTop: '1px dashed rgba(232, 217, 196, 0.2)' }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── LOVE STORY SECTION ──────────────────────────────────────────────
function LoveStorySection() {
  return (
    <section id="lovestory" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR2.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(62,22,12,0.85)' }} />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6">
        <motion.h2 {...fadeIn(0)} className="font-title text-3xl text-cream text-center mb-1">Kisah Cinta</motion.h2>
        <motion.p {...fadeIn(0.05)} className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-content text-center mb-6">
          Love Story
        </motion.p>

        <div className="relative">
          <div className="timeline-line" />
          {loveStory.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: easeOut }}
              className="relative mb-5 last:mb-0 love-story-item"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="bg-cream/5 backdrop-blur-md border border-cream/10 overflow-hidden max-w-xs mx-auto love-story-card">
                <motion.div
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ margin: '-40px' }}
                  transition={{ duration: 1.2, ease: easeOut }}
                  className="w-full h-36 sm:h-44 bg-cover bg-center love-story-img"
                  style={{ backgroundImage: `url('${story.img}')` }}
                />
                <div className="p-4">
                  <p className="text-cream/40 text-[9px] font-content uppercase tracking-wider mb-0.5">{story.date}</p>
                  <p className="font-title text-lg text-cream mb-1.5">{story.title}</p>
                  <p className="text-cream/60 text-xs font-content leading-relaxed">{story.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...scaleIn(0.4)} className="flex justify-center mt-5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream/40" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

// ─── GALLERY SECTION ─────────────────────────────────────────────────
function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR4.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.85) 100%)' }} />
      <Decorations />

      <motion.p {...fadeIn(0)} className="relative z-20 text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-6">
        Galeri Foto
      </motion.p>

      <div className="relative z-20 w-full">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-1 md:gap-2 lg:gap-3 px-5 md:px-6 pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: easeOut }}
              className="snap-start shrink-0 w-[90vw] md:w-[calc(50vw-2rem)] lg:w-[calc(50vw-2rem)] max-w-md"
              onClick={() => setSelected(i)}
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-cream/15 shadow-lg cursor-pointer group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-cream/15 shadow-2xl"
            >
              <img src={galleryImages[selected].src} alt={galleryImages[selected].alt} className="w-full h-full object-contain" />
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream/15 backdrop-blur-md border border-cream/30 flex items-center justify-center text-cream cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── BANK ACCOUNT CARD ───────────────────────────────────────────────
function BankAccountCard({ bank, number, holder, idx, copied, onCopy, color }: {
  bank: string; number: string; holder: string; idx: number; copied: boolean; onCopy: () => void; color: string
}) {
  const bankColors: { [key: string]: { border: string; bg: string; text: string } } = {
    bca: { border: 'border-blue-400/40', bg: 'from-blue-500/10 to-blue-600/5', text: 'text-blue-300' },
    mandiri: { border: 'border-red-400/40', bg: 'from-red-500/10 to-red-600/5', text: 'text-red-300' },
  }

  const scheme = bankColors[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-40px' }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: easeOut }}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${scheme.bg} backdrop-blur-md rounded-2xl border ${scheme.border} cursor-pointer transition-all duration-300 hover:shadow-lg`}
        onClick={onCopy}
      >
        <div className="flex items-center h-24 sm:h-28">
          <motion.div
            initial={false}
            animate={{ width: copied ? '25%' : '0%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ scale: copied ? 1 : 0, rotate: copied ? 360 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 24 24" className={`w-6 h-6 ${scheme.text}`} fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="flex-1 px-4 py-4">
            <motion.div animate={{ opacity: copied ? 0 : 1 }} transition={{ duration: 0.2 }}>
              <p className="text-[9px] text-cream/40 uppercase tracking-widest font-content mb-1">{bank}</p>
              <p className={`text-sm sm:text-base font-semibold tracking-wider ${scheme.text} font-content`}>{number}</p>
              <p className="text-[9px] text-cream/50 mt-1 font-content">a.n {holder}</p>
            </motion.div>
            <motion.div
              animate={{ opacity: copied ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 ${scheme.text}`} fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <p className={`text-sm font-medium ${scheme.text}`}>Terima Kasih!</p>
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: copied ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="pr-4"
          >
            <span className="text-[10px] text-cream/50 font-content border border-cream/20 rounded-lg px-3 py-1.5">
              Terima Kasih
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── GIFT SECTION ────────────────────────────────────────────────────
function GiftSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = async (text: string, idx: number) => {
    try { await navigator.clipboard.writeText(text) } catch {
      const ta = document.createElement('textarea'); ta.value = text
      ta.style.position = 'fixed'; ta.style.opacity = '0'
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2500)
  }

  const bankColorMap: { [key: string]: string } = { 'Bank BCA': 'bca', 'Bank Mandiri': 'mandiri' }

  return (
    <section id="gift" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-5xl px-5 md:px-6">
        <motion.p {...fadeIn(0)} className="text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-2">
          Wedding Gift
        </motion.p>
        <motion.p {...fadeIn(0.05)} className="text-center text-cream/60 text-sm font-content leading-relaxed max-w-md mx-auto mb-5">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah, berikut informasi rekening kami:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto md:max-w-none">
          {bankAccounts.map((acc, i) => (
            <BankAccountCard
              key={i}
              bank={acc.bank}
              number={acc.number}
              holder={acc.holder}
              idx={i}
              copied={copiedIdx === i}
              onCopy={() => copy(acc.number, i)}
              color={bankColorMap[acc.bank] || 'bca'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WISHES SECTION ──────────────────────────────────────────────────
interface Wish { name: string; status: string; message: string; timestamp: string }

function WishesSection() {
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
    <section id="wishes" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6">
        <motion.p {...fadeIn(0)} className="text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-4">
          Ucapan &amp; Doa
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="bg-cream/5 backdrop-blur-md border border-cream/15 rounded-2xl p-4 md:p-5 space-y-3 mb-5"
        >
          <div>
            <label className="block text-[10px] text-cream/50 uppercase tracking-widest mb-1 font-content">Nama Anda</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Masukkan nama Anda"
              className="w-full px-3.5 py-2.5 bg-cream/10 border border-cream/15 rounded-xl text-cream placeholder-cream/30 font-content text-sm focus:outline-none focus:border-cream/50 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[10px] text-cream/50 uppercase tracking-widest mb-1 font-content">Status / Hubungan</label>
            <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Teman, Sahabat, Keluarga, dll."
              className="w-full px-3.5 py-2.5 bg-cream/10 border border-cream/15 rounded-xl text-cream placeholder-cream/30 font-content text-sm focus:outline-none focus:border-cream/50 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[10px] text-cream/50 uppercase tracking-widest mb-1 font-content">Ucapan &amp; Doa</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={3} placeholder="Tulis ucapan dan doa Anda..."
              className="w-full px-3.5 py-2.5 bg-cream/10 border border-cream/15 rounded-xl text-cream placeholder-cream/30 font-content text-sm focus:outline-none focus:border-cream/50 transition-colors duration-200 resize-none" />
          </div>
          <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-cream/15 border border-cream/30 text-cream font-content text-sm font-medium rounded-xl hover:bg-cream/25 transition-colors duration-300 cursor-pointer disabled:opacity-50">
            {submitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
          <AnimatePresence>
            {success && (
              <motion.p key="s" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="text-green-400 text-sm text-center font-content">
                Berhasil dikirim! Terima kasih atas doa dan ucapannya
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="max-h-[350px] overflow-y-auto space-y-3">
          <AnimatePresence>
            {wishes.length === 0 ? (
              <p className="text-center text-cream/40 text-sm font-content py-6">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              wishes.map((w, i) => (
                <motion.div
                  key={`${w.timestamp}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: '-40px' }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-cream/15 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cream" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-sm font-medium text-cream font-content">{w.name}</p>
                        {w.status && <span className="text-[9px] text-cream/40 font-content">— {w.status}</span>}
                      </div>
                      <p className="text-sm text-cream/70 mt-1 leading-relaxed font-content">{w.message}</p>
                      <p className="text-[9px] text-cream/30 mt-1 font-content">{w.timestamp}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ─── CLOSING SECTION ─────────────────────────────────────────────────
function ClosingSection() {
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null)
  const guestName = useRef<HTMLInputElement>(null)
  const [guestSubmitted, setGuestSubmitted] = useState(false)

  const submitAttendance = (e: FormEvent) => {
    e.preventDefault()
    if (!guestName.current?.value.trim()) return
    setGuestSubmitted(true)
  }

  return (
    <section id="closing" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <motion.p {...fadeIn(0.1)} className="text-cream/60 text-sm font-content mb-3">Kami yang berbahagia</motion.p>
          <motion.div {...scaleIn(0.15)} className="w-8 h-px bg-cream/30 mx-auto mb-4" />
          <motion.h2 {...fadeUp(0.2)} className="font-title text-4xl sm:text-5xl text-cream leading-tight mb-3">
            Sarah &amp; Ryan
          </motion.h2>
          <motion.div {...scaleIn(0.25)} className="w-8 h-px bg-cream/30 mx-auto mb-4" />
          <motion.p {...fadeIn(0.3)} className="text-cream/50 text-xs sm:text-sm font-content mb-6 leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
            className="bg-cream/5 backdrop-blur-md border border-cream/15 rounded-2xl p-5 mb-6"
          >
            <p className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-content mb-3">Konfirmasi Kehadiran</p>

            {!guestSubmitted ? (
              <form onSubmit={submitAttendance} className="space-y-3">
                <input
                  ref={guestName}
                  type="text"
                  required
                  placeholder="Nama tamu"
                  className="w-full px-3.5 py-2.5 bg-cream/10 border border-cream/15 rounded-xl text-cream placeholder-cream/30 font-content text-sm focus:outline-none focus:border-cream/50 transition-colors"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    onClick={() => setAttending('yes')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-content font-medium transition-all cursor-pointer ${
                      attending === 'yes' ? 'bg-green-600/40 border border-green-400/40 text-green-300' : 'bg-cream/10 border border-cream/20 text-cream/70 hover:bg-cream/20'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="submit"
                    onClick={() => setAttending('no')}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-content font-medium transition-all cursor-pointer ${
                      attending === 'no' ? 'bg-red-600/40 border border-red-400/40 text-red-300' : 'bg-cream/10 border border-cream/20 text-cream/70 hover:bg-cream/20'
                    }`}
                  >
                    Tidak Hadir
                  </button>
                </div>
              </form>
            ) : (
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-cream/70 text-sm font-content"
              >
                Terima kasih atas konfirmasinya 🙏
              </motion.p>
            )}
          </motion.div>

          <motion.p {...fadeIn(0.35)} className="text-cream/40 text-xs font-content italic">
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </motion.p>
        </motion.div>
      </div>
    </section>
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
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: easeOut }}
      onClick={toggle}
      className="fixed bottom-20 right-4 z-50 w-11 h-11 rounded-full bg-brown-dark/60 backdrop-blur-md border border-cream/20 flex items-center justify-center cursor-pointer hover:bg-brown-dark/80 transition-colors duration-300"
      aria-label={playing ? 'Pause musik' : 'Putar musik'}
    >
      <motion.svg
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
        viewBox="0 0 24 24" className="w-5 h-5 text-cream" fill="currentColor"
      >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </motion.svg>
    </motion.button>
  )
}

// ─── MAIN CONTENT ────────────────────────────────────────────────────
function MainContent() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main className="relative w-full min-h-screen">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-floral.jpg')" }} />
      <div className="fixed inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.8) 100%)' }} />

      <div className="relative z-[2]">
        <ZoomParallax images={galleryImages} />
        <CoverSection />
        <QuoteSection />
        <CouplesSection />
        <ScheduleSection />
        <LoveStorySection />
        <GallerySection />
        <GiftSection />
        <WishesSection />
        <ClosingSection />

        <footer className="relative text-center py-6 px-5 border-t border-cream/5">
          <p className="text-cream/40 text-[10px] font-content">Terima kasih atas kehadiran dan doa restunya</p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-cream/30 text-[10px] font-content">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>11 Juli 2026</span>
          </div>
          <p className="font-title text-sm text-cream/40 mt-1.5">Sarah &amp; Ryan</p>
        </footer>
      </div>

      <MusicPlayer />

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-brown-dark/60 backdrop-blur-xl border-t border-cream/10 px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex justify-around items-center">
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-cream/40 hover:text-cream transition-colors duration-200 cursor-pointer group">
              <span className="text-[9px] font-content tracking-wider whitespace-nowrap group-hover:text-cream transition-colors">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────
export default function InvitationPage() {
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      {/* ── Envelope Section (first, part of page flow) ── */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-floral.jpg')" }} />
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.8) 100%)' }} />
        <div
          className={`relative z-[2] envelope-card ${revealed ? 'revealed' : ''}`}
          onClick={() => setRevealed(prev => !prev)}
        >
          <div className="envelope-first">
            <img src="/img/tutup.png" alt="Buka Undangan" className="w-full h-full object-contain p-6" />
          </div>
          <div className="envelope-second relative">
            <img src="/img/buka.png" alt="Undangan" className="w-full h-full object-contain" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-title text-lg md:text-xl text-brown-dark text-center whitespace-nowrap">Sarah &amp; Ryan</p>
          </div>
        </div>
      </section>

      {/* ── Main Content (scrollable after envelope) ── */}
      <MainContent />
    </>
  )
}
