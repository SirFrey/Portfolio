'use client'
import { headerLabels, links } from '@components/Header/dataHeader'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { Lang } from '../../i18n/loader'
import './NavBar.css'

/** A link's position inside the track, in px. */
type Box = { left: number; width: number }

/**
 * Desktop section tabs.
 *
 * Two marks sit behind the links: a chroma-stripe bar under the section in
 * view (`active`, from the header's scroll spy) and a soft highlight that
 * follows the hovered tab. They're separate on purpose, so hovering never
 * hides where you are on the page.
 *
 * @param lang Current locale; picks the link names and the nav's label.
 * @param active Id of the section in view, e.g. `"portfolio"`.
 */
export default function SlideBar({
  lang,
  active,
}: {
  lang: Lang
  active: string
}) {
  const items = links[lang]
  const [hovered, setHovered] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<HTMLSpanElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)

  // The two marks are positioned straight on the DOM: their place depends on
  // rendered text width, which is only known after layout, and routing that
  // through state would render twice per change.
  const place = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const boxFor = (id: string | null): Box | null => {
      const el = id
        ? track.querySelector<HTMLElement>(`[data-id="${id}"]`)
        : null
      return el ? { left: el.offsetLeft, width: el.offsetWidth } : null
    }
    const put = (el: HTMLElement | null, box: Box | null, show: boolean) => {
      if (!el) return
      // keep the last position while hidden, so it fades out in place
      if (box) {
        el.style.width = `${box.width}px`
        el.style.transform = `translateX(${box.left}px)`
      }
      el.style.opacity = show && box ? '1' : '0'
    }
    put(markRef.current, boxFor(active), true)
    put(hoverRef.current, boxFor(hovered), hovered !== null)
  }, [active, hovered])

  useLayoutEffect(place, [place])

  // Re-place on resize and once the web font has loaded (the fallback font is
  // narrower). Set up once; the ref keeps it pointing at the latest place.
  const placeRef = useRef(place)
  useLayoutEffect(() => {
    placeRef.current = place
  }, [place])
  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => placeRef.current())
    if (trackRef.current) ro.observe(trackRef.current)
    document.fonts?.ready.then(() => placeRef.current())
    return () => ro.disconnect()
  }, [])

  return (
    <nav className='site-nav' aria-label={headerLabels[lang].sections}>
      <div
        className='site-nav__track'
        ref={trackRef}
        onPointerLeave={() => setHovered(null)}>
        <span
          ref={hoverRef}
          className='site-nav__hover'
          aria-hidden='true'
          style={{ opacity: 0 }}
        />
        {items.map(({ name, href }) => (
          <a
            key={href}
            href={`#${href}`}
            data-id={href}
            className={`site-nav__link${active === href ? ' is-active' : ''}`}
            aria-current={active === href ? 'location' : undefined}
            onPointerEnter={() => setHovered(href)}
            onFocus={() => setHovered(href)}
            onBlur={() => setHovered(null)}>
            {name}
          </a>
        ))}
        <span
          ref={markRef}
          className='site-nav__mark chroma-stripes'
          aria-hidden='true'
          style={{ opacity: 0 }}
        />
      </div>
    </nav>
  )
}
