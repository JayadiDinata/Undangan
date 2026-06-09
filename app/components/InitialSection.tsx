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
        className="relative z-20 max-w-lg w-full"
      >
        <div className="border border-champagne/30 rounded-[3rem] p-8 sm:p-12 bg-black/10 backdrop-blur-sm">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-sans mb-4"
          >
            Undangan Pernikahan
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight"
          >
            Sarah
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, type: 'spring', stiffness: 120 }}
            viewport={{ once: true }}
            className="font-serif text-champagne text-lg sm:text-xl italic my-2"
          >
            &amp;
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-white text-shadow-glow leading-tight"
          >
            Ryan
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mt-6 mb-4 origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            viewport={{ once: true }}
            className="text-white/70 text-xs sm:text-sm font-sans"
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
