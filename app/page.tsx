'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, type Target, type Easing } from 'framer-motion'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

// ─── DATA ────────────────────────────────────────────────────────────
const targetDate = new Date('2026-07-11T09:00:00+08:00')

const couples = {
  bride: { name: 'Sarah Saraswati', title: 'S.Ds.', parents: 'Putri dari Bapak Alex Budiman & Ibu Dewi Lestari', img: '/img/SR4.jpeg' },
  groom: { name: 'Ryan Malik Azhar', title: 'S.H.', parents: 'Putra dari Bapak Hendra Malik & Ibu Rina Fitriani', img: '/img/SR4.jpeg' },
}

const galleryImages = [
  { src: '/img/SR1.jpeg', alt: 'Prewedding 1' },
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
  {
    title: 'Pertemuan Pertama',
    date: 'Januari 2020',
    desc: 'Berawal dari sebuah acara seminar, kami berdua dipertemukan. Tanpa sengaja duduk bersebelahan dan berbincang hingga akhir acara.',
    img: '/img/SR1.jpeg',
  },
  {
    title: 'Mulai Serius',
    date: 'Maret 2022',
    desc: 'Setelah dua tahun saling mengenal, kami memutuskan untuk melangkah ke jenjang yang lebih serius. Restu kedua orang tua menjadi kekuatan kami.',
    img: '/img/SR2.jpeg',
  },
  {
    title: 'Lamaran',
    date: 'Desember 2025',
    desc: 'Dengan penuh haru dan bahagia, proses lamaran berlangsung lancar dihadiri oleh keluarga besar kedua belah pihak.',
    img: '/img/SR3.jpeg',
  },
  {
    title: 'Pernikahan',
    date: 'Juli 2026',
    desc: 'Akhirnya tibalah hari yang dinanti. Dengan mengucap bismillah, kami berdua sah menjadi pasangan suami istri.',
    img: '/img/SR4.jpeg',
  },
]

const events = [
  {
    title: 'Akad Nikah',
    date: 'Sabtu, 11 Juli 2026',
    time: '09:00 - 10:00 WITA',
    location: 'Grand Sulanjana',
    address: 'Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat',
    mapUrl: 'https://maps.google.com/?q=Grand+Sulanjana+Bandung',
  },
  {
    title: 'Resepsi',
    date: 'Sabtu, 11 Juli 2026',
    time: '11:00 - Selesai',
    location: 'Grand Sulanjana',
    address: 'Jl. Sulanjana No. 123, Kota Bandung, Jawa Barat',
    mapUrl: 'https://maps.google.com/?q=Grand+Sulanjana+Bandung',
  },
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
  { key: 'days', label: 'Hari' }, { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' }, { key: 'seconds', label: 'Detik' },
]

const easeSmooth: Easing = [0.16, 1, 0.3, 1]
const fadeIn = (delay = 0) => ({ duration: 1, delay, ease: easeSmooth })
const fadeUp = (delay = 0) => ({ duration: 1.1, delay, ease: easeSmooth })

function vw(config: { initial: Target; animate: Target }) {
  return { initial: config.initial, whileInView: config.animate, viewport: { once: true, margin: '-40px' } } as const
}

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

// ─── DECORATIVE EDGE PNGs ────────────────────────────────────────────
const decoConfig = [
  { src: '/img/sk-a.png', className: 'top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-24 sm:w-28', floatY: -6, dur: 3.5 },
  { src: '/img/sk-b.png', className: 'top-0 right-0 translate-x-1/3 -translate-y-1/3 w-20 sm:w-24', floatY: -8, dur: 4.2 },
  { src: '/img/sk-c.png', className: 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-20 sm:w-24', floatY: 6, dur: 3.8 },
  { src: '/img/sk-a.png', className: 'bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-24 sm:w-28', floatY: -7, dur: 4.5 },
]

function Decorations() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {decoConfig.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: easeSmooth }}
          className={`absolute ${d.className}`}
        >
          <motion.img
            src={d.src}
            alt=""
            className="w-full h-full opacity-30"
            animate={{ y: [0, d.floatY, 0] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ─── COVER GATE ──────────────────────────────────────────────────────
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
          transition={{ duration: 0.4, ease: easeSmooth }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: '#3E160C', willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR.jpeg')" }} />
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.2) 0%, rgba(62,22,12,0.7) 40%, rgba(62,22,12,0.95) 100%)' }} />
          <Fireflies count={8} />
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: easeSmooth }}
            className="relative z-20 text-center px-6 max-w-md"
          >
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: easeSmooth }}
              className="text-cream/60 text-sm uppercase tracking-[0.25em] font-content mb-6"
            >
              Undangan Pernikahan
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -40, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: easeSmooth }}
              className="font-title text-6xl sm:text-7xl text-cream leading-tight mb-2"
            >
              Sarah
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.1, ease: easeSmooth }}
              className="font-serif text-cream/80 text-xl italic my-1"
            >
              &amp;
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.3, ease: easeSmooth }}
              className="font-title text-6xl sm:text-7xl text-cream leading-tight mb-6"
            >
              Ryan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: easeSmooth }}
              className="text-cream/50 text-xs font-content mb-8"
            >
              Sabtu, 11 Juli 2026
            </motion.p>

            {/* Enhanced Open Button with UIVerse Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.9, ease: easeSmooth }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="relative inline-flex items-center justify-center group"
            >
              <div className="relative w-52 h-12 overflow-hidden rounded-full border-2 border-cream/40 bg-gradient-to-r from-cream/5 to-cream/10 backdrop-blur-md cursor-pointer"
                onClick={handleOpen}
              >
                {/* Hover expanding background */}
                <motion.div
                  animate={hovering ? { left: '0%', width: '100%' } : { left: '50%', width: '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-y-0 bg-gradient-to-r from-cream/20 to-cream/10 rounded-full"
                />

                {/* Content */}
                <motion.div
                  animate={hovering ? { x: 15 } : { x: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10 flex items-center justify-center h-full gap-2"
                >
                  <motion.div
                    animate={hovering ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream" fill="currentColor">
                      <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </motion.div>
                  <span className="text-cream font-content text-sm font-medium tracking-wider">Buka Undangan</span>
                </motion.div>

                {/* Glow effect on hover */}
                <motion.div
                  animate={hovering ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-cream/10 to-cream/5 -z-10"
                />
              </div>

              {/* Pulse effect */}
              <motion.div
                animate={{ scale: hovering ? 1.15 : 1, opacity: hovering ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full border-2 border-cream/30 -z-20"
              />
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
    setMounted(true); setTl(calcTL(targetDate))
    const id = setInterval(() => setTl(calcTL(targetDate)), 1000)
    return () => clearInterval(id)
  }, [])
  if (!mounted) return null

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {cdItems.map(({ key, label }, i) => (
        <motion.div key={key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={fadeIn(0.05 + i * 0.04)}
          className="flex flex-col items-center min-w-[60px] sm:min-w-[72px]">
          <div className="cover-blur border border-cream/20 rounded-xl px-3 py-3 sm:px-4 sm:py-4 w-full text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-cream">{tl[key]}</span>
          </div>
          <span className="text-[10px] text-cream/60 uppercase tracking-wider mt-1.5 font-content">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── SECTIONS ────────────────────────────────────────────────────────
function CoverSection() {
  return (
    <section id="cover" className="relative w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeSmooth }}
              className="text-cream/80 text-sm uppercase tracking-[0.3em] font-content mb-4"
            >
              Undangan Pernikahan
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: easeSmooth }}
              className="font-title text-5xl md:text-6xl text-cream leading-tight"
            >
              Sarah
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: easeSmooth }}
              className="font-serif text-cream/60 text-2xl italic my-1"
            >
              &amp;
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: easeSmooth }}
              className="font-title text-5xl md:text-6xl text-cream leading-tight"
            >
              Ryan
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.65, ease: easeSmooth }}
              className="w-12 h-[1px] bg-cream/30 mx-auto my-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.75, ease: easeSmooth }}
              className="text-cream/60 text-sm font-content"
            >
              Sabtu, 11 Juli 2026
            </motion.p>
          </div>
        }
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/img/SR.jpeg')" }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.1) 0%, rgba(62,22,12,0.6) 100%)' }}
          />
          <Decorations />
        </div>
      </ContainerScroll>
      <div className="relative w-full max-w-sm mx-auto px-6 py-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content mb-6"
        >
          Menuju Hari Bahagia
        </motion.p>
        <Countdown />
      </div>
    </section>
  )
}

function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })
  const cardRotate = useTransform(scrollYProgress, [0, 1], [30, 0])

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR2.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.8) 100%)' }} />
      <Decorations />
      <motion.div
        style={{ rotate: isMobile ? 0 : cardRotate, transformOrigin: 'bottom left' }}
        className="relative z-20 w-full max-w-sm px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeUp(0)}
          className="cover-blur border border-cream/20 rounded-2xl p-6 sm:p-8 text-center"
        >
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={fadeIn(0.1)}
            className="font-serif text-cream/70 text-xs sm:text-sm italic mb-4">
            QS. Ar-Rum Ayat 21
          </motion.p>
          <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={fadeUp(0.2)}
            className="text-lg sm:text-xl text-cream leading-[2] mb-4 font-arabic">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: easeSmooth }}
            className="w-10 h-[1px] bg-cream/30 mx-auto mb-4" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={fadeIn(0.4)}
            className="text-cream/70 text-xs sm:text-sm leading-relaxed italic">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
            dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function CouplesCard({ person, delay, isGroom }: { person: typeof couples.bride; delay: number; isGroom: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: isGroom ? 40 : -40, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={fadeUp(delay)}
      className="flip-card w-full cursor-pointer"
      onClick={() => setFlipped(f => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* ─── Front Face — Photo ─── */}
        <div className="flip-card-front">
          <img
            src={person.img}
            alt={person.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/80 via-brown-dark/20 to-transparent" />

          {/* Blurred circles decoration */}
          <div className="flip-card-blur-circles">
            <div className="flip-card-circle" />
            <div className="flip-card-circle" />
            <div className="flip-card-circle" />
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center z-10">
            <p className="text-cream text-2xl sm:text-3xl font-title leading-tight">
              {person.name}
            </p>
            <p className="text-cream/70 text-xs sm:text-sm font-content mt-1">
              {isGroom ? '♂' : '♀'} {person.title}
            </p>
          </div>
        </div>

        {/* ─── Back Face — Info ─── */}
        <div className="flip-card-back">
          <div className="flip-card-back-content">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream/10 flex items-center justify-center mb-4 border border-cream/30">
              <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 text-cream" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <p className="text-cream text-xl sm:text-2xl font-title leading-tight mb-2">
              {person.name}
            </p>
            <p className="text-cream/80 text-xs sm:text-sm font-content mb-1">
              {person.title}
            </p>
            <div className="w-8 h-px bg-cream/30 mx-auto my-2" />
            <p className="text-cream/60 text-[10px] sm:text-xs font-content leading-relaxed max-w-[90%]">
              {person.parents}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CouplesSection() {
  return (
    <section
      id="bride"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.7) 100%)' }} />
      <Decorations />
      <div className="relative z-20 w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeIn(0)}
          className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-12"
        >
          Pasangan Pengantin
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-2xl mx-auto">
          <CouplesCard person={couples.bride} delay={0.1} isGroom={false} />
          <CouplesCard person={couples.groom} delay={0.25} isGroom={true} />
        </div>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: easeSmooth }}
          className="flex justify-center mt-12"
        >
          <div className="text-cream/40 text-4xl font-serif italic">&amp;</div>
        </motion.div>
      </div>
    </section>
  )
}

function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR3.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.4) 0%, rgba(62,22,12,0.9) 100%)' }} />
      <Decorations />
      <motion.div className="relative z-20 w-full max-w-sm">
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0)} className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-6">Susunan Acara</motion.p>

        <div className="cover-blur border border-cream/20 rounded-2xl p-5 sm:p-6">
          {events.map((ev, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={fadeUp(0.08 + i * 0.08)}
                className="text-center"
                style={{ willChange: 'transform' }}
              >
                <motion.div {...vw({ initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 } })}
                  transition={fadeUp(0.12 + i * 0.08)}
                  className="w-10 h-10 mx-auto mb-3 rounded-full bg-cream/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </motion.div>
                <p className="font-serif text-xl sm:text-2xl text-cream font-semibold mb-2">{ev.title}</p>
                <p className="text-cream/80 text-xs font-content mb-1">{ev.date}</p>
                <p className="text-cream/60 text-xs font-content mb-3">{ev.time}</p>
                <p className="text-cream text-sm font-content font-medium">{ev.location}</p>
                <p className="text-cream/50 text-xs font-content mb-3">{ev.address}</p>
                <motion.a href={ev.mapUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream/15 border border-cream/30 text-cream text-xs font-content rounded-lg hover:bg-cream/25 transition-colors duration-300 cursor-pointer mb-2">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Buka Google Maps
                </motion.a>
              </motion.div>
              {i < events.length - 1 && (
                <motion.div {...vw({ initial: { scaleX: 0 }, animate: { scaleX: 1 } })}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: easeSmooth }}
                  className="h-[1px] w-3/4 mx-auto my-5 bg-cream/20"
                  style={{ borderTop: '1px dashed rgba(232, 217, 196, 0.3)' }} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function LoveStorySection() {
  return (
    <section id="lovestory" className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR2.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(62,22,12,0.85)' }} />
      <Decorations />
      <motion.div className="relative z-20 w-full max-w-sm">
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0)} className="font-title text-4xl text-cream text-center mb-2">Kisah Cinta</motion.p>
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0.1)} className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-10">Love Story</motion.p>

        <div className="relative">
          <div className="timeline-line" />
          {loveStory.map((story, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={fadeUp(0.08 + i * 0.08)}
              className="relative mb-8 last:mb-0"
              style={{ willChange: 'transform' }}
            >
              <div className="cover-blur border border-cream/15 rounded-xl overflow-hidden max-w-xs mx-auto">
                <motion.div
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: easeSmooth }}
                  className="w-full h-40 sm:h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${story.img}')` }}
                />
                <div className="p-4">
                  <p className="text-cream/50 text-[10px] font-content uppercase tracking-wider mb-1">{story.date}</p>
                  <p className="font-title text-xl text-cream mb-2">{story.title}</p>
                  <p className="text-cream/70 text-xs font-content leading-relaxed">{story.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...vw({ initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 } })}
          transition={{ duration: 0.9, delay: 0.5, ease: easeSmooth }}
          className="flex justify-center mt-6">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-cream/50" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

function AnimatedGallerySection() {
  const [selected, setSelected] = useState<number | null>(null)
  const count = galleryImages.length

  return (
    <section id="gallery" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/SR4.jpeg')" }} />
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.85) 100%)' }} />
      <Decorations />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={fadeIn(0)}
        className="relative z-20 text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-12"
      >
        Galeri Foto
      </motion.p>

      <div className="relative z-20 w-full max-w-xl flex items-center justify-center" style={{ minHeight: '300px' }}>
        <div
          className="gallery-carousel"
          style={{ '--count': count } as React.CSSProperties}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-carousel-card"
              onClick={() => setSelected(i)}
              style={{
                transform: `rotateY(${(360 / count) * i}deg) translateZ(var(--translateZ))`,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
              initial={{ scale: 0.6, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 60 }}
              transition={{ duration: 0.5, ease: easeSmooth }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-cream/20 shadow-2xl"
            >
              <motion.img
                src={galleryImages[selected].src}
                alt={galleryImages[selected].alt}
                animate={{ scale: 1 }}
                className="w-full h-full object-contain"
              />
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.15, backgroundColor: 'rgba(232, 217, 196, 0.4)' }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/20 backdrop-blur-md border-2 border-cream/40 flex items-center justify-center text-cream cursor-pointer hover:border-cream/60 transition-all duration-300 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GallerySection() {
  return <AnimatedGallerySection />
}

function BankAccountCard({ bank, number, holder, idx, copied, onCopy, color }: 
  { bank: string; number: string; holder: string; idx: number; copied: boolean; onCopy: () => void; color: string }) {
  
  const bankColors: { [key: string]: { border: string; bg: string; text: string; glow: string } } = {
    bca: { 
      border: 'border-blue-400/50', 
      bg: 'from-blue-500/15 to-blue-600/5', 
      text: 'text-blue-300',
      glow: 'rgba(96, 165, 250, 0.4)'
    },
    mandiri: { 
      border: 'border-red-400/50', 
      bg: 'from-red-500/15 to-red-600/5', 
      text: 'text-red-300',
      glow: 'rgba(248, 113, 113, 0.4)'
    },
  }

  const colorScheme = bankColors[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={fadeUp(0.12 + idx * 0.12)}
      className="w-full"
    >
      <div 
        className={`relative overflow-hidden ${colorScheme.border} bg-gradient-to-br ${colorScheme.bg} backdrop-blur-md rounded-2xl p-0 group transition-all duration-300 hover:shadow-lg cursor-pointer border-2 h-28 sm:h-32`}
        onClick={onCopy}
        style={{ 
          boxShadow: copied ? `0 0 30px ${colorScheme.glow}` : 'none',
          transition: 'all 0.3s ease-out'
        }}
      >
        <div className="flex items-center gap-0 overflow-hidden relative h-full">
          {/* Left side - Expanding checkmark section */}
          <motion.div
            initial={false}
            animate={{ width: copied ? '100%' : '0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`absolute left-0 top-0 h-full flex items-center justify-center backdrop-blur-sm ${
              color === 'bca' 
                ? 'bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-r border-blue-400/50' 
                : 'bg-gradient-to-r from-red-500/30 to-red-400/20 border-r border-red-400/50'
            }`}
          >
            <motion.div
              animate={{ scale: copied ? [0.8, 1.2, 1] : 1, rotate: copied ? 360 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" className={`w-6 h-6 sm:w-7 sm:h-7 ${colorScheme.text}`} fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <div className="flex-1 p-5 sm:p-6 relative z-10 h-full flex flex-col justify-center">
            <motion.div
              initial={false}
              animate={{ opacity: copied ? 0 : 1, y: copied ? -10 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-center"
            >
              <p className="text-[10px] sm:text-xs text-cream/50 uppercase tracking-widest font-content mb-1.5">{bank}</p>
              <p className={`text-sm sm:text-lg font-semibold tracking-wider ${colorScheme.text} font-content`}>
                {number}
              </p>
              <p className="text-[10px] sm:text-xs text-cream/60 mt-1.5 font-content">a.n {holder}</p>
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 p-5 sm:p-6 flex flex-col items-center justify-center pointer-events-none"
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 sm:w-6 sm:h-6 ${colorScheme.text} mb-1`} fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <p className={`text-xs sm:text-sm font-medium ${colorScheme.text}`}>Disalin!</p>
            </motion.div>
          </div>

          {/* Right hint button */}
          <motion.div
            animate={{ opacity: copied ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 ${colorScheme.border} text-xs font-content text-cream/70 backdrop-blur-sm ${
              color === 'bca' 
                ? 'hover:bg-blue-500/20 hover:text-blue-200' 
                : 'hover:bg-red-500/20 hover:text-red-200'
            } transition-all duration-300 pointer-events-none`}
          >
            Salin
          </motion.div>
        </div>

        {/* Animated border glow */}
        <motion.div
          animate={copied ? { opacity: [1, 0.5, 1] } : { opacity: 0 }}
          transition={{ duration: 0.6, repeat: copied ? 2 : 0 }}
          className={`absolute inset-0 rounded-2xl pointer-events-none ${colorScheme.border} border-2`}
        />
      </div>
    </motion.div>
  )
}

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
    <section id="gift" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <motion.div className="relative z-20 w-full max-w-2xl space-y-6">
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0)} className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-2">Wedding Gift</motion.p>
        <motion.p {...vw({ initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0.1)} className="text-center text-cream/70 text-sm font-content leading-relaxed">
          Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah, berikut informasi rekening kami:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </motion.div>
    </section>
  )
}

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
    <section id="wishes" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <motion.div className="relative z-20 w-full max-w-sm space-y-5">
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0)} className="text-cream/60 text-xs uppercase tracking-[0.3em] font-content text-center mb-2">Ucapan &amp; Doa</motion.p>

        <motion.form onSubmit={submit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeUp(0)}
          className="cover-blur border border-cream/20 rounded-xl p-4 sm:p-6 space-y-4"
        >
          <div>
            <label className="block text-[11px] text-cream/60 uppercase tracking-widest mb-1.5 font-content">Nama Anda</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/40 font-content text-sm focus:outline-none focus:border-cream/60 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[11px] text-cream/60 uppercase tracking-widest mb-1.5 font-content">Status / Hubungan</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Teman, Sahabat, Keluarga, dll."
              className="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/40 font-content text-sm focus:outline-none focus:border-cream/60 transition-colors duration-200" />
          </div>
          <div>
            <label className="block text-[11px] text-cream/60 uppercase tracking-widest mb-1.5 font-content">Ucapan &amp; Doa</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} placeholder="Tulis ucapan dan doa Anda..."
              className="w-full px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder-cream/40 font-content text-sm focus:outline-none focus:border-cream/60 transition-colors duration-200 resize-none" />
          </div>
          <motion.button type="submit" disabled={submitting} whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 bg-cream/20 border border-cream/40 text-cream font-content text-sm font-medium rounded-lg hover:bg-cream/30 transition-colors duration-300 cursor-pointer disabled:opacity-50">
            {submitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
          <AnimatePresence>
            {success && (
              <motion.p key="s" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-green-400 text-sm text-center font-content">
                Berhasil dikirim! Terima kasih atas doa dan ucapannya
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
          <AnimatePresence>
            {wishes.length === 0 ? (
              <p className="text-center text-cream/40 text-sm font-content py-8">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              wishes.map((w, i) => (
                <motion.div key={`${w.timestamp}-${i}`} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeSmooth }}
                  className="cover-blur border border-cream/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-sm font-medium text-cream font-content">{w.name}</p>
                        {w.status && <span className="text-[10px] text-cream/40 font-content">— {w.status}</span>}
                      </div>
                      <p className="text-sm text-cream/80 mt-1 leading-relaxed font-content">{w.message}</p>
                      <p className="text-[10px] text-cream/30 mt-1.5 font-content">{w.timestamp}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section id="closing" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 bg-brown-dark/60" />
      <Decorations />
      <motion.div {...vw({ initial: { opacity: 0, scale: 0.85, y: 50 }, animate: { opacity: 1, scale: 1, y: 0 } })}
        transition={fadeUp(0)} className="relative z-20 max-w-sm w-full text-center"
      >
        <motion.p {...vw({ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0.15)} className="text-cream/70 text-sm font-content mb-3">Kami yang berbahagia</motion.p>
        <motion.div {...vw({ initial: { scaleX: 0 }, animate: { scaleX: 1 } })}
          transition={{ duration: 1.2, delay: 0.25, ease: easeSmooth }}
          className="w-10 h-[1px] bg-cream/40 mx-auto mb-4" />
        <motion.h2 {...vw({ initial: { opacity: 0, y: 50, scale: 0.85 }, animate: { opacity: 1, y: 0, scale: 1 } })}
          transition={fadeUp(0.35)}
          className="font-title text-5xl sm:text-6xl text-cream leading-tight mb-3">Sarah &amp; Ryan</motion.h2>
        <motion.div {...vw({ initial: { scaleX: 0 }, animate: { scaleX: 1 } })}
          transition={{ duration: 1.2, delay: 0.45, ease: easeSmooth }}
          className="w-10 h-[1px] bg-cream/40 mx-auto mb-5" />
        <motion.p {...vw({ initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0.55)} className="text-cream/60 text-xs sm:text-sm font-content mb-6 leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
        </motion.p>
        <motion.p {...vw({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
          transition={fadeIn(0.65)} className="text-cream/50 text-xs font-content italic">Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</motion.p>
      </motion.div>
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
      transition={{ duration: 1.2, delay: 1, ease: easeSmooth }}
      onClick={toggle}
      className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-brown-dark/60 backdrop-blur-md border border-cream/30 flex items-center justify-center cursor-pointer hover:bg-brown-dark/80 transition-colors duration-300"
      aria-label={playing ? 'Pause musik' : 'Putar musik'}>
      <motion.svg animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
        viewBox="0 0 24 24" className="w-6 h-6 text-cream" fill="currentColor">
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
      <div className="fixed inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.3) 0%, rgba(62,22,12,0.6) 100%)' }} />
      <div className="flex max-md:flex-col md:flex-row relative z-[2]">
        <div className="hidden md:flex md:w-1/2 lg:w-2/3 h-screen sticky top-0 flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/img/SR.jpeg')" }} />
          <Fireflies count={8} />
          <div className="relative z-10 text-center">
            <p className="text-cream/50 text-sm uppercase tracking-[0.3em] font-content mb-4">Undangan Pernikahan</p>
            <h1 className="font-title text-7xl sm:text-8xl text-cream leading-tight">Sarah</h1>
            <p className="font-serif text-cream/60 text-2xl italic my-2">&amp;</p>
            <h1 className="font-title text-7xl sm:text-8xl text-cream leading-tight">Ryan</h1>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 min-h-screen">
          <CoverSection />
          <QuoteSection />
          <CouplesSection />
          <ScheduleSection />
          <LoveStorySection />
          <GallerySection />
          <GiftSection />
          <WishesSection />
          <ClosingSection />

          <footer className="relative text-center py-8 px-6 border-t border-cream/10">
            <p className="text-cream/50 text-[11px] font-content">Terima kasih atas kehadiran dan doa restunya</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-cream/40 text-[11px] font-content">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>11 Juli 2026</span>
            </div>
            <p className="font-title text-sm text-cream/50 mt-2">Sarah &amp; Ryan</p>
          </footer>
        </div>
      </div>

      <MusicPlayer />

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-brown-dark/60 backdrop-blur-xl border-t border-cream/10 px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-cream/50 hover:text-cream transition-colors duration-200 cursor-pointer group">
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
  const [invitationOpened, setInvitationOpened] = useState(false)

  if (!invitationOpened) {
    return (
      <div className="fixed inset-0 w-full h-full bg-brown-dark">
        <CoverGate onOpen={() => setInvitationOpened(true)} />
      </div>
    )
  }

  return <MainContent />
}
