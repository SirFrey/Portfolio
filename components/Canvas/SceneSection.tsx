'use client'

import { useRef } from 'react'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
const SceneSection = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
      }}>
      <Box />
      <ambientLight intensity={0.1} />
      <directionalLight color='red' position={[0, 0, 5]} />
    </Canvas>
  )
}

const Box = (props: MeshProps) => {
  const ref = useRef<Mesh>(null!)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default SceneSection
