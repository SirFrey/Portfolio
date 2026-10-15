// Frame-rate-independent exponential smoothing toward a moving target.
// Pointer-driven motion runs through this instead of a CSS transition: a
// transition restarts on every pointermove, which reads as lag and stutter.
export function smoothFollow(
  apply: (x: number, y: number) => void,
  stiffness: number
) {
  let x = 0
  let y = 0
  let tx = 0
  let ty = 0
  let raf = 0
  let last = 0
  const tick = (t: number) => {
    const dt = last ? Math.min((t - last) / 1000, 0.05) : 1 / 60
    last = t
    const k = 1 - Math.exp(-dt * stiffness)
    x += (tx - x) * k
    y += (ty - y) * k
    const settled = Math.abs(tx - x) < 0.01 && Math.abs(ty - y) < 0.01
    if (settled) {
      x = tx
      y = ty
    }
    apply(x, y)
    if (settled) {
      raf = 0
      last = 0
    } else {
      raf = requestAnimationFrame(tick)
    }
  }
  return {
    get x() {
      return x
    },
    get y() {
      return y
    },
    set(nx: number, ny: number) {
      if (nx === tx && ny === ty) return
      tx = nx
      ty = ny
      if (!raf) raf = requestAnimationFrame(tick)
    },
    /** Jump straight to a point with no easing (first show, after a hide). */
    jump(nx: number, ny: number) {
      x = tx = nx
      y = ty = ny
      apply(x, y)
    },
    setStiffness(n: number) {
      stiffness = n
    },
    stop() {
      cancelAnimationFrame(raf)
    },
  }
}

export const clamp = (v: number, max: number) =>
  Math.max(-max, Math.min(max, v))
