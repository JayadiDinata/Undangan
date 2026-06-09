'use client'

import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

export default function SaveTheDateSection() {
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
        <div className="bg-black/15 backdrop-blur-md border border-champagne/20 rounded-2xl p-6 sm:p-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans mb-3"
          >
            Save The Date
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-calligraphy text-3xl sm:text-4xl text-white mb-2"
          >
            Sabtu, 11 Juli 2026
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/50 text-xs font-sans mb-6"
          >
            Bertepatan dengan 26 Dzulhijjah 1447 H
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-12 h-[1px] bg-champagne/40 mx-auto mb-6 origin-center"
          />

          <CountdownTimer />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-white/40 text-[10px] font-sans mt-6 uppercase tracking-wider"
          >
            Menuju Hari Bahagia
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
