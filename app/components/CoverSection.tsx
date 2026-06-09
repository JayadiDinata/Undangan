'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpen: () => void
}

export default function CoverSection({ onOpen }: Props) {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)
    setTimeout(onOpen, 1200)
  }

  return (
    <AnimatePresence>
      {!opened ? (
        <motion.section
          key="cover"
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />

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
              initial={{ y: 0 }}
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
      ) : null}
    </AnimatePresence>
  )
}
