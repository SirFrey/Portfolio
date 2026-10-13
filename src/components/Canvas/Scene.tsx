import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import * as THREE from 'three'

const TAU = Math.PI * 2
// palette() used cos(5.28318 * (l + time * 0.5 + d)); this is the time term's rate
const HUE_SPEED = 5.28318 * 0.5

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Time is wrapped into phases on the CPU so the shader can run at mediump
// (faster on mobile GPUs) without losing precision as the page stays open.
const fragmentShader = `
  uniform float ringPhase;
  uniform float huePhase;
  uniform vec2 resolution;
  uniform vec2 pointer;

  vec3 palette(float l) {
    vec3 a = vec3(0.3176470588, 0.5411764706, 0.6509803922);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(5.28318 * (l + d) + huePhase);
  }

  void main() {
    vec2 uv0 = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float l = length(uv0);

    vec2 uv = sin(uv0 * 1.1) - pointer;
    float d = length(uv) * exp(-l);
    d = abs(sin(d * 5.0 + ringPhase)) / 6.0;
    d = 0.024 / d;
    d *= d;

    vec3 finalColor = palette(l) * d;
    float brightness = max(finalColor.r, max(finalColor.g, finalColor.b));
    gl_FragColor = vec4(finalColor, brightness);
  }
`

export function Scene({ startTime = 0 }: { startTime?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const time = useRef(startTime)

  useFrame((state, delta) => {
    if (!matRef.current || !meshRef.current) return
    const { viewport, size } = state
    time.current += delta
    const { uniforms } = matRef.current
    uniforms.ringPhase.value = time.current % TAU
    uniforms.huePhase.value = (time.current * HUE_SPEED) % TAU
    easing.damp2(uniforms.pointer.value, state.pointer, 0.2, delta)
    uniforms.resolution.value.set(
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
          ringPhase: { value: startTime % TAU },
          huePhase: { value: (startTime * HUE_SPEED) % TAU },
          resolution: { value: new THREE.Vector2() },
          pointer: { value: new THREE.Vector2() },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        precision='mediump'
      />
    </mesh>
  )
}
