import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Scene } from './Scene'

function RevealCanvas({ wrapperRef }: { wrapperRef: React.RefObject<HTMLDivElement | null> }) {
  const gl = useThree((s) => s.gl)
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

  return (
    <div ref={wrapperRef} className="scene-root" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        gl={{ alpha: true }}
        style={{ width: '100%', height: '100%' }}>
        <Scene />
        <RevealCanvas wrapperRef={wrapperRef} />
      </Canvas>
    </div>
  )
}

export default SceneSection
