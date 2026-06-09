'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [show, setShow] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // REPLACE with your actual music file URL or path
    const audio = new Audio('/img/wedding-music.mp3')
    audio.loop = true
    audioRef.current = audio
    setShow(true)

    const handleInteraction = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().catch(() => {})
        setPlaying(true)
      }
    }
    document.addEventListener('click', handleInteraction, { once: true })
    return () => {
      document.removeEventListener('click', handleInteraction)
      audio.pause()
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  if (!show) return null

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 1 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-champagne/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors duration-300"
      aria-label={playing ? 'Pause musik' : 'Putar musik'}
    >
      <motion.svg
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
        viewBox="0 0 24 24"
        className="w-6 h-6 text-champagne"
        fill="currentColor"
      >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </motion.svg>
    </motion.button>
  )
}
