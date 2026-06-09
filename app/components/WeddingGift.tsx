'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const accounts = [
  {
    bank: 'Bank BCA',
    number: '1234567890',
    holder: 'Sarah Amara Syakira',
  },
  {
    bank: 'Bank Mandiri',
    number: '9876543210',
    holder: 'Ryan Malik Azhar',
  },
]

export default function WeddingGift() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-white/80 text-sm sm:text-base font-sans leading-relaxed">
        Doa restu Anda adalah hadiah terindah bagi kami. Namun jika Anda ingin memberikan hadiah,
        berikut informasi rekening kami:
      </p>

      {accounts.map((acc, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="bg-black/20 backdrop-blur-md border border-champagne/20 rounded-xl p-4 sm:p-5 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-champagne" fill="currentColor">
              <path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zM2 5l8-3 8 3-8 3-8-3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/50 uppercase tracking-widest">{acc.bank}</p>
            <p className="text-sm sm:text-base text-champagne font-semibold tracking-wider">{acc.number}</p>
            <p className="text-xs text-white/70">a.n {acc.holder}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => copy(acc.number, i)}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer ${
              copiedIdx === i
                ? 'bg-green-500/80 text-white scale-110'
                : 'bg-champagne/20 text-champagne hover:bg-champagne/30'
            }`}
          >
            {copiedIdx === i ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </motion.svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            )}
          </motion.button>
        </motion.div>
      ))}

      {copiedIdx !== null && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center text-green-400 text-sm font-sans"
        >
          Berhasil disalin!
        </motion.p>
      )}
    </div>
  )
}
