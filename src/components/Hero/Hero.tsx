import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import ReactLogo from '@assets/icons/ReactLogo'
import Three from '@assets/icons/Three'
import Git from '@assets/icons/Git'
import GitHubLogo from '@assets/icons/GitHubLogo'
import FramerMotion from '@assets/icons/FramerMotion'
import Terminal from '@assets/icons/Terminal'
import s from './Hero.module.css'

interface Props {
  title: string
  roles: string[]
  ctaProjects: string
  ctaContact: string
}

// only shape-based marks — filled-square logos (JS/TS/CSS) don't silhouette cleanly
const FLOAT_ICONS: {
  Icon: () => ReactNode
  x: string
  y: string
  size: number
  dur: number
  delay: number
  depth: 'near' | 'far'
}[] = [
  {
    Icon: ReactLogo,
    x: '9%',
    y: '26%',
    size: 54,
    dur: 15,
    delay: 0,
    depth: 'near',
  },
  {
    Icon: Three,
    x: '88%',
    y: '19%',
    size: 40,
    dur: 18,
    delay: 1.5,
    depth: 'far',
  },
  {
    Icon: Git,
    x: '90%',
    y: '66%',
    size: 44,
    dur: 20,
    delay: 2.2,
    depth: 'near',
  },
  {
    Icon: GitHubLogo,
    x: '6%',
    y: '78%',
    size: 36,
    dur: 15,
    delay: 3,
    depth: 'far',
  },
  {
    Icon: FramerMotion,
    x: '74%',
    y: '83%',
    size: 38,
    dur: 19,
    delay: 1.1,
    depth: 'far',
  },
  {
    Icon: Terminal,
    x: '94%',
    y: '42%',
    size: 34,
    dur: 21,
    delay: 2.6,
    depth: 'far',
  },
]

// rotating roles — fade in / hold / fade out crossfade
function useFadeRotate(words: string[], hold = 2200, fade = 600) {
  const [i, setI] = useState(0)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const out = setTimeout(() => setVisible(false), hold)
    const next = setTimeout(() => {
      setI(v => (v + 1) % words.length)
      setVisible(true)
    }, hold + fade)
    return () => {
      clearTimeout(out)
      clearTimeout(next)
    }
  }, [i, words, hold, fade])
  return [words[i], visible] as const
}

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
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${mx * 0.28}px, ${my * 0.4}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}>
      {children}
    </a>
  )
}

function FloatingIcons() {
  const layerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layer = layerRef.current
    if (!layer) return
    const icons = [...layer.querySelectorAll<HTMLElement>(`.${s.floatIcon}`)]
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX / window.innerWidth) * 2 - 1
      const dy = (e.clientY / window.innerHeight) * 2 - 1
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        icons.forEach(ic => {
          const f = ic.classList.contains(s.near) ? 26 : 11
          ic.style.transform = `translate(${dx * f}px, ${dy * f}px)`
        })
      })
    }
    const onLeave = () => icons.forEach(ic => (ic.style.transform = ''))
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div ref={layerRef} className={s.floatLayer} aria-hidden='true'>
      {FLOAT_ICONS.map(({ Icon, x, y, size, dur, delay, depth }, i) => (
        <span
          key={i}
          className={`${s.floatIcon} ${depth === 'near' ? s.near : s.far}`}
          style={{ left: x, top: y, width: size, height: size }}>
          <span
            className={s.fiInner}
            style={{
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}>
            <Icon />
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Hero({ title, roles, ctaProjects, ctaContact }: Props) {
  const [role, roleVisible] = useFadeRotate(roles)
  const contentRef = useRef<HTMLDivElement>(null)

  // cursor parallax — the title block tilts toward the pointer (on top of the shader)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = contentRef.current
    if (!el) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translate(${dx * 10}px, ${dy * 8}px)`
      })
    }
    const onLeave = () => {
      el.style.transform = ''
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <FloatingIcons />
      <div className={s.hudLayer} aria-hidden='true'>
        <span className={`${s.hud} ${s.tl}`} />
        <span className={`${s.hud} ${s.tr}`} />
        <span className={`${s.hud} ${s.bl}`} />
        <span className={`${s.hud} ${s.br}`} />
      </div>
      <div className={s.heroContent} ref={contentRef}>
        <h1 className={s.title} style={{ animationDelay: '.12s' }}>
          {title}
        </h1>
        <p className={s.sub} style={{ animationDelay: '.26s' }}>
          <span className={`${s.role}${roleVisible ? ` ${s.roleShow}` : ''}`}>
            {role}
          </span>
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
