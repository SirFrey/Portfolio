import { useSyncExternalStore } from 'react'

// Pointer-driven motion only makes sense with a hovering fine pointer, and
// only when the visitor hasn't asked for reduced motion. Subscribed, so a
// change mid-visit (docking a mouse, toggling the OS setting) takes effect.
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

export const useHoverMotion = () =>
  useSyncExternalStore(subscribe, read, () => false)
