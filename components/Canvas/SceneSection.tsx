'use client'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

const worker = new Worker(new URL('./worker.tsx', import.meta.url), {
  type: 'module',
})

const SceneSection = () => {
  return (
    <Canvas
      gl={{ antialias: false, stencil: false, depth:false, powerPreference: 'low-power', alpha: false, preserveDrawingBuffer: false }}
      style={{
        position: 'absolute',
        opacity: '.70',
        zIndex: '1',
      }}>
      <Scene />
    </Canvas>
  )
}

export default SceneSection
