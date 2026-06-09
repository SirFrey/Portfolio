# Seam figures: brand-logo redesign

Date: 2026-06-09
Status: approved

## Problem

The 3D objects floating on the section seams (glass crystal/blob/cube in
`src/components/Divider/Shape3D.tsx`) feel out of place: pale glass color,
generic platonic shapes, no meaning, too solid. Replace them with extruded 3D
tech logos that carry identity while keeping the "quiet accent" presence.

## Decisions (from brainstorming)

- **Figures**: extruded brand logos, one per seam, same `Divider` slot
  architecture and alternating sides as today.

  | Seam                              | Logo       | Brand color                                 |
  | --------------------------------- | ---------- | ------------------------------------------- |
  | Portfolio → Conocimientos (right) | React      | `#61dafb`                                   |
  | Conocimientos → Sobre Mí (left)   | TypeScript | `#3178c6`                                   |
  | Sobre Mí → Desarrollando (right)  | Astro      | `#bc52ee`                                   |
  | Desarrollando → Contacto (left)   | Three.js   | `#ffffff` (black mark is invisible on teal) |

- **Finish**: brand colors at launch, switchable to cyan-glass via a single
  module-level constant (see Material).
- **Presence**: quiet accents. Keep scroll-driven rotation, idle spin, CSS bob
  and glow halo. Remove click-to-morph, pulse, and keyboard interaction —
  figures become pure decoration (`aria-hidden="true"`).
- **Reduced motion**: static logo (no spin/bob), as today.

## Implementation

### Geometry

- The four official SVG path strings (simple-icons, CC0 path data, ~1–5 KB
  each, 24×24 viewBox) are bundled as constants in the component module — no
  network fetch, no GLB downloads.
- At island mount: `SVGLoader` (three/examples) parses the path,
  `SVGLoader.createShapes` handles knockout holes, `ExtrudeGeometry` extrudes
  (depth ≈ 2.6 in 24-unit space, small bevel, `curveSegments` ≈ 10).
- Mesh is centered, Y-flipped (SVG y-down), and normalized to the same ~2.4
  unit bounding size the current shapes use.

### Material — swappable finish

```ts
type Finish = 'brand' | 'glass'
const FINISH: Finish = 'brand' // flip to 'glass' for uniform cyan-glass look
```

- `makeMaterial(finish, brandColor)` returns:
  - `brand`: glossy `MeshPhysicalMaterial` — brand color, clearcoat 1,
    roughness ~0.25, emissive = brand color × 0.05.
  - `glass`: the existing cyan transmission glass recipe (kept from the
    current implementation).
- Lighting/env unchanged: procedural PMREM env + hemisphere + key/rim/fill,
  ACES tone mapping, dpr 2.

### Removals

- Crystal/blob/cube geometry builders, blob vertex animation, `SHAPE_CYCLE`,
  click/keyboard morph handlers, pulse state and `.pulse` CSS.

### Unchanged

- `Divider.astro` (slot, halo/core glow seam), `client:only="react"` hydration,
  canvas size (140 px), bob animation, `prefers-reduced-motion` guards,
  eslint `@react-three` override scope (file path unchanged).

## Licensing note

Simple-icons path data is CC0. Brand marks themselves are subject to each
project's brand guidelines — accepted practice in "tech I use" portfolio
contexts. If ever contested, flip `FINISH` to `glass` (abstract look) or remove
the figure.

## Verification

- `pnpm lint`, `pnpm check`, `pnpm build` all green.
- Playwright on dev server: all four seams render their logo, spin on scroll,
  no console errors (ignoring known Turnstile dev noise); reduced-motion
  emulation shows static logos.
