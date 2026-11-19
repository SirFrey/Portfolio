import s from './MenuToggle.module.css'

// The top and bottom lines swap their path between these two shapes; the
// browser tweens `d` where CSS supports it and switches instantly elsewhere.
const LINES = {
  closed: { top: 'M 2 2.5 L 20 2.5', bottom: 'M 2 16.346 L 20 16.346' },
  open: { top: 'M 3 16.5 L 17 2.5', bottom: 'M 3 2.5 L 17 16.346' },
}

/**
 * Hamburger button for the mobile menu; its three lines morph into an X.
 *
 * @param toggle Opens or closes the menu.
 * @param isOpen Whether the menu is open (drives the icon and aria-expanded).
 * @param label Accessible name for the current state, e.g. "Abrir menú".
 */
function MenuToggle({
  toggle,
  isOpen,
  label,
}: {
  toggle: () => void
  isOpen: boolean
  label: string
}) {
  const lines = isOpen ? LINES.open : LINES.closed
  return (
    <button
      type='button'
      aria-label={label}
      aria-expanded={isOpen}
      onClick={toggle}
      className={s.button}>
      <svg viewBox='0 0 23 23' aria-hidden='true'>
        <path d={lines.top} style={{ d: `path('${lines.top}')` }} />
        <path d='M 2 9.423 L 20 9.423' style={{ opacity: isOpen ? 0 : 1 }} />
        <path d={lines.bottom} style={{ d: `path('${lines.bottom}')` }} />
      </svg>
    </button>
  )
}

export default MenuToggle
