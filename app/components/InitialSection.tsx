'use client'

import { motion } from 'framer-motion'

export default function InitialSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 max-w-lg"
      >
        {/* Lace border frame */}
        <div className="border border-champagne/30 rounded-[3rem] p-8 sm:p-12 bg-black/10 backdrop-blur-sm">
          <p className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-sans mb-4">
            Undangan Pernikahan
          </p>
          <div className="w-12 h-[1px] bg-champagne/40 mx-auto mb-6" />
          <h2 className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight">
            Sarah
          </h2>
          <p className="font-serif text-champagne text-lg sm:text-xl italic my-2">&</p>
          <h2 className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight">
            Ryan
          </h2>
          <div className="w-12 h-[1px] bg-champagne/40 mx-auto mt-6 mb-4" />
          <p className="text-white/70 text-xs sm:text-sm font-sans">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
        </div>
      </motion.div>
    </section>
  )
}
