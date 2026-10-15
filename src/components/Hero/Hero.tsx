import { useHoverMotion } from '@assets/hooks/useHoverMotion'
import { clamp, smoothFollow } from '@assets/utils/follow'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import s from './Hero.module.css'

interface Props {
  title: string
  intro: string
  ctaProjects: string
  ctaContact: string
}

// Hero-scoped pointer tracking: events only fire while the pointer is over
// the section, so nothing runs once the visitor has scrolled past it.
function trackPointer(
  section: HTMLElement,
  onMove: (e: PointerEvent) => void,
  onLeave: () => void
) {
  section.addEventListener('pointermove', onMove, { passive: true })
  section.addEventListener('pointerleave', onLeave)
  return () => {
    section.removeEventListener('pointermove', onMove)
    section.removeEventListener('pointerleave', onLeave)
  }
}

const MAGNET_RANGE = 40 // px outside the button where the pull fades in
const MAGNET_PULL = 0.3 // share of the pointer offset the button follows
const MAGNET_MAX_X = 10
const MAGNET_MAX_Y = 6
const LABEL_LEAD = 0.4 // label travels further than the button, for depth

// pulls slightly toward the cursor
function MagneticButton({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const motionOk = useHoverMotion()

  useEffect(() => {
    const el = ref.current
    const label = labelRef.current
    const section = el?.closest('section')
    if (!el || !label || !section || !motionOk) return
    const follow = smoothFollow((x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      label.style.transform = `translate3d(${x * LABEL_LEAD}px, ${y * LABEL_LEAD}px, 0)`
    }, 12)
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      // the rect includes the current pull; remove it so the pull can't feed back on itself
      const dx = e.clientX - (r.left - follow.x + r.width / 2)
      const dy = e.clientY - (r.top - follow.y + r.height / 2)
      const edge = Math.hypot(
        Math.max(0, Math.abs(dx) - r.width / 2),
        Math.max(0, Math.abs(dy) - r.height / 2)
      )
      const weight = Math.max(0, 1 - edge / MAGNET_RANGE)
      follow.set(
        clamp(dx * MAGNET_PULL, MAGNET_MAX_X) * weight,
        clamp(dy * MAGNET_PULL, MAGNET_MAX_Y) * weight
      )
    }
    const untrack = trackPointer(section, onMove, () => follow.set(0, 0))
    return () => {
      untrack()
      follow.stop()
      el.style.transform = ''
      label.style.transform = ''
    }
  }, [motionOk])

  return (
    <a ref={ref} href={href} className={className} data-cursor='go'>
      <span ref={labelRef} className={s.btnLabel}>
        {children}
      </span>
    </a>
  )
}

export default function Hero({ title, intro, ctaProjects, ctaContact }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const motionOk = useHoverMotion()

  // cursor parallax — the title block drifts toward the pointer (on top of the
  // shader). Translate only: a 3D tilt blurred the type and compounded with
  // the buttons' own pull.
  useEffect(() => {
    const el = contentRef.current
    const section = el?.closest('section')
    if (!el || !section || !motionOk) return
    const follow = smoothFollow((x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }, 5)
    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      follow.set(((e.clientX - cx) / cx) * 8, ((e.clientY - cy) / cy) * 6)
    }
    const untrack = trackPointer(section, onMove, () => follow.set(0, 0))
    return () => {
      untrack()
      follow.stop()
      el.style.transform = ''
    }
  }, [motionOk])

  return (
    <>
      <div className={s.heroContent} ref={contentRef}>
        <h1 className={s.title} style={{ animationDelay: '.12s' }}>
          {title}
        </h1>
        <p className={s.sub} style={{ animationDelay: '.26s' }}>
          {intro}
        </p>
        <div className={s.cta} style={{ animationDelay: '.4s' }}>
          <MagneticButton
            href='#portfolio'
            className={`${s.btn} ${s.btnPrimary}`}>
            {ctaProjects}
          </MagneticButton>
          <MagneticButton href='#contacto' className={`${s.btn} ${s.btnGhost}`}>
            {ctaContact}
          </MagneticButton>
        </div>
      </div>
    </>
  )
}
