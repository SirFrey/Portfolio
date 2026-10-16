import { useSyncExternalStore } from 'react'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
  const lists = [HOVER_QUERY, REDUCE_QUERY].map(q => window.matchMedia(q))
  lists.forEach(l => l.addEventListener('change', onChange))
  return () => lists.forEach(l => l.removeEventListener('change', onChange))
}
const read = () =>
  window.matchMedia(HOVER_QUERY).matches &&
  !window.matchMedia(REDUCE_QUERY).matches

/**
 * Whether pointer-driven motion should run: the visitor has a mouse or
 * trackpad (a pointer that hovers precisely) and hasn't asked their system
 * for reduced motion.
 *
 * Built on `useSyncExternalStore`, React's hook for reading a value that
 * lives outside React (here, two media queries). React calls `subscribe` once
 * and re-renders whenever a query changes, so docking a mouse to a tablet or
 * toggling the OS setting mid-visit takes effect without a reload.
 *
 * Returns `false` during server rendering (the third argument): the server
 * can't know the visitor's device, and "no motion" is the safe default.
 *
 * @example
 * const motionOk = useHoverMotion()
 * useEffect(() => {
 *   if (!motionOk) return
 *   // attach pointer listeners
 * }, [motionOk])
 */
export const useHoverMotion = () =>
  useSyncExternalStore(subscribe, read, () => false)
