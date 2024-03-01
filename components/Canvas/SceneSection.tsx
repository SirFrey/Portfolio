'use client'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
const worker = new Worker(new URL('./worker.tsx', import.meta.url), {
  type: 'module',
})

const SceneSection = () => {
  return (
    <Canvas
      gl={{ antialias: false, stencil: false, depth:false, powerPreference: 'high-performance' }}
      camera={{
        fov: 45,
      }}
      style={{
        position: 'absolute',
        opacity: '.7',
        zIndex: '1',
      }}>
      <Scene />
    </Canvas>
  )
}

export default SceneSection
