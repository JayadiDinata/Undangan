'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// REPLACE with your actual image URLs
const images = [
  { src: '/img/gallery1.jpg', alt: 'Prewedding 1' },
  { src: '/img/gallery2.jpg', alt: 'Prewedding 2' },
  { src: '/img/gallery3.jpg', alt: 'Prewedding 3' },
  { src: '/img/gallery4.jpg', alt: 'Prewedding 4' },
  { src: '/img/gallery5.jpg', alt: 'Prewedding 5' },
  { src: '/img/gallery6.jpg', alt: 'Prewedding 6' },
]

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => { e.stopPropagation(); setSelected(null) }}
              className="relative max-w-2xl w-full aspect-auto max-h-[85vh] rounded-xl overflow-hidden"
            >
              <img
                src={images[selected].src}
                alt={images[selected].alt}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
