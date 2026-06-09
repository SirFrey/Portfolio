# Brand-Logo Seam Figures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the glass crystal/blob/cube seam objects with extruded 3D brand logos (React, TypeScript, Astro, Three.js) in brand colors, with a one-constant switch back to cyan-glass.

**Architecture:** `Shape3D.tsx` keeps its island shell (Canvas, lights, env, reduced-motion) but swaps the geometry source: bundled simple-icons SVG path strings are extruded at mount via `SVGLoader` + `ExtrudeGeometry` and merged into one geometry. Material is produced by `makeMaterial(FINISH, brandColor)` where `FINISH: 'brand' | 'glass'`. All click-to-morph interactivity is removed — the figures become pure decoration.

**Tech Stack:** Astro 6 + React 19 islands, @react-three/fiber 9, three 0.183 (`three/addons` for SVGLoader + BufferGeometryUtils). No test runner in this repo — verification is `pnpm lint` + `pnpm check` + `pnpm build` + Playwright MCP against the dev server.

**Spec:** `docs/superpowers/specs/2026-06-09-seam-figures-design.md`

---

## File Structure

- **Create** `src/components/Divider/logoPaths.ts` — data module: `LogoName` type + `LOGO_PATHS` record (SVG path string + brand color per logo). Generated from simple-icons CDN.
- **Rewrite** `src/components/Divider/Shape3D.tsx` — logo extrusion + finish-swappable material; morph/pulse/keyboard code deleted.
- **Modify** `src/components/Divider/Shape3D.module.css` — drop pointer/hover/pulse rules, make layer non-interactive.
- **Modify** `src/components/Articles/Articles.astro` — `shape="crystal|blob|cube"` props become `logo="react|typescript|astro|threejs"`.
- Unchanged: `Divider.astro`, `eslint.config.js` (the `@react-three` override already targets `src/components/Divider/Shape3D.tsx`).

---

### Task 1: Logo path data module

**Files:**

- Create: `src/components/Divider/logoPaths.ts` (generated)

- [ ] **Step 1: Generate the data module from simple-icons**

Run (network required; paths contain only `[A-Za-z0-9 .,-]`, safe to single-quote):

```bash
cd /home/moises/projects/personal/Portfolio
python3 - <<'EOF'
import urllib.request, re
logos = {
    'react': ('react', '#61dafb'),
    'typescript': ('typescript', '#3178c6'),
    'astro': ('astro', '#bc52ee'),
    'threejs': ('threedotjs', '#ffffff'),  # black brand mark is invisible on teal
}
entries = []
for name, (slug, color) in logos.items():
    svg = urllib.request.urlopen(f'https://cdn.simpleicons.org/{slug}').read().decode()
    d = re.search(r'd="([^"]+)"', svg).group(1)
    entries.append(f"  {name}: {{\n    path: '{d}',\n    color: '{color}',\n  }},")
body = '\n'.join(entries)
open('src/components/Divider/logoPaths.ts', 'w').write(
    "// Official brand marks from simple-icons (CC0 path data, 24x24 viewBox).\n"
    "// The marks themselves remain subject to each project's brand guidelines.\n"
    "export type LogoName = 'react' | 'typescript' | 'astro' | 'threejs'\n\n"
    "export const LOGO_PATHS: Record<LogoName, { path: string; color: string }> = {\n"
    + body + "\n}\n")
print('written', len(body), 'bytes of path data')
EOF
```

Expected: `written <N> bytes of path data` with N roughly 2000–8000.

- [ ] **Step 2: Sanity-check the module**

Run: `head -c 400 src/components/Divider/logoPaths.ts && pnpm check 2>&1 | tail -3`

Expected: file starts with the comment + `export type LogoName`, and `astro check` reports `0 errors`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Divider/logoPaths.ts
git commit -m "feat(divider): add simple-icons path data for seam logos"
```

---

### Task 2: Rewrite Shape3D as extruded brand logos

**Files:**

- Modify: `src/components/Divider/Shape3D.tsx` (full rewrite below)
- Modify: `src/components/Divider/Shape3D.module.css`
- Modify: `src/components/Articles/Articles.astro:27-66` (the four `<Shape3D …>` usages)

These three changes ship in one commit — the prop interface changes, so intermediate states don't type-check.

- [ ] **Step 1: Replace the entire contents of `src/components/Divider/Shape3D.tsx` with:**

```tsx
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
const FINISH: Finish = 'brand'
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
    const t = state.clock.elapsedTime
    const scroll = window.scrollY || 0
    mesh.rotation.y = t * 0.3 + scroll * 0.0016
    mesh.rotation.x = -0.1 + scroll * 0.0004
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
```

Notes for the implementer:

- `RoundedBox` (drei) import disappears with this rewrite — that was its only usage in the repo. Leave the `@react-three/drei` dependency installed (used nowhere else, but removing packages is out of scope).
- The negative-Y geometry scale flips triangle winding; `side: THREE.DoubleSide` on both materials is what keeps faces visible. Don't "fix" the winding.

- [ ] **Step 2: In `src/components/Divider/Shape3D.module.css`, make the layer non-interactive**

Replace this block:

```css
.shape3d {
  position: absolute;
  top: 50%;
  width: 140px;
  height: 140px;
  margin-top: -70px;
  z-index: 4;
  pointer-events: auto;
  cursor: pointer;
  transition: filter 0.3s ease;
  animation: bob3d 7s ease-in-out infinite alternate;
}
```

with:

```css
.shape3d {
  position: absolute;
  top: 50%;
  width: 140px;
  height: 140px;
  margin-top: -70px;
  z-index: 4;
  pointer-events: none;
  animation: bob3d 7s ease-in-out infinite alternate;
}
```

Then delete these now-dead rules entirely (hover/pulse belonged to the removed interactivity):

```css
.shape3d:hover {
  filter: drop-shadow(0 0 16px rgba(var(--glow-rgb), 0.4));
}
```

```css
.pulse {
  filter: drop-shadow(0 0 30px rgba(var(--glow-rgb), 0.7));
}
.pulse::before {
  opacity: 0.9;
}
```

Keep `.shape3d::before` (halo), `.sideLeft`/`.sideRight`, `.canvas`, `@keyframes bob3d`, and the reduced-motion block unchanged.

- [ ] **Step 3: Update the four call sites in `src/components/Articles/Articles.astro`**

| old                                                            | new                                                             |
| -------------------------------------------------------------- | --------------------------------------------------------------- |
| `<Shape3D shape="crystal" side="right" client:only="react" />` | `<Shape3D logo="react" side="right" client:only="react" />`     |
| `<Shape3D shape="blob" side="left" client:only="react" />`     | `<Shape3D logo="typescript" side="left" client:only="react" />` |
| `<Shape3D shape="cube" side="right" client:only="react" />`    | `<Shape3D logo="astro" side="right" client:only="react" />`     |
| `<Shape3D shape="crystal" side="left" client:only="react" />`  | `<Shape3D logo="threejs" side="left" client:only="react" />`    |

(They appear in this order: after Portfolio, before Sobre Mí, after Sobre Mí, after Desarrollando.)

- [ ] **Step 4: Verify lint + types**

Run: `pnpm lint && pnpm check 2>&1 | tail -3`
Expected: eslint exits clean; astro check reports `0 errors`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Divider/Shape3D.tsx src/components/Divider/Shape3D.module.css src/components/Articles/Articles.astro
git commit -m "feat(divider): replace seam shapes with extruded brand logos

React, TypeScript, Astro and Three.js marks extruded from bundled
simple-icons path data. Brand-color glossy finish with a FINISH constant
to swap back to cyan-glass. Click-to-morph interactivity removed; the
figures are now pure decoration (aria-hidden, pointer-events none)."
```

---

### Task 3: Build + browser verification

**Files:** none (verification only; fix-forward if issues surface)

- [ ] **Step 1: Production build**

Run: `pnpm build 2>&1 | tail -4`
Expected: `[build] Complete!` with both `/es/` and `/en/` prerendered.

- [ ] **Step 2: Browser check with Playwright MCP (dev server on :4321)**

1. `browser_navigate` → `http://localhost:4321/es/`
2. `browser_evaluate`:
   ```js
   ;() =>
     new Promise(r =>
       setTimeout(
         () =>
           r({
             canvases: document.querySelectorAll('canvas').length,
             shapes: document.querySelectorAll('[class*="shape3d"]').length,
           }),
         1500
       )
     )
   ```
   Expected: `canvases: 5` (hero shader + 4 logos), `shapes: 4`.
3. Scroll each seam into view (`document.querySelectorAll('[class*="shape3d"]')[i].scrollIntoView({block:'center'})`, i = 0..3) and `browser_take_screenshot` — confirm each logo reads as its mark (React atom, TS tile, Astro A, white Three.js lattice) in brand color, smooth edges, sitting on the glow seam.
4. `browser_console_messages` (level error) — nothing new beyond the known Turnstile-sandbox dev noise and the Vite dev-toolbar 504 stale-dep notice.

- [ ] **Step 3: Reduced-motion spot check**

The Playwright MCP can't toggle `prefers-reduced-motion`; verify by code review that `LogoMesh` returns a static rotation when `reduced` is true and that `Shape3D.module.css` keeps the `@media (prefers-reduced-motion: reduce)` block disabling `bob3d`. Both are in the Task 2 code above.

- [ ] **Step 4: Commit any verification fixes**

Only if Step 2 surfaced fixes:

```bash
git add <touched files>
git commit -m "fix(divider): post-verification adjustments to logo seams"
```

---

## Self-review notes

- Spec coverage: figures/table → Task 2 Step 3; bundled paths → Task 1; finish swap → `FINISH` + `makeMaterial` (Task 2 Step 1); interactivity removal → Task 2 Steps 1–2; reduced motion → Task 2 Step 1 + Task 3 Step 3; perf (dpr 2, 4 canvases) → unchanged in rewrite; licensing note → header comment in `logoPaths.ts`.
- No placeholders: every code step carries full code; the data file is produced by an exact, reproducible command.
- Type consistency: `LogoName` exported from `logoPaths.ts`, consumed in `Shape3D.tsx` props and `LOGO_PATHS` lookups; `Finish` local to `Shape3D.tsx`.
