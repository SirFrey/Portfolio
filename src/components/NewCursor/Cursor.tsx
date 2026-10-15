import { useHoverMotion } from '@assets/hooks/useHoverMotion'
import { smoothFollow } from '@assets/utils/follow'
import { useEffect, useRef } from 'react'
import s from './Cursor.module.css'

export type CursorLabels = Record<string, string>

// A small dot that opens into a pill naming what a click will do.
// Interactive elements declare a kind with data-cursor ("go", "open", "view",
// "scroll"); the verb for each kind comes from the dictionary. A
// data-cursor-label attribute overrides the verb verbatim (the language
// switch names the target language). Other links and buttons just grow the
// dot. Form fields and iframes (Turnstile) hand back to the system cursor.
const INTERACTIVE = '[data-cursor], a, button, iframe, input, textarea, select'
const NATIVE = 'iframe, input, textarea, select, [data-cursor="native"]'

const STIFF_DOT = 40 // locked to the pointer
const STIFF_PILL = 16 // the open pill trails a little, so it reads as a tag

export default function Cursor({ labels }: { labels: CursorLabels }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const motionOk = useHoverMotion()

  useEffect(() => {
    const el = rootRef.current
    const text = textRef.current
    if (!el || !text || !motionOk) return
    const html = document.documentElement
    html.classList.add('has-custom-cursor')

    const follow = smoothFollow((x, y) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }, STIFF_DOT)
    let shown = false
    let last: Element | null = null
    let native = false

    const show = (on: boolean) => {
      el.classList.toggle(s.on, on)
    }
    const read = (from: Element | null) => {
      const target = from?.closest(INTERACTIVE) as HTMLElement | null
      native = !!target && target.matches(NATIVE)
      const kind = target && !native ? (target.dataset.cursor ?? '') : ''
      const label =
        target && !native
          ? (target.dataset.cursorLabel ?? (kind ? labels[kind] : undefined))
          : undefined
      if (label) text.textContent = label
      el.classList.toggle(s.open, !!label)
      el.classList.toggle(s.active, !!target && !native && !label)
      follow.setStiffness(label ? STIFF_PILL : STIFF_DOT)
      show(shown && !native)
    }

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        follow.jump(e.clientX, e.clientY)
      } else {
        follow.set(e.clientX, e.clientY)
      }
      if (e.target !== last) {
        last = e.target as Element
        read(last)
      } else {
        show(!native)
      }
    }
    // pointermove never fires over an iframe, but pointerover does when
    // entering one; pointerout with no relatedTarget means the window was left
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element).tagName === 'IFRAME') {
        last = e.target as Element
        read(last)
      }
    }
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        shown = false
        last = null
        show(false)
      }
    }
    const onDown = () => el.classList.add(s.press)
    const onUp = () => el.classList.remove(s.press)

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      follow.stop()
      html.classList.remove('has-custom-cursor')
      el.className = s.cursor
    }
  }, [motionOk, labels])

  return (
    <div ref={rootRef} className={s.cursor} aria-hidden='true'>
      <div className={s.pill}>
        <span ref={textRef} />
      </div>
    </div>
  )
}
