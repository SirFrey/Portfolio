'use client'

import { useRef } from 'react'
import {
  Canvas,
  MeshProps,
  extend,
  useFrame,
  useThree,
} from '@react-three/fiber'
import { DirectionalLight, Vector2 } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { easing } from 'maath'
import { useControls } from 'leva'
const SceneSection = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
      }}
      style={{
        position: 'absolute',
        opacity: '.6',
      }}>
      {/* <Light /> */}
      <ShaderPlane />
      {/* <Sphere /> */}
    </Canvas>
  )
}
const Light = () => {
  const ref = useRef<DirectionalLight>(null!)
  return <directionalLight ref={ref} color='#fff' position={[20, 20, 5]} />
}
const Sphere = (props: MeshProps) => {
  const materialProps = useControls({
    thickness: { value: 5, min: 0, max: 20 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    attenuationDistance: { value: 1, min: 0, max: 1 },
  })
  return (
    <mesh {...props} position={[0, 0, 1]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  )
}
function ShaderPlane() {
  const ref = useRef<any>(null!)
  const { viewport, size } = useThree()
  useFrame((state, delta) => {
    ref.current.time += delta
    // @ts-ignore
    easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
  })
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      {/* @ts-ignore */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
      />
    </mesh>
  )
}
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new Vector2(),
    pointer: new Vector2(),
  },
  `
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
  /*glsl*/ `
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 pointer;
      varying vec2 vUv;      

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;      
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        uv = sin(uv * 0.5) - pointer;     
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + time * 0.4);
        d = sin(d * 8.0 + time) / 8.0;
        d = abs(d);
        d = pow(0.02 / d, 2.0);
        finalColor += col * d;
        gl_FragColor = vec4(finalColor, 0.0);   
      }`
)

extend({ WaveMaterial })

export default SceneSection
