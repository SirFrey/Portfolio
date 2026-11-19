// Full-screen shader behind the hero: a soft cobalt/indigo ring that bends
// toward the pointer, over a faint centred haze.
// Plain WebGL on purpose: one quad and one fragment shader don't need three.js,
// which was ~870 kB of the first load.

const TAU = Math.PI * 2
// palette() used cos(5.28318 * (l + time * 0.5 + d)); this is the time term's rate
const HUE_SPEED = 5.28318 * 0.5

// The shader is a soft full-screen gradient, so it renders at reduced resolution
// and is upscaled by the browser; fragment cost scales with the square of this.
const RENDER_SCALE = 0.5
// Phones have 2-3x screens but far weaker GPUs, so they render at a fixed
// fraction of CSS pixels instead of scaling with devicePixelRatio.
const SMALL_SCREEN_DPR = 0.5
const SMALL_SCREEN_QUERY = '(max-width: 768px), (pointer: coarse)'
// The ring only forms a few seconds in, so a frozen reduced-motion frame starts later.
const REDUCED_START = 4.9
const POINTER_SMOOTH_TIME = 0.2

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Time is wrapped into phases on the CPU so the shader can run at mediump
// (faster on mobile GPUs) without losing precision as the page stays open.
const fragmentShader = `
  precision mediump float;
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
 * Read a hex colour token from `:root` as shader-ready RGB (0 to 1).
 *
 * Raw sRGB components, no colour management: the shader writes
 * `gl_FragColor` directly, so these must be the CSS hex values as-is.
 */
function cssRgb(token: string, fallback: string): [number, number, number] {
  const hex = (
    getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
    fallback
  ).replace('#', '')
  const n = parseInt(hex, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/** Critically damped spring towards `target` (the SmoothDamp used by game engines). */
function smoothDamp(
  current: number,
  target: number,
  velocity: { v: number },
  dt: number
) {
  const omega = 2 / POINTER_SMOOTH_TIME
  const x = omega * dt
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = current - target
  const temp = (velocity.v + omega * change) * dt
  velocity.v = (velocity.v - omega * temp) * decay
  return target + (change + temp) * decay
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function startHeroScene(root: HTMLElement) {
  const canvas = root.querySelector('canvas')
  const gl = canvas?.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  // No WebGL: the hero keeps its plain navy background.
  if (!canvas || !gl) return

  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
  gl.useProgram(program)

  // one triangle that covers the whole clip space
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const u = {
    ringPhase: uniform('ringPhase'),
    huePhase: uniform('huePhase'),
    resolution: uniform('resolution'),
    pointer: uniform('pointer'),
  }
  gl.uniform3fv(uniform('cobalt'), cssRgb('--cobalt', '#3d6bff'))
  gl.uniform3fv(uniform('indigo'), cssRgb('--indigo', '#4d3dc7'))

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const smallScreen = window.matchMedia(SMALL_SCREEN_QUERY)
  let onScreen = true
  let time = motion.matches ? REDUCED_START : 0
  let last = 0
  let frame = 0
  // -1..1 across the canvas, y up
  const target = { x: 0, y: 0 }
  const pointer = { x: 0, y: 0 }
  const velocity = { x: { v: 0 }, y: { v: 0 } }

  const draw = () => {
    gl.uniform1f(u.ringPhase, time % TAU)
    gl.uniform1f(u.huePhase, (time * HUE_SPEED) % TAU)
    gl.uniform2f(u.resolution, canvas.width, canvas.height)
    gl.uniform2f(u.pointer, pointer.x, pointer.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const resize = () => {
    const dpr = smallScreen.matches
      ? SMALL_SCREEN_DPR
      : Math.min(window.devicePixelRatio, 2) * RENDER_SCALE
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
    // resizing clears the buffer, so a paused scene needs this frame
    draw()
  }

  const tick = (now: number) => {
    // a tab that was in the background reports one huge step; cap it
    const dt = Math.min((now - last) / 1000, 0.1)
    last = now
    time += dt
    pointer.x = smoothDamp(pointer.x, target.x, velocity.x, dt)
    pointer.y = smoothDamp(pointer.y, target.y, velocity.y, dt)
    draw()
    frame = requestAnimationFrame(tick)
  }

  // Frames run only while the hero is on screen and motion is welcome.
  const sync = () => {
    cancelAnimationFrame(frame)
    frame = 0
    if (onScreen && !motion.matches) {
      last = performance.now()
      frame = requestAnimationFrame(tick)
    } else {
      draw()
    }
  }

  // The hero text sits above the canvas, so the pointer is read from the section.
  ;(root.parentElement ?? root).addEventListener(
    'pointermove',
    e => {
      const rect = canvas.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      target.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    },
    { passive: true }
  )
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting
    sync()
  }).observe(root)
  new ResizeObserver(resize).observe(canvas)
  smallScreen.addEventListener('change', resize)
  motion.addEventListener('change', () => {
    if (motion.matches) time = Math.max(time, REDUCED_START)
    sync()
  })

  resize()
  sync()
  // Show the canvas only after its first frames are on screen (see BaseLayout).
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.add('r3f-ready'))
  )
}
