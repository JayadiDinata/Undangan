'use client'

import { useRef } from 'react'
import { motion, useTransform, useMotionValue, type MotionValue } from 'framer-motion'
import { useLenis } from 'lenis/react'

const images = [
  { src: '/img/SR1.jpeg', alt: 'Prewedding 1' },
  { src: '/img/SR2.jpeg', alt: 'Prewedding 2' },
  { src: '/img/SR3.jpeg', alt: 'Prewedding 3' },
  { src: '/img/SR4.jpeg', alt: 'Prewedding 4' },
  { src: '/img/SR1-Photoroom (1).png', alt: 'Prewedding 5' },
  { src: '/img/Gemini_Generated_Image_swa8fzswa8fzswa8.png', alt: 'Prewedding 6' },
]

function ParallaxImage({
  src,
  alt,
  scrollProgress,
  index,
  className,
}: {
  src: string
  alt: string
  scrollProgress: MotionValue<number>
  index: number
  className?: string
}) {
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.4 + index * 0.15])
  const y = useTransform(scrollProgress, [0, 1], [0, -20 - index * 18])
  const opacity = useTransform(scrollProgress, [0, 0.15 + index * 0.04], [0, 1])

  return (
    <motion.div
      style={{ scale, y, opacity, willChange: 'transform' }}
      className={`rounded-[32px] overflow-hidden shadow-xl border border-cream/10 transform-gpu ${className || ''}`}
    >
      <div className="relative aspect-[3/4]">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

export function ZoomParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)

  useLenis(({ scroll: lenisScroll }: { scroll: number }) => {
    if (!sectionRef.current) return
    const top = sectionRef.current.offsetTop
    const height = sectionRef.current.offsetHeight
    const viewportH = window.innerHeight
    const scrollRange = height - viewportH
    if (scrollRange <= 0) return
    const p = (lenisScroll - top) / scrollRange
    progress.set(Math.max(0, Math.min(1, p)))
  })

  const bgScale = useTransform(progress, [0, 1], [1, 1.12])
  const titleOpacity = useTransform(progress, [0, 0.12], [0, 1])
  const titleY = useTransform(progress, [0, 0.12], [30, 0])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[180vh] md:h-[220vh]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/SR.jpeg')",
            scale: bgScale,
            willChange: 'transform',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(62,22,12,0.15) 0%, rgba(62,22,12,0.6) 100%)' }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-6">
          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="font-title text-3xl md:text-4xl text-cream text-center mb-5 md:mb-8"
          >
            Galeri Cinta Kami
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {images.map((img, i) => {
              const mobileHide = i > 0 ? 'hidden md:block' : ''
              const tabletHide = i > 2 ? 'hidden lg:block' : ''
              return (
                <ParallaxImage
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  scrollProgress={progress}
                  index={i}
                  className={`w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] max-w-sm ${mobileHide} ${tabletHide}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
