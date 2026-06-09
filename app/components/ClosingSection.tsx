'use client'

import { motion } from 'framer-motion'

export default function ClosingSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-20 max-w-lg"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/70 text-sm font-sans mb-2"
        >
          Kami yang berbahagia
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-10 h-[1px] bg-champagne/40 mx-auto mb-4 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-white text-shadow-glow mb-4"
        >
          Sarah &amp; Ryan
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-10 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/60 text-xs sm:text-sm font-sans mb-8 leading-relaxed"
        >
          Merupakan suatu kehormatan dan kebahagiaan apabila
          Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-white/50 text-xs font-sans italic"
        >
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <div className="relative">
            <svg viewBox="0 0 120 80" className="w-28 h-20 sm:w-36 sm:h-24 text-champagne/30" fill="currentColor">
              <circle cx="40" cy="20" r="8" />
              <path d="M40 30 Q30 40 28 50 Q26 60 30 68 L34 68 Q32 60 34 52 Q36 44 40 40 Q44 44 46 52 Q48 60 46 68 L50 68 Q54 60 52 50 Q50 40 40 30Z" />
              <circle cx="80" cy="20" r="8" />
              <path d="M80 30 Q70 40 68 50 Q66 60 70 68 L74 68 Q72 60 74 52 Q76 44 80 40 Q84 44 86 52 Q88 60 86 68 L90 68 Q94 60 92 50 Q90 40 80 30Z" />
              <path d="M40 50 Q60 42 80 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
