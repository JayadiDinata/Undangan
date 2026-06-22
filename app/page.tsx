'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, type Easing } from 'framer-motion'
import ShinyText from '@/components/ui/ShinyText'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import InfiniteMenu from '@/components/ui/InfiniteMenu'

// --- EASING ---
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

// --- DATA ------------------------------------------------------------
const targetDate = new Date('2026-07-11T09:00:00+07:00')

const couples = {
  bride: { name: 'Sarah Saraswati (Ala)', title: '', parents: 'Putri dari Bapak Jaja & Ibu Kartini / Entin', img: '/img/bride.jpeg' },
  groom: { name: 'Riadussolihin S.Tp', title: '', parents: 'Putra dari Bapak Ujang & Ibu Kuraesin', img: '/img/groom.jpeg' },
}

const galleryImages = [
  { src: '/img/SR.jpeg', alt: 'Prewedding 1' },
  { src: '/img/SR2.jpeg', alt: 'Prewedding 2' },
  { src: '/img/SR3.jpeg', alt: 'Prewedding 3' },
  { src: '/img/SR4.jpeg', alt: 'Prewedding 4' },
  { src: '/img/SR5.jpeg', alt: 'Prewedding 5' },
  { src: '/img/SR6.jpeg', alt: 'Prewedding 6' },
  { src: '/img/SR7.jpeg', alt: 'Prewedding 7' },
  { src: '/img/SR8.jpeg', alt: 'Prewedding 8' },
]

const bankAccounts = [
  { bank: 'BCA', number: '7361071097', holder: 'Sarah Saraswati' },
  { bank: 'Hi', number: '6003175195', holder: 'Riadussolihin' },
]

const loveStory = [
  { title: 'Pertemuan Pertama', date: 'Juni 2024', desc: 'Berawal dari pekenalan yang tidak terduga, kami berdua dipertemukan. Tanpa sengaja berbincang hingga saat ini.', img: '/img/SR4.jpeg' },
  { title: 'Mulai Serius', date: 'Juni 2025', desc: 'Setelah dua tahun saling mengenal, kami memutuskan untuk melangkah ke jenjang yang lebih serius. Restu kedua orang tua menjadi kekuatan kami.', img: '/img/SR5.jpeg' },
  { title: 'Lamaran', date: 'Juni 2026', desc: 'Dengan penuh haru dan bahagia, proses lamaran berlangsung lancar dihadiri oleh keluarga besar kedua belah pihak.', img: '/img/SR3.jpeg' },
  { title: 'Pernikahan', date: 'Juli 2026', desc: 'Akhirnya tibalah hari yang dinanti. Dengan mengucap bismillah, kami berdua sah menjadi pasangan suami istri.', img: '/img/SR2.jpeg' },
]

const events = [
  { title: 'Akad Nikah', date: 'Sabtu, 11 Juli 2026', time: '08:00 - 10:00 WIB', location: 'Villa', address: 'Jl. Mayjen H.R. Edi Sukma, RT.02/RW.01, Bitung Sari, Kec. Ciawi (dekat Smpn 2 Ciawi)', mapUrl: 'https://maps.google.com/?q=SMPN+2+Ciawi', mapEmbedUrl: 'https://maps.google.com/maps?q=SMPN+2+Ciawi&output=embed' },
  { title: 'Resepsi', date: 'Sabtu, 11 Juli 2026', time: '11:00 - Selesai', location: 'Villa', address: 'Jl. Mayjen H.R. Edi Sukma, RT.02/RW.01, Bitung Sari, Kec. Ciawi (dekat Smpn 2 Ciawi)', mapUrl: 'https://maps.google.com/?q=SMPN+2+Ciawi', mapEmbedUrl: 'https://maps.google.com/maps?q=SMPN+2+Ciawi&output=embed' },
]



const WEBHOOK_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE'
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

// --- HELPERS ---------------------------------------------------------
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

// --- FIREFLIES -------------------------------------------------------
function Fireflies({ count = 8 }: { count?: number }) {
  return (
    <ul className="m-0 p-0" style={{ listStyle: 'none' }}>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="firefly" />
      ))}
    </ul>
  )
}

// --- DECORATIVE ELEMENTS --------------------------------------------
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

// --- HERO COVER GATE ------------------------------------------------
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
          style={{ background: '#0d2818' }}
        >
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: "url('/img/SR7.jpeg')" }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.05) 0%, rgba(13,40,24,0.3) 40%, rgba(13,40,24,0.7) 100%)' }}
          />
          <Fireflies count={8} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="relative z-20 w-[85vw] max-w-sm mx-auto bg-cream/5 backdrop-blur-lg border border-cream/20 rounded-3xl px-6 py-8 text-center shadow-2xl"
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
              className="font-title text-5xl sm:text-6xl leading-tight"
            >
              <ShinyText text="Sarah Saraswati (Ala)" color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} />
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
              className="font-title text-5xl sm:text-6xl leading-tight mb-4"
            >
              <ShinyText text="Riadussolihin S.Tp" color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} />
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

// --- COUNTDOWN -------------------------------------------------------
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
          <div className="bg-cream/10 backdrop-blur-sm border border-cream/10 rounded-xl px-2 py-1.5 w-full text-center">
            <span className="block font-serif text-lg sm:text-xl font-bold text-cream">{tl[key]}</span>
          </div>
          <span className="text-[9px] text-cream/50 uppercase tracking-wider mt-1 font-content">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

// --- COVER HERO SECTION (parallax zoom scattered images) ----------
function CoverSection() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0])

  const scaleBig = useTransform(scrollYProgress, [0, 0.35], [1, 4])
  const scaleMid = useTransform(scrollYProgress, [0, 0.35], [1, 2.5])
  const scales = [scaleBig, scaleMid, scaleMid, scaleMid, scaleMid, scaleMid, scaleMid, scaleMid]

  return (
    <section ref={container} id="cover" className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.6) 100%)' }} />
        <Decorations />

        {galleryImages.map((img, i) => {
          const scale = scales[i % scales.length]
          return (
            <motion.div
              key={i}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                i === 0 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
              } ${
                i === 1 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
              } ${
                i === 2 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
              } ${
                i === 3 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
              } ${
                i === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
              } ${
                i === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
              } ${
                i === 6 ? '[&>div]:!-top-[30vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[20vh] [&>div]:!w-[20vw]' : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw]">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </motion.div>
          )
        })}

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center"
        >
          <p className="text-cream/60 text-xs uppercase tracking-[0.2em] font-content mb-4">
            Undangan Pernikahan
          </p>
          <h1 className="font-title text-5xl sm:text-7xl leading-tight"><ShinyText text="Sarah Saraswati (Ala)" color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} /></h1>
          <p className="font-serif text-cream/60 text-2xl italic my-2">&amp;</p>
          <h1 className="font-title text-5xl sm:text-7xl leading-tight"><ShinyText text="Riadussolihin S.Tp" color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} /></h1>
          <div className="mt-8">
            <p className="text-cream/50 text-xs font-content mb-1">Sabtu, 11 Juli 2026</p>
            <p className="text-cream/60 text-[10px] font-content mb-6">Ciawi, Bogor</p>
            <Countdown />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// --- QUOTE SECTION (Uiverse logo card adapted) ---------------------
function QuoteSection() {
  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.6) 100%)' }} />
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
              <p className="mb-3"><ShinyText text="QS. Ar-Rum Ayat 21" color="#D4AF37" shineColor="#ffd700" speed={2} spread={150} className="font-serif text-xs italic tracking-wider" /></p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="text-xl md:text-2xl text-cream leading-[2.5] mb-4 font-arabic"
              dir="rtl" lang="ar"
            >
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
              className="w-8 h-px bg-[#D4AF37]/40 mx-auto mb-4"
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
          <span className="quran-card-bottom">Ar-Rum ┬╖ 21</span>
        </motion.div>
      </div>
    </section>
  )
}

// --- COUPLES CARD (envelope-style) -----------------------------------
function CouplesCard({ person, isGroom, expanded }: { person: typeof couples.bride; isGroom: boolean; expanded: boolean }) {
  return (
    <div className={`uiverse-card ${expanded ? 'expanded' : ''}`}>
      <img src={person.img} alt={person.name} className={`uiverse-card-img ${isGroom ? '' : 'uiverse-card-img-bride'}`} />
      <img src="/img/ov-3.png" alt="" className="absolute top-0 left-0 w-full h-full object-fill pointer-events-none z-[1] opacity-60" />
      <div className="uiverse-card-overlay" />
      <div className="uiverse-card-bottom">
        <p className="font-title leading-tight mb-0.5"><ShinyText text={person.name} color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} className="text-xl sm:text-2xl" /></p>
        <p className="text-cream/70 text-xs font-content">{isGroom ? 'Groom' : 'Bride'}</p>
        <svg className={`chevron-down ${expanded ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
        <div className={`overflow-hidden transition-all duration-400 ${expanded ? 'max-h-32 mt-2' : 'max-h-0'}`}>
          <div className="w-6 h-px bg-cream/20 mx-auto mb-2" />
          <p className="font-content leading-relaxed"><ShinyText text={person.parents} color="#d4c5a9" shineColor="#ffd700" speed={2.5} spread={150} className="text-[10px]" /></p>
        </div>
      </div>
    </div>
  )
}

// --- COUPLES SECTION -------------------------------------------------
function CouplesSection() {
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setExpanded(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="bride" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.6) 100%)' }} />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-5xl px-5 md:px-6">
        <p className="text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-8 animate-fadeIn">
          Pasangan Pengantin
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5 max-w-lg mx-auto md:max-w-none">
          <CouplesCard person={couples.bride} isGroom={false} expanded={expanded} />
          <div className="flex-shrink-0">
            <div className="text-cream/30 text-3xl font-serif italic">&amp;</div>
          </div>
          <CouplesCard person={couples.groom} isGroom={true} expanded={expanded} />
        </div>
      </div>
    </section>
  )
}

// --- SCHEDULE SECTION ------------------------------------------------
function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.6) 100%)' }} />
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
          className="bg-cream/5 backdrop-blur-lg border border-cream/15 rounded-3xl p-5 md:p-6 space-y-5"
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
                <p className="text-cream/60 text-[10px] font-content mb-3">{ev.address}</p>
                {i === 1 && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-3 border border-cream/20">
                    <iframe
                      src={ev.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    />
                  </div>
                )}
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

// --- LOVE STORY SECTION ----------------------------------------------
function LoveStorySection() {
  const items = loveStory.map(s => ({ quote: s.desc, name: s.title, designation: s.date, src: s.img }))

  return (
    <section id="lovestory" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,40,24,0.5)' }} />
      <Decorations />
      <div className="relative z-20">
        <motion.h2 {...fadeIn(0)} className="font-title text-3xl text-cream text-center mb-1">Kisah Cinta</motion.h2>
        <motion.p {...fadeIn(0.05)} className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-content text-center mb-8">
          Love Story
        </motion.p>
        <CircularTestimonials testimonials={items} autoplay={true} />
      </div>
    </section>
  )
}

// --- GALLERY SECTION -------------------------------------------------
function GallerySection() {
  const menuItems = galleryImages.map(img => ({
    image: img.src,
    link: '',
    title: img.alt,
    description: ''
  }))

  return (
    <section id="gallery" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.02) 0%, rgba(13,40,24,0.08) 100%)' }} />
      <Decorations />

      <p className="relative z-20 text-cream/50 text-xs uppercase tracking-[0.2em] font-content text-center mb-6 animate-fadeIn">
        Galeri Foto
      </p>

      <div className="relative z-20 w-full h-[500px] md:h-[600px]">
        <InfiniteMenu items={menuItems} scale={1.0} />
      </div>
    </section>
  )
}

// --- BANK ACCOUNT CARD -----------------------------------------------
function BankAccountCard({ bank, number, holder, idx, copied, onCopy, color }: {
  bank: string; number: string; holder: string; idx: number; copied: boolean; onCopy: () => void; color: string
}) {
  const bankColors: { [key: string]: { border: string; bg: string; text: string } } = {
    bca: { border: 'border-blue-400/40', bg: 'from-blue-500/10 to-blue-600/5', text: 'text-blue-300' },
    hi: { border: 'border-teal-400/40', bg: 'from-teal-500/10 to-teal-600/5', text: 'text-teal-300' },
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
        className={`relative overflow-hidden bg-gradient-to-br ${scheme.bg} backdrop-blur-sm rounded-2xl border ${scheme.border} cursor-pointer transition-all duration-300 hover:shadow-lg`}
        onClick={onCopy}
      >
        <div className="flex items-center h-24 sm:h-28">
          <div className="flex-1 px-4 py-4">
            <motion.div animate={{ opacity: copied ? 0 : 1 }} transition={{ duration: 0.2 }}>
              <p className="text-[9px] text-cream/40 uppercase tracking-widest font-content mb-1">{bank}</p>
              <p className={`text-sm sm:text-base font-semibold tracking-wider ${scheme.text} font-content`}>{number}</p>
              <p className="text-[9px] text-cream/50 mt-1 font-content">a.n {holder}</p>
            </motion.div>
          </div>

      <div className="pr-4 relative flex items-center justify-center w-12 h-12">
        <motion.div
          animate={copied ? { x: [0, 40, 0], opacity: [1, 1, 0] } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute"
        >
          <svg viewBox="0 0 48 48" className={`w-8 h-8 ${scheme.text}`} fill="currentColor" opacity="0.6">
            <rect x="4" y="10" width="40" height="28" rx="3" />
            <rect x="4" y="18" width="40" height="4" opacity="0.3" />
            <text x="24" y="33" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">ΓÇóΓÇóΓÇóΓÇó</text>
          </svg>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={copied ? { scaleX: [0, 1, 0], opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-10 h-1 rounded-full bg-cream/30"
          style={{ transformOrigin: 'left center' }}
        />
      </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- GIFT SECTION ----------------------------------------------------
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

  const bankColorMap: { [key: string]: string } = { 'BCA': 'bca', 'Hi': 'hi' }

  return (
    <section id="gift" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-green-dark/60" />
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

// --- WISHES & RSVP SECTION --------------------------------------------
interface Wish { name: string; status: string; message: string; timestamp: string }
interface RsvpEntry { name: string; attending: string; timestamp: string }

function WishesSection() {
  const [tab, setTab] = useState<'wishes' | 'rsvp'>('wishes')
  const [wishes, setWishes] = useState<Wish[]>([])
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>([])
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpAttending, setRsvpAttending] = useState<'yes' | 'no' | null>(null)
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false)
  const [rsvpSuccess, setRsvpSuccess] = useState(false)

  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get('to')
    if (to) setRsvpName(decodeURIComponent(to))
    fetch(`${API_URL}/api/wishes`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setWishes(data) })
      .catch(() => { try { const s = localStorage.getItem('weddingWishes'); if (s) setWishes(JSON.parse(s)) } catch {} })
    fetch(`${API_URL}/api/rsvp`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRsvpList(data) })
      .catch(() => { try { const s = localStorage.getItem('weddingRsvp'); if (s) setRsvpList(JSON.parse(s)) } catch {} })
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    const newWish: Wish = {
      name: esc(name.trim()), status: esc(status.trim()), message: esc(message.trim()),
      timestamp: new Date().toLocaleString('id-ID'),
    }
    try { await fetch(`${API_URL}/api/wishes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newWish) }) } catch {}
    setWishes([newWish, ...wishes])
    localStorage.setItem('weddingWishes', JSON.stringify([newWish, ...wishes]))
    setName(''); setStatus(''); setMessage('')
    setSuccess(true); setTimeout(() => setSuccess(false), 3000)
    try { await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newWish) }) } catch {}
    setSubmitting(false)
  }

  const submitRsvp = async (e: FormEvent) => {
    e.preventDefault()
    if (!rsvpName.trim() || !rsvpAttending) return
    setRsvpSubmitting(true)
    const entry: RsvpEntry = {
      name: esc(rsvpName.trim()), attending: rsvpAttending,
      timestamp: new Date().toLocaleString('id-ID'),
    }
    try {
      await fetch(`${API_URL}/api/rsvp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      })
    } catch {}
    setRsvpList([entry, ...rsvpList])
    localStorage.setItem('weddingRsvp', JSON.stringify([entry, ...rsvpList]))
    setRsvpSuccess(true)
    setRsvpSubmitting(false)
  }

  return (
    <section id="wishes" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-green-dark/60" />
      <Decorations />
      <div className="relative z-20 mx-auto max-w-lg px-5 md:px-6">

        {/* --- Tabs --- */}
        <div className="flex bg-cream/5 backdrop-blur-sm border border-cream/15 rounded-2xl p-1 mb-5">
          <button onClick={() => setTab('wishes')} className={`flex-1 py-2 text-xs font-content tracking-wider rounded-xl transition-all cursor-pointer ${tab === 'wishes' ? 'bg-cream/15 text-cream shadow-sm' : 'text-cream/50 hover:text-cream/70'}`}>
            Ucapan &amp; Doa
          </button>
          <button onClick={() => setTab('rsvp')} className={`flex-1 py-2 text-xs font-content tracking-wider rounded-xl transition-all cursor-pointer ${tab === 'rsvp' ? 'bg-cream/15 text-cream shadow-sm' : 'text-cream/50 hover:text-cream/70'}`}>
            Konfirmasi Kehadiran
          </button>
        </div>

        {/* --- Form (wishes) --- */}
        {tab === 'wishes' && (
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-40px' }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="bg-cream/5 backdrop-blur-sm border border-cream/15 rounded-2xl p-4 md:p-5 space-y-3 mb-5"
          >
            <p className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-content mb-1">Kirim Ucapan &amp; Doa</p>
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
        )}

        {/* --- List: Wishes --- */}
        {tab === 'wishes' && (
          <div className="max-h-[400px] overflow-y-auto space-y-2 pe-1">
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
                      <div className="w-8 h-8 rounded-full bg-cream/15 flex items-center justify-center flex-shrink-0 text-xs font-medium text-cream font-content">
                        {w.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-sm font-medium text-cream font-content">{w.name}</p>
                          {w.status && <span className="text-[9px] text-cream/50 font-content">— {w.status}</span>}
                        </div>
                        <p className="text-sm text-cream/80 mt-1 leading-relaxed font-content">{w.message}</p>
                        <p className="text-[9px] text-cream/40 mt-1 font-content">{w.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}

        {/* --- List: RSVP --- */}
        {tab === 'rsvp' && (
          <>
            <motion.form
              onSubmit={submitRsvp}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="bg-cream/5 backdrop-blur-sm border border-cream/15 rounded-2xl p-4 md:p-5 space-y-3 mb-5"
            >
              <p className="text-cream/50 text-[10px] uppercase tracking-[0.2em] font-content mb-1">Konfirmasi Kehadiran</p>
              {!rsvpSuccess ? (
                <>
                  <div>
                    <label className="block text-[10px] text-cream/50 uppercase tracking-widest mb-1 font-content">Nama Anda</label>
                    <input
                      type="text" value={rsvpName} onChange={e => setRsvpName(e.target.value)} required
                      placeholder="Masukkan nama Anda"
                      className="w-full px-3.5 py-2.5 bg-cream/10 border border-cream/15 rounded-xl text-cream placeholder-cream/30 font-content text-sm focus:outline-none focus:border-cream/50 transition-colors duration-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit" disabled={rsvpSubmitting}
                      onClick={() => setRsvpAttending('yes')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-content font-medium transition-all cursor-pointer disabled:opacity-50 ${
                        rsvpAttending === 'yes' ? 'bg-green-600/40 border border-green-400/40 text-green-300' : 'bg-cream/10 border border-cream/20 text-cream/70 hover:bg-cream/20'
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="submit" disabled={rsvpSubmitting}
                      onClick={() => setRsvpAttending('no')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-content font-medium transition-all cursor-pointer disabled:opacity-50 ${
                        rsvpAttending === 'no' ? 'bg-red-600/40 border border-red-400/40 text-red-300' : 'bg-cream/10 border border-cream/20 text-cream/70 hover:bg-cream/20'
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </>
              ) : (
                <motion.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-cream/70 text-sm font-content text-center py-2"
                >
                  Terima kasih atas konfirmasinya
                </motion.p>
              )}
            </motion.form>
            <div className="max-h-[400px] overflow-y-auto space-y-2 pe-1">
              <AnimatePresence>
                {rsvpList.length === 0 ? (
                  <p className="text-center text-cream/40 text-sm font-content py-6">Belum ada konfirmasi kehadiran.</p>
                ) : (
                  rsvpList.map((r, i) => (
                    <motion.div
                      key={`${r.timestamp}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ margin: '-40px' }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cream/15 flex items-center justify-center flex-shrink-0 text-xs font-medium text-cream font-content">
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cream font-content">{r.name}</p>
                          <p className="text-[9px] text-cream/40 mt-0.5 font-content">{r.timestamp}</p>
                        </div>
                        <span className={`shrink-0 text-[10px] font-content font-medium px-2.5 py-1 rounded-full border ${
                          r.attending === 'yes' ? 'bg-green-600/30 border-green-400/30 text-green-300' : 'bg-red-600/30 border-red-400/30 text-red-300'
                        }`}>
                          {r.attending === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// --- CLOSING SECTION -------------------------------------------------
function ClosingSection() {
  return (
    <section id="closing" className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-green-dark/30" />
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
          <motion.h2 {...fadeUp(0.2)} className="font-title text-4xl sm:text-5xl leading-tight mb-3">
            <ShinyText text="Sarah &amp; Riad" color="#f5e6d3" shineColor="#ffd700" speed={3} spread={150} />
          </motion.h2>
          <motion.div {...scaleIn(0.25)} className="w-8 h-px bg-cream/30 mx-auto mb-4" />
          <motion.p {...fadeIn(0.3)} className="text-cream/50 text-xs sm:text-sm font-content mb-6 leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </motion.p>

          <motion.p {...fadeIn(0.35)} className="text-cream/40 text-xs font-content italic">
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// --- MUSIC PLAYER ----------------------------------------------------
const floatingNotes = [
  { id: 1, x: -16, delay: 0, size: 10 },
  { id: 2, x: 0, delay: 0.4, size: 12 },
  { id: 3, x: 16, delay: 0.8, size: 9 },
  { id: 4, x: -8, delay: 1.2, size: 11 },
  { id: 5, x: 8, delay: 1.6, size: 8 },
]

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
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: easeOut }}
      className="fixed bottom-20 right-4 z-50"
    >
      {playing && floatingNotes.map(note => (
        <motion.div
          key={note.id}
          className="absolute left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [-60, -120] }}
          transition={{ repeat: Infinity, duration: 2, delay: note.delay, ease: 'easeOut' }}
          style={{ marginLeft: note.x, fontSize: note.size }}
        >
          <span className="material-symbols-outlined text-cream/60" style={{ fontSize: note.size }}>music_note</span>
        </motion.div>
      ))}
      <motion.button
        animate={{ rotate: playing ? [0, 360] : 0, scale: playing ? 1.15 : 1 }}
        transition={{ rotate: { repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }, scale: { duration: 0.3 } }}
        onClick={toggle}
        className="relative w-11 h-11 rounded-full bg-green-dark/60 backdrop-blur-sm border border-cream/20 flex items-center justify-center cursor-pointer hover:bg-green-dark/80 transition-colors duration-300 overflow-hidden"
        aria-label={playing ? 'Pause musik' : 'Putar musik'}
      >
        {playing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/20 to-transparent animate-shimmer pointer-events-none" />}
        <span className="material-symbols-outlined text-cream text-lg">{playing ? 'music_note' : 'music_off'}</span>
      </motion.button>
    </motion.div>
  )
}

// --- SCROLL OVERLAYS -------------------------------------------------
function ScrollOverlays() {
  const { scrollY } = useScroll()
  const topLeftX = useTransform(scrollY, [0, 500], [0, -40])
  const topRightX = useTransform(scrollY, [0, 500], [0, 40])
  const botLeftX = useTransform(scrollY, [0, 500], [0, -80])
  const botRightX = useTransform(scrollY, [0, 500], [0, 80])

  return (
    <>
      <motion.div style={{ x: topLeftX }} className="fixed top-0 left-0 z-[1] pointer-events-none">
        <img src="/img/ov-2kiri.png" alt="" className="w-32 md:w-48 opacity-50 animate-sway-left" />
      </motion.div>
      <motion.div style={{ x: topRightX }} className="fixed top-0 right-0 z-[1] pointer-events-none">
        <img src="/img/ov-2kanan.png" alt="" className="w-32 md:w-48 opacity-50 animate-sway-right" />
      </motion.div>
      <motion.div style={{ x: botLeftX }} className="fixed bottom-0 left-0 z-[3] pointer-events-none">
        <img src="/img/ov-4kiri.png" alt="" className="w-32 md:w-48 opacity-50 animate-sway-left" />
      </motion.div>
      <motion.div style={{ x: botRightX }} className="fixed bottom-0 right-0 z-[3] pointer-events-none">
        <img src="/img/ov-4.png" alt="" className="w-32 md:w-48 opacity-50 animate-sway-right" />
      </motion.div>
    </>
  )
}

// --- MAIN CONTENT ----------------------------------------------------
function MainContent() {
  return (
    <main className="relative w-full min-h-screen">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-green.gif')" }} />
      <div className="fixed inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.5) 100%)' }} />
      <ScrollOverlays />

      <div className="relative z-[2]">
        <CoverSection />
        <QuoteSection />
        <CouplesSection />
        <ScheduleSection />
        <LoveStorySection />
        <GiftSection />
        <GallerySection />
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
          <p className="font-title text-sm mt-1.5"><ShinyText text="Sarah &amp; Riad" color="#9e8a7a" shineColor="#ffd700" speed={3} spread={150} /></p>
        </footer>
      </div>

      <MusicPlayer />
    </main>
  )
}

// --- PAGE ------------------------------------------------------------
function GuestName() {
  const [name, setName] = useState('Tamu Undangan')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let guestName = params.get('to')
    // Fallback: if & in value was split, collect remaining param keys as continuation
    if (guestName) {
      const rest: string[] = []
      params.forEach((v, k) => {
        if (k !== 'to') rest.push(v ? k + '=' + v : k)
      })
      if (rest.length) guestName += ' ' + rest.join(' ').replace(/=$/g, '')
    }
    if (guestName) {
      setName(guestName.replace(/\s+/g, ' ').trim())
      document.title = 'Undangan Pernikahan - ' + guestName.replace(/\s+/g, ' ').trim()
    }
  }, [])
  return <p className="font-content leading-relaxed"><ShinyText text={name} color="#d4c5a9" shineColor="#ffd700" speed={4} spread={150} className="text-lg" /></p>
}

export default function InvitationPage() {
  const [revealed, setRevealed] = useState(false)
  const [exited, setExited] = useState(false)
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v: number) => {
      const progress = v / vh
      if (progress > 0.1 && !revealed) setRevealed(true)
      if (progress > 0.35 && !exited) setExited(true)
    })
    return unsubscribe
  }, [scrollY, revealed, exited, vh])

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        style={{
          pointerEvents: exited ? 'none' : 'auto',
          opacity: exited ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
        }}
      >
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/bg-green.gif')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,40,24,0.1) 0%, rgba(13,40,24,0.5) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-12 md:pt-20">
          <div className="mb-6 text-center relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] font-content mb-2"><ShinyText text="Selamat Datang" color="#b5b5b5" shineColor="#ffd700" speed={3} spread={150} /></p>
            <GuestName />
          </div>
          <div className="flex items-center justify-center relative z-10">
            <div className="relative">
              <img src="/img/ov-1.png" alt="" className="relative w-[340px] md:w-[430px] h-auto object-contain pointer-events-none z-0 opacity-70" />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className={`envelope-card shadow-envelope ${revealed ? 'revealed' : ''}`}>
                  <div className="envelope-first">
                    <img src="/img/tutup.png" alt="Buka Undangan" className="w-full h-full object-contain p-6" />
                  </div>
                  <div className="envelope-second relative">
                    <img src="/img/buka.png" alt="Undangan" className="w-full h-full object-contain" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="font-title text-lg md:text-xl whitespace-nowrap"><ShinyText text="Sarah &amp; Riad" color="#0d2818" shineColor="#ffd700" speed={2} spread={150} /></p>
                      <p className="font-content text-[9px] md:text-[10px] text-cream/80 tracking-wider mt-1">11 Juli 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Spacer so envelope is scroll-past -- */}
      <div className="relative w-full h-screen" />

      {/* -- Main Content -- */}
      <MainContent />
    </>
  )
}
