import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useMemo, useRef } from 'react'
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
  uniform vec3 cobalt;
  uniform vec3 indigo;

  // Site palette: cobalt ↔ indigo. A free cosine palette drifts into
  // cyan/lilac, so the hues are pinned here. Marigold stays out — over navy
  // at partial alpha it turns khaki, and it's reserved for the CTA.
  vec3 palette(float l) {
    float t = 0.5 + 0.5 * cos(5.28318 * l + huePhase);
    return mix(indigo, cobalt, t);
  }

  // Runs once per pixel. uv0 is the pixel's position with (0,0) at the
  // centre and y from -1 to 1; l is its distance from the centre.
  void main() {
    vec2 uv0 = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float l = length(uv0);

    // The ring: d measures how close this pixel is to a wavy band that bends
    // toward the pointer; 0.024 / d peaks sharply on the band, and squaring
    // it tightens the glow.
    vec2 uv = sin(uv0 * 1.1) - pointer;
    float d = length(uv) * exp(-l);
    d = abs(sin(d * 5.0 + ringPhase)) / 6.0;
    d = 0.024 / d;
    d *= d;

    // Soft-saturate: raw d spikes far above 1 at the ring core, which clipped
    // every channel to white. This keeps the core at full palette colour.
    float intensity = 1.0 - exp(-d * 1.4);
    // Floor: the ring drifts with the pointer and its own cycle, and at its
    // dimmest the hero went flat navy. A soft centred haze keeps some depth.
    // Alpha below is the colour's own brightness, so a dim haze fades twice
    // over; it needs to be this strong to register through the 0.7 canvas.
    float haze = 0.45 * exp(-l * l * 1.1);
    intensity = max(intensity, haze);
    vec3 finalColor = palette(l) * intensity;
    float brightness = max(finalColor.r, max(finalColor.g, finalColor.b));
    gl_FragColor = vec4(finalColor, brightness);
  }
`

/**
 * Read a hex colour token from `:root` as a shader-ready RGB vector (0 to 1).
 *
 * Raw sRGB components, no colour management: the shader writes
 * `gl_FragColor` directly, so these must be the CSS hex values as-is.
 *
 * @param token CSS custom property holding a `#rrggbb` colour.
 * @param fallback Used if the token is missing.
 * @example cssVec3('--cobalt', '#3d6bff') // Vector3(0.24, 0.42, 1)
 */
function cssVec3(token: string, fallback: string) {
  const hex = (
    getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
    fallback
  ).replace('#', '')
  const n = parseInt(hex, 16)
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255
  )
}

/**
 * Full-screen shader behind the hero: a soft cobalt/indigo ring that bends
 * toward the pointer, over a faint centred haze.
 *
 * @param startTime Seconds to start the animation at, so it doesn't always
 *   open on the same frame.
 */
export function Scene({ startTime = 0 }: { startTime?: number }) {
  const palette = useMemo(
    () => ({
      cobalt: cssVec3('--cobalt', '#3d6bff'),
      indigo: cssVec3('--indigo', '#4d3dc7'),
    }),
    []
  )
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
          cobalt: { value: palette.cobalt },
          indigo: { value: palette.indigo },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        precision='mediump'
      />
    </mesh>
  )
}
