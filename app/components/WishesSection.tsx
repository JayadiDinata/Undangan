'use client'

import { motion } from 'framer-motion'
import WishesBoard from './WishesBoard'

export default function WishesSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 max-w-lg w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] text-center font-sans mb-6"
        >
          Ucapan & Doa
        </motion.p>

        <WishesBoard />
      </div>
    </section>
  )
}
