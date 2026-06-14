'use client'

import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scaleDim = isMobile ? [0.7, 0.9] : [1.05, 1]
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDim)
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div ref={containerRef} className="h-[60rem] md:h-[80rem] flex items-center justify-center relative">
      <div className="w-full relative" style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  )
}

function Card({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="w-full h-[30rem] md:h-[40rem] overflow-hidden"
    >
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}
