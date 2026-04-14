import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

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
