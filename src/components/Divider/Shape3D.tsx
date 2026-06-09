import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { LOGO_PATHS, type LogoName } from './logoPaths'
import s from './Shape3D.module.css'

// Flip to 'glass' for the uniform cyan-glass finish (abstract, palette-matched)
// if brand colors ever feel wrong — see the design spec.
type Finish = 'brand' | 'glass'
const FINISH: Finish = 'glass'
const GLOW = '#7fe9ff'

// Procedural equirectangular gradient — gives the materials something teal to reflect.
function makeEnvTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 128
  const g = c.getContext('2d')!
  const grad = g.createLinearGradient(0, 0, 0, 128)
  grad.addColorStop(0, '#dff2f8')
  grad.addColorStop(0.35, '#a7cdda')
  grad.addColorStop(0.55, '#8fd8e8')
  grad.addColorStop(0.62, GLOW)
  grad.addColorStop(0.8, '#1b5570')
  grad.addColorStop(1, '#0a2c3a')
  g.fillStyle = grad
  g.fillRect(0, 0, 256, 128)
  // soft radial blooms (hard-edged shapes read as harsh speculars)
  g.globalCompositeOperation = 'lighter'
  const bloom = (x: number, y: number, r: number, a: number) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, r)
    rg.addColorStop(0, `rgba(225,247,255,${a})`)
    rg.addColorStop(1, 'rgba(225,247,255,0)')
    g.fillStyle = rg
    g.fillRect(x - r, y - r, r * 2, r * 2)
  }
  bloom(64, 30, 42, 0.6)
  bloom(192, 46, 48, 0.42)
  bloom(128, 100, 56, 0.2)
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

function buildLogoGeometry(svgPath: string) {
  const { paths } = new SVGLoader().parse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${svgPath}"/></svg>`
  )
  const parts: THREE.BufferGeometry[] = []
  for (const p of paths) {
    for (const shape of SVGLoader.createShapes(p)) {
      parts.push(
        new THREE.ExtrudeGeometry(shape, {
          depth: 2.6,
          bevelEnabled: true,
          bevelThickness: 0.35,
          bevelSize: 0.25,
          bevelSegments: 3,
          curveSegments: 10,
        })
      )
    }
  }
  const geo = mergeGeometries(parts)
  parts.forEach(g => g.dispose())
  geo.computeBoundingBox()
  const center = geo.boundingBox!.getCenter(new THREE.Vector3())
  const size = geo.boundingBox!.getSize(new THREE.Vector3())
  geo.translate(-center.x, -center.y, -center.z)
  const k = 2.4 / Math.max(size.x, size.y, size.z)
  geo.scale(k, -k, k) // negative Y: SVG y-axis points down
  return geo
}

function makeMaterial(finish: Finish, brandColor: string) {
  if (finish === 'glass') {
    const col = new THREE.Color(GLOW)
    const m = new THREE.MeshPhysicalMaterial({
      color: col.clone().lerp(new THREE.Color(0xffffff), 0.5),
      metalness: 0,
      roughness: 0.18,
      transmission: 1,
      thickness: 1.6,
      ior: 1.3,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1,
      clearcoatRoughness: 0.28,
      emissive: col.clone().multiplyScalar(0.05),
      side: THREE.DoubleSide,
    })
    m.attenuationColor = col
    m.attenuationDistance = 0.9
    m.envMapIntensity = 1.1
    return m
  }
  const col = new THREE.Color(brandColor)
  const m = new THREE.MeshPhysicalMaterial({
    color: col,
    metalness: 0,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.3,
    emissive: col.clone().multiplyScalar(0.05),
    side: THREE.DoubleSide,
  })
  m.envMapIntensity = 1.1
  return m
}

// Sets the gradient as image-based lighting so materials have something to reflect.
function EnvSetup({ texture }: { texture: THREE.Texture }) {
  const gl = useThree(st => st.gl)
  const scene = useThree(st => st.scene)
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    pmrem.compileEquirectangularShader()
    const env = pmrem.fromEquirectangular(texture).texture
    scene.environment = env
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene, texture])
  return null
}

function LogoMesh({ logo, reduced }: { logo: LogoName; reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const geometry = useMemo(
    () => buildLogoGeometry(LOGO_PATHS[logo].path),
    [logo]
  )
  const material = useMemo(
    () => makeMaterial(FINISH, LOGO_PATHS[logo].color),
    [logo]
  )
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])

  useFrame(state => {
    const mesh = meshRef.current
    if (!mesh) return
    if (reduced) {
      mesh.rotation.set(-0.1, 0, 0)
      return
    }
    // bounded sway — a flat extruded logo reads as a stick when edge-on,
    // so it never turns more than ~±35° away from the viewer
    const t = state.clock.elapsedTime
    const scroll = window.scrollY || 0
    mesh.rotation.y = Math.sin(t * 0.5 + scroll * 0.002) * 0.6
    mesh.rotation.x = -0.1 + Math.sin(t * 0.3) * 0.06
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} />
}

export default function Shape3D({
  logo = 'react',
  side = 'right',
}: {
  logo?: LogoName
  side?: 'left' | 'right'
}) {
  // client:only island, so window is available during the lazy initializer
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const envTexture = useMemo(() => makeEnvTexture(), [])
  useEffect(() => () => envTexture.dispose(), [envTexture])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div
      className={`${s.shape3d} ${side === 'left' ? s.sideLeft : s.sideRight}`}
      aria-hidden='true'>
      <Canvas
        className={s.canvas}
        gl={{ alpha: true, antialias: true }}
        dpr={2}
        camera={{ fov: 34, position: [0, 0, 4.8] }}>
        {/* hemisphere fill gives a soft sky→teal gradient instead of flat shade */}
        <hemisphereLight args={[0xdff2f8, 0x0a2c3a, 0.9]} />
        <directionalLight position={[2.5, 3, 2]} intensity={1.4} />
        <pointLight
          color={GLOW}
          position={[-2.5, -1.5, 2.5]}
          intensity={4}
          distance={22}
        />
        <pointLight
          color={0xeafaff}
          position={[1.5, -2, -2]}
          intensity={2}
          distance={22}
        />
        <EnvSetup texture={envTexture} />
        <LogoMesh logo={logo} reduced={reduced} />
      </Canvas>
    </div>
  )
}
