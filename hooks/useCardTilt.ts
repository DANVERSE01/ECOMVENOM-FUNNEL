'use client'
import { useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

interface CardTiltOptions {
  maxAngle?: number
  scale?: number
  glassGradient?: boolean
}

export function useCardTilt<T extends HTMLElement>(options: CardTiltOptions = {}) {
  const { maxAngle = 8, scale = 1.02, glassGradient = true } = options
  const ref = useRef<T>(null)
  const glassRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateY: x * maxAngle * 2,
        rotateX: -y * maxAngle * 2,
        scale,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      })
      if (glassGradient && glassRef.current) {
        const px = (x + 0.5) * 100
        const py = (y + 0.5) * 100
        glassRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
      }
    },
    [maxAngle, scale, glassGradient],
  )

  const onMouseEnter = useCallback(() => {
    if (ref.current) ref.current.style.willChange = 'transform'
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
    if (glassRef.current) glassRef.current.style.background = 'transparent'
    el.style.willChange = 'auto'
  }, [])

  return { ref, glassRef, onMouseMove, onMouseEnter, onMouseLeave }
}
