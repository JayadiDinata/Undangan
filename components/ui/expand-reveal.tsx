'use client'

import { useEffect, useRef, useState, type TouchEvent, type ReactNode } from 'react'

interface ExpandRevealProps {
  imageSrc: string
  bgImageSrc: string
  titleFirst: string
  titleSecond: string
  onComplete: () => void
  children?: ReactNode
}

export default function ExpandReveal({
  imageSrc,
  bgImageSrc,
  titleFirst,
  titleSecond,
  onComplete,
  children,
}: ExpandRevealProps) {
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [touchY, setTouchY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (done) return
    const speed = 0.001
    const retract = 0.005

    const onWheel = (e: WheelEvent) => {
      if (expanded && e.deltaY < 0 && window.scrollY <= 5) {
        setExpanded(false)
        e.preventDefault()
        return
      }
      if (expanded) return
      e.preventDefault()
      const delta = e.deltaY * (e.deltaY > 0 ? speed : retract)
      setProgress((p) => {
        const next = Math.min(Math.max(p + delta, 0), 1)
        if (next >= 1) {
          setExpanded(true)
          setShowContent(true)
        } else if (next < 0.75) {
          setShowContent(false)
        }
        return next
      })
    }

    const onTouchStart = (e: TouchEvent) => {
      setTouchY(e.touches[0].clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!touchY) return
      const dy = touchY - e.touches[0].clientY

      if (expanded && dy < -20 && window.scrollY <= 5) {
        setExpanded(false)
        e.preventDefault()
        return
      }
      if (expanded) return
      e.preventDefault()
      const factor = dy < 0 ? 0.008 : 0.005
      const delta = dy * factor
      setProgress((p) => {
        const next = Math.min(Math.max(p + delta, 0), 1)
        if (next >= 1) {
          setExpanded(true)
          setShowContent(true)
        } else if (next < 0.75) {
          setShowContent(false)
        }
        return next
      })
      setTouchY(e.touches[0].clientY)
    }

    const onTouchEnd = () => setTouchY(0)

    const onScroll = () => {
      if (!expanded) window.scrollTo(0, 0)
    }

    window.addEventListener('wheel', onWheel as unknown as EventListener, { passive: false })
    window.addEventListener('scroll', onScroll as unknown as EventListener)
    window.addEventListener('touchstart', onTouchStart as unknown as EventListener, { passive: false })
    window.addEventListener('touchmove', onTouchMove as unknown as EventListener, { passive: false })
    window.addEventListener('touchend', onTouchEnd as unknown as EventListener)

    return () => {
      window.removeEventListener('wheel', onWheel as unknown as EventListener)
      window.removeEventListener('scroll', onScroll as unknown as EventListener)
      window.removeEventListener('touchstart', onTouchStart as unknown as EventListener)
      window.removeEventListener('touchmove', onTouchMove as unknown as EventListener)
      window.removeEventListener('touchend', onTouchEnd as unknown as EventListener)
    }
  }, [progress, expanded, touchY, done])

  const w = 300 + progress * (isMobile ? 650 : 1250)
  const h = 400 + progress * (isMobile ? 200 : 400)
  const tx = progress * (isMobile ? 180 : 150)

  const handleDone = () => {
    setDone(true)
    window.scrollTo(0, 0)
    setTimeout(onComplete, 100)
  }

  return (
    <div className="fixed inset-0 z-50 bg-brown-dark overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-dvh">
        {/* background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${bgImageSrc}')`, opacity: 1 - progress }}
        />

        <div className="relative z-10 container mx-auto flex flex-col items-center justify-start">
          {/* expand area */}
          <div className="flex flex-col items-center justify-center w-full h-dvh relative">
            {/* photo card */}
            <div
              className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
              style={{
                width: `${Math.min(w, window.innerWidth * 0.95)}px`,
                height: `${Math.min(h, window.innerHeight * 0.85)}px`,
                boxShadow: '0 0 50px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={imageSrc}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: `rgba(62,22,12,${0.7 - progress * 0.3})` }}
              />
            </div>

            {/* title */}
            <div className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col">
              <h2
                className="font-title text-5xl md:text-7xl text-cream transition-none"
                style={{ transform: `translateX(-${tx}vw)` }}
              >
                {titleFirst}
              </h2>
              <p className="font-serif text-cream/50 text-lg italic my-1">&amp;</p>
              <h2
                className="font-title text-5xl md:text-7xl text-cream transition-none"
                style={{ transform: `translateX(${tx}vw)` }}
              >
                {titleSecond}
              </h2>
              <p
                className="text-cream/40 text-xs uppercase tracking-[0.3em] font-content mt-4"
                style={{ opacity: 1 - progress }}
              >
                Sabtu, 11 Juli 2026
              </p>
              <p
                className="text-cream/30 text-[11px] font-content mt-2 animate-pulse"
                style={{ opacity: Math.max(0, 1 - progress * 3) }}
              >
                Geser ke bawah untuk buka
              </p>
            </div>
          </div>

          {/* content after expand */}
          <div
            style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.7s' }}
            className="w-full"
          >
            {children}
            {!done && expanded && showContent && (
              <div className="flex justify-center pb-16">
                <button
                  onClick={handleDone}
                  className="px-8 py-3 rounded-full bg-cream/10 border border-cream/30 text-cream font-content text-sm cursor-pointer hover:bg-cream/20 transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
