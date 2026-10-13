import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Scene } from './Scene'

// The shader is a soft full-screen gradient, so it renders at reduced resolution
// and is upscaled by the browser; fragment cost scales with the square of this.
const RENDER_SCALE = 0.5
// Phones have 2-3x screens but far weaker GPUs, so they render at a fixed
// fraction of CSS pixels instead of scaling with devicePixelRatio.
const SMALL_SCREEN_DPR = 0.5
const SMALL_SCREEN_QUERY = '(max-width: 768px), (pointer: coarse)'

function RevealCanvas({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>
}) {
  const gl = useThree(s => s.gl)
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapperRef.current?.classList.add('r3f-ready')
      })
    })
    return () => cancelAnimationFrame(raf1)
  }, [gl, wrapperRef])
  return null
}

const SceneSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [small, setSmall] = useState(
    () => window.matchMedia(SMALL_SCREEN_QUERY).matches
  )

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting)
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const screen = window.matchMedia(SMALL_SCREEN_QUERY)
    const onMotion = () => setReduced(motion.matches)
    const onScreen = () => setSmall(screen.matches)
    motion.addEventListener('change', onMotion)
    screen.addEventListener('change', onScreen)
    return () => {
      motion.removeEventListener('change', onMotion)
      screen.removeEventListener('change', onScreen)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className='scene-root'
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      {/* 'always' renders once per display refresh, so it follows the screen's Hz;
          'demand' only renders on mount/resize, which freezes it when idle. */}
      <Canvas
        frameloop={onScreen && !reduced ? 'always' : 'demand'}
        dpr={
          small
            ? SMALL_SCREEN_DPR
            : Math.min(window.devicePixelRatio, 2) * RENDER_SCALE
        }
        gl={{
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: 'low-power',
        }}
        style={{ width: '100%', height: '100%' }}>
        {/* the ring only forms a few seconds in, so a frozen reduced-motion frame starts later */}
        <Scene startTime={reduced ? 4.9 : 0} />
        <RevealCanvas wrapperRef={wrapperRef} />
      </Canvas>
    </div>
  )
}

export default SceneSection
