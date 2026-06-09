'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CoverSection from './components/CoverSection'
import InitialSection from './components/InitialSection'
import QuranVerseSection from './components/QuranVerseSection'
import GroomBrideSection from './components/GroomBrideSection'
import SaveTheDateSection from './components/SaveTheDateSection'
import EventDetailsSection from './components/EventDetailsSection'
import GallerySection from './components/GallerySection'
import WeddingGiftSection from './components/WeddingGiftSection'
import WishesSection from './components/WishesSection'
import ClosingSection from './components/ClosingSection'
import MusicPlayer from './components/MusicPlayer'

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

export default function Home() {
  const [invitationOpened, setInvitationOpened] = useState(false)

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  if (!invitationOpened) {
    return (
      <div className="fixed inset-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/bg-floral.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-velvet/80 via-emerald-deep/70 to-black/60" />
        <CoverSection onOpen={() => setInvitationOpened(true)} />
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory bg-emerald-velvet">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bg-floral.jpg')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-velvet/80 via-emerald-deep/70 to-black/70" />

      <div className="relative z-10">
        <section id="initial"><InitialSection /></section>
        <section id="quran"><QuranVerseSection /></section>
        <section id="couple"><GroomBrideSection /></section>
        <section id="date"><SaveTheDateSection /></section>
        <section id="event"><EventDetailsSection /></section>
        <section id="gallery"><GallerySection /></section>
        <section id="gift"><WeddingGiftSection /></section>
        <section id="wishes"><WishesSection /></section>
        <section id="closing"><ClosingSection /></section>

        <footer className="relative z-20 text-center py-8 px-6 bg-black/20 backdrop-blur-sm border-t border-champagne/10">
          <p className="text-white/50 text-[11px] font-sans">
            Terima kasih atas kehadiran dan doa restunya
          </p>
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
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-white/50 hover:text-champagne transition-colors duration-200 cursor-pointer group"
            >
              <span className="text-[9px] font-sans tracking-wider whitespace-nowrap group-hover:text-champagne transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
