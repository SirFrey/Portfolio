import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { LOGO_PATHS, type LogoName } from './logoPaths'
import s from './Shape3D.module.css'

// A paper-white face with a solid edge in one of the chroma-stripe colours,
// like layered cut paper. (Striped side walls were tried: on thin-stroked
// marks such as three.js they broke into noisy hatching.)
/**
 * Read a colour token from `:root` (src/styles/index.css), so the 3D marks
 * can't drift from the stripes they sit on. Safe here because this island is
 * `client:only`, so the DOM exists when it runs.
 *
 * @param token CSS custom property, e.g. `'--cobalt'`.
 * @param fallback Used if the token is missing.
 * @returns The colour as written in CSS, e.g. `'#3d6bff'`.
 */
const cssColor = (token: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
  fallback
const EDGE_TOKEN: Record<LogoName, [token: string, fallback: string]> = {
  react: ['--cobalt', '#3d6bff'],
  typescript: ['--marigold', '#ffc53d'],
  astro: ['--carmine', '#e8475f'],
  threejs: ['--cobalt', '#3d6bff'],
}

/**
 * Turn an SVG path (24×24 viewBox) into extruded 3D pieces, centred and scaled
 * to fit a 2.4-unit box.
 *
 * `ExtrudeGeometry` puts the front and back faces ("caps") in material group 0
 * and the side walls in group 1, so a mesh given `[capMaterial, sideMaterial]`
 * colours them separately. Pieces aren't merged into one geometry: merging
 * would drop those groups.
 *
 * @param svgPath The `d` attribute of the logo's path.
 * @returns One geometry per closed shape in the path.
 */
function buildLogoParts(svgPath: string) {
  const { paths } = new SVGLoader().parse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${svgPath}"/></svg>`
  )
  const parts: THREE.ExtrudeGeometry[] = []
  for (const p of paths) {
    for (const shape of SVGLoader.createShapes(p)) {
      parts.push(
        new THREE.ExtrudeGeometry(shape, {
          depth: 2.2,
          bevelEnabled: false,
          curveSegments: 12,
        })
      )
    }
  }
  const box = new THREE.Box3()
  parts.forEach(g => {
    g.computeBoundingBox()
    box.union(g.boundingBox!)
  })
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const k = 2.4 / Math.max(size.x, size.y, size.z)
  parts.forEach(g => {
    g.translate(-center.x, -center.y, -center.z)
    // SVG y points down. A half turn about X flips it upright; a negative
    // scale would too, but it also reverses winding and turns faces inside out.
    g.rotateX(Math.PI)
    g.scale(k, k, k)
  })
  return parts
}

/**
 * One logo: paper-white faces, edges in the logo's palette colour, swaying
 * gently with time and scroll.
 *
 * @param logo Which mark to build.
 * @param reduced Reduced motion: hold a fixed angle instead of swaying.
 */
function LogoMesh({ logo, reduced }: { logo: LogoName; reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const parts = useMemo(() => buildLogoParts(LOGO_PATHS[logo].path), [logo])
  const materials = useMemo(() => {
    const edge = new THREE.Color(cssColor(...EDGE_TOKEN[logo]))
    return [
      new THREE.MeshLambertMaterial({ color: cssColor('--paper', '#eef2f8') }),
      // lit so the edge shades with the turn and reads as thickness; the
      // emissive floor keeps the colour saturated on walls facing away
      new THREE.MeshLambertMaterial({
        color: edge,
        emissive: edge.clone().multiplyScalar(0.35),
      }),
    ]
  }, [logo])
  useEffect(() => () => parts.forEach(g => g.dispose()), [parts])
  useEffect(() => () => materials.forEach(m => m.dispose()), [materials])

  useFrame(state => {
    const group = groupRef.current
    if (!group) return
    if (reduced) {
      // a fixed three-quarter turn so the coloured edge still shows
      group.rotation.set(-0.12, 0.45, 0)
      return
    }
    // bounded sway — a flat extruded logo reads as a stick when edge-on,
    // so it never turns more than ~±35° away from the viewer
    const t = state.clock.elapsedTime
    const scroll = window.scrollY || 0
    group.rotation.y = Math.sin(t * 0.5 + scroll * 0.002) * 0.6
    group.rotation.x = -0.12 + Math.sin(t * 0.3) * 0.06
  })

  return (
    <group ref={groupRef}>
      {parts.map((geometry, i) => (
        <mesh key={i} geometry={geometry} material={materials} />
      ))}
    </group>
  )
}

/**
 * A small WebGL canvas with one 3D logo, floating on a divider's stripe band.
 *
 * Renders frames only while on screen (an IntersectionObserver switches
 * React Three Fiber's `frameloop` between `'always'` and `'never'`), and only
 * once when the visitor prefers reduced motion (`'demand'`).
 *
 * @param logo Which mark to show.
 * @param side Which edge of the page it floats near.
 */
export default function Shape3D({
  logo = 'react',
  side = 'right',
}: {
  logo?: LogoName
  side?: 'left' | 'right'
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  // client:only island, so window is available during the lazy initializer
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [onScreen, setOnScreen] = useState(false)
  // Each canvas is a WebGL context plus geometry and shader setup; creating
  // all four at page load cost main-thread time on phones. Mount on approach
  // and keep it mounted afterwards.
  const [mounted, setMounted] = useState(false)
  const [paper, ink] = useMemo(
    () => [cssColor('--paper', '#eef2f8'), cssColor('--ink', '#14203a')],
    []
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // four of these sit down the page; only the ones in view render frames
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting)
        if (e.isIntersecting) setMounted(true)
      },
      {
        rootMargin: '300px 0px',
      }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`${s.shape3d} ${side === 'left' ? s.sideLeft : s.sideRight}`}
      aria-hidden='true'>
      {mounted && (
        <Canvas
          className={s.canvas}
          frameloop={reduced ? 'demand' : onScreen ? 'always' : 'never'}
          // no tone mapping: the palette must render as the exact CSS colours
          flat
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          camera={{ fov: 34, position: [0, 0, 4.8] }}>
          <hemisphereLight args={[paper, ink, 1.2]} />
          <directionalLight position={[1, 1.5, 4]} intensity={2.2} />
          <LogoMesh logo={logo} reduced={reduced} />
        </Canvas>
      )}
    </div>
  )
}
