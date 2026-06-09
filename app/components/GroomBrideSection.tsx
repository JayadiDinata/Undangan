'use client'

import { motion } from 'framer-motion'

const bride = {
  name: 'Sarah Amara Syakira',
  title: 'S.Ds.',
  parents: 'Putri dari Bapak Alex Budiman & Ibu Dewi Lestari',
  // REPLACE with your actual image URL
  img: '/img/bride.jpg',
}

const groom = {
  name: 'Ryan Malik Azhar',
  title: 'S.H.',
  parents: 'Putra dari Bapak Hendra Malik & Ibu Rina Fitriani',
  // REPLACE with your actual image URL
  img: '/img/groom.jpg',
}

export default function GroomBrideSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 snap-start overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 max-w-lg w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-white/60 text-xs uppercase tracking-[0.3em] font-sans mb-8"
        >
          Mempelai
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-champagne/40 shadow-lg shadow-black/20">
              <img src={bride.img} alt={bride.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-calligraphy text-2xl sm:text-3xl text-white">{bride.name}</h3>
            <p className="text-champagne/70 text-xs font-sans mt-0.5">{bride.title}</p>
            <p className="text-white/60 text-[11px] font-sans mt-3 max-w-[180px] mx-auto leading-relaxed">
              {bride.parents}
            </p>
          </motion.div>

          {/* Ampersand */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-champagne" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-champagne/40 shadow-lg shadow-black/20">
              <img src={groom.img} alt={groom.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-calligraphy text-2xl sm:text-3xl text-white">{groom.name}</h3>
            <p className="text-champagne/70 text-xs font-sans mt-0.5">{groom.title}</p>
            <p className="text-white/60 text-[11px] font-sans mt-3 max-w-[180px] mx-auto leading-relaxed">
              {groom.parents}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
