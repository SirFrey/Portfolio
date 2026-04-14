import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 pointer;

  vec3 palette(float t) {
    vec3 a = vec3(0.3176470588, 0.5411764706, 0.6509803922);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(5.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    uv = sin(uv * 1.1) - pointer;
    float d = length(uv) * exp(-length(uv0));
    vec3 col = palette(length(uv0) + time * 0.5);
    d = sin(d * 5.0 + time) / 6.0;
    d = abs(d);
    d = pow(0.024 / d, 2.0);
    finalColor += col * d;
    float brightness = max(finalColor.r, max(finalColor.g, finalColor.b));
    gl_FragColor = vec4(finalColor, brightness);
  }
`

export function Scene() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (!matRef.current || !meshRef.current) return
    const { viewport, size } = state
    matRef.current.uniforms.time.value += delta
    easing.damp2(matRef.current.uniforms.pointer.value, state.pointer, 0.2, delta)
    matRef.current.uniforms.resolution.value.set(
      size.width * viewport.dpr,
      size.height * viewport.dpr
    )
    meshRef.current.scale.set(viewport.width, viewport.height, 1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry />
      <shaderMaterial
        ref={matRef}
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2() },
          pointer: { value: new THREE.Vector2() },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
