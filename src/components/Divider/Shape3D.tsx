import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { LogoName } from './logoPaths'
import s from './Shape3D.module.css'

// three.js is ~870 kB: it loads with the first logo that comes near the
// viewport instead of with the page.
const Logo3D = lazy(() => import('./Logo3D'))

/**
 * A small WebGL canvas with one 3D logo, floating on a divider's stripe band.
 *
 * Renders frames only while on screen (an IntersectionObserver switches
 * React Three Fiber's `frameloop` between `'always'` and `'never'`), and only
 * once when the visitor prefers reduced motion (`'demand'`).
 *
 * @param logo Which mark to show.
 * @param side Which edge of the page it floats near.
 */
export default function Shape3D({
  logo = 'react',
  side = 'right',
}: {
  logo?: LogoName
  side?: 'left' | 'right'
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  // client:only island, so window is available during the lazy initializer
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [onScreen, setOnScreen] = useState(false)
  // Each canvas is a WebGL context plus geometry and shader setup, and the
  // first one also downloads three.js. Mount on approach and keep it mounted.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // four of these sit down the page; only the ones in view render frames
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting)
        if (e.isIntersecting) setMounted(true)
      },
      {
        rootMargin: '300px 0px',
      }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`${s.shape3d} ${side === 'left' ? s.sideLeft : s.sideRight}`}
      aria-hidden='true'>
      {mounted && (
        <Suspense fallback={null}>
          <Logo3D logo={logo} reduced={reduced} onScreen={onScreen} />
        </Suspense>
      )}
    </div>
  )
}
