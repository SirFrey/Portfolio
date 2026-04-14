import { Canvas } from '@react-three/fiber'
import { useCallback } from 'react'
import { Scene } from './Scene'

const SceneSection = () => {
  const handleCreated = useCallback(({ gl }) => {
    gl.setClearColor(0x134558, 0)

    // Reveal only after shader has painted real pixels
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gl.domElement.style.opacity = '0.7'
      })
    })
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas
        gl={{
          antialias: false,
          stencil: false,
          depth: false,
          powerPreference: 'low-power',
          alpha: true,
          premultipliedAlpha: false,
        }}
        style={{ width: '100%', height: '100%', opacity: 0, transition: 'opacity 0.4s ease' }}
        onCreated={handleCreated}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default SceneSection
