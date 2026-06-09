'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: string
  hours: string
  minutes: string
  seconds: string
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
    hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
    minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
    seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
  }
}

const targetDate = new Date('2026-07-11T09:00:00+08:00')

const items: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
]

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: '--', hours: '--', minutes: '--', seconds: '--' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calcTimeLeft(targetDate))
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {items.map(({ key, label }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center min-w-[64px] sm:min-w-[76px]"
        >
          <div className="bg-black/25 backdrop-blur-md border border-champagne/30 rounded-xl px-3 py-3 sm:px-4 sm:py-4 w-full text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-champagne">
              {timeLeft[key]}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1.5 font-sans">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
