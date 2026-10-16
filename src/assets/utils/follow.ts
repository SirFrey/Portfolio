/** A point that eases toward a target, frame by frame. */
export interface Follower {
  /** Current (eased) x. Read it to undo the follower's own offset. */
  readonly x: number
  /** Current (eased) y. */
  readonly y: number
  /** Move the target; the point eases toward it over the next frames. */
  set(x: number, y: number): void
  /** Jump straight to a point with no easing (first show, after a hide). */
  jump(x: number, y: number): void
  /** Change how quickly the point catches up (see `stiffness` below). */
  setStiffness(stiffness: number): void
  /** Cancel the pending frame. Call it on unmount. */
  stop(): void
}

/**
 * Frame-rate-independent exponential smoothing toward a moving target.
 *
 * Pointer-driven motion runs through this instead of a CSS transition: a
 * transition restarts on every `pointermove`, which reads as lag and stutter.
 * Here the target can change any number of times per frame; the point keeps
 * moving smoothly from wherever it is.
 *
 * Each frame closes a fraction `k = 1 - e^(-dt * stiffness)` of the remaining
 * distance. Using the frame's real duration `dt` makes the motion identical
 * at 60 Hz and 144 Hz. The loop stops by itself once the point settles, so an
 * idle follower costs nothing.
 *
 * @param apply Called every frame with the eased position. Write it to the
 *   DOM here, ideally as a `transform` so the browser doesn't re-layout.
 * @param stiffness How fast the point catches up, in 1/seconds. Roughly: it
 *   covers ~63% of the gap in `1 / stiffness` seconds. 5 drifts, 12 follows
 *   closely, 40 feels locked to the pointer.
 *
 * @example
 * const follow = smoothFollow((x, y) => {
 *   el.style.transform = `translate3d(${x}px, ${y}px, 0)`
 * }, 12)
 * window.addEventListener('pointermove', e => follow.set(e.clientX, e.clientY))
 */
export function smoothFollow(
  apply: (x: number, y: number) => void,
  stiffness: number
): Follower {
  let x = 0
  let y = 0
  let tx = 0
  let ty = 0
  let raf = 0
  let last = 0
  const tick = (t: number) => {
    // capped at 50 ms so a frame after a hidden tab doesn't jump the point
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
    set(nx, ny) {
      if (nx === tx && ny === ty) return
      tx = nx
      ty = ny
      if (!raf) raf = requestAnimationFrame(tick)
    },
    jump(nx, ny) {
      x = tx = nx
      y = ty = ny
      apply(x, y)
    },
    setStiffness(n) {
      stiffness = n
    },
    stop() {
      cancelAnimationFrame(raf)
    },
  }
}

/**
 * Limit `v` to the range `[-max, max]`.
 * @example clamp(14, 10) // 10
 */
export const clamp = (v: number, max: number) =>
  Math.max(-max, Math.min(max, v))
