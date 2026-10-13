'use client'
import { useScrollSpy } from '@assets/hooks/useScrollSpy'
import { hrefNames } from '@assets/utils/props'
import { links } from '@components/Header/dataHeader'
import { useLayoutEffect, useRef, useState } from 'react'
import type { Lang } from '../../i18n/loader'
import './NavBar.css'

interface NavBarButtonProps {
  btnClass: string
  btnName: string
  setOffsets: (offsetLeft: number, offsetWidth: number) => void
  onHover: (offsetLeft: number, offsetWidth: number) => void
  active: string
  href: string
}

const NavbarButton = ({
  btnClass,
  btnName,
  setOffsets,
  onHover,
  active,
  href,
}: NavBarButtonProps) => {
  const anchor = useRef<HTMLButtonElement>(null)
  const setOffsetsRef = useRef(setOffsets)

  useLayoutEffect(() => {
    setOffsetsRef.current = setOffsets
  }, [setOffsets])

  useLayoutEffect(() => {
    const el = anchor.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const target = entry.target as HTMLButtonElement
        if (active === href) {
          setOffsetsRef.current(target.offsetLeft, target.offsetWidth)
        }
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [active, href])

  useLayoutEffect(() => {
    const el = anchor.current
    if (href === active && el) {
      el.classList.add('navbar-link--active')
      setOffsetsRef.current(el.offsetLeft, el.offsetWidth)
    }
  }, [active, href])

  return (
    <button
      type='button'
      className={btnClass}
      data-scroll-to={btnName}
      onMouseEnter={e =>
        onHover(e.currentTarget.offsetLeft, e.currentTarget.offsetWidth)
      }
      onClick={() => {
        const elToScroll = document.getElementById(href)
        elToScroll?.scrollIntoView()
      }}
      ref={anchor}>
      {btnName}
    </button>
  )
}

export default function SlideBar({ lang }: { lang: Lang }) {
  const [offLeft, setOffLeft] = useState(4)
  const [offWidth, setOffWidth] = useState(94)
  const [hover, setHover] = useState<{ left: number; width: number } | null>(
    null
  )
  const [theme] = useState('dark')
  const navbarRef = useRef<HTMLDivElement>(null)
  // A thin band at viewport center: isIntersecting stays true for sections
  // partially visible, so a ratio threshold re-activates sections as they leave.
  const activeLink = useScrollSpy(hrefNames(lang), {
    rootMargin: '-50% 0px -49% 0px',
  })

  const handleSetOffsets = (left: number, width: number) => {
    setOffLeft(left)
    setOffWidth(width)
  }

  const handleHover = (left: number, width: number) => setHover({ left, width })

  const pillLeft = hover?.left ?? offLeft
  const pillWidth = hover?.width ?? offWidth

  useLayoutEffect(() => {
    const navbar = navbarRef.current
    if (!navbar) return
    if (navbar.classList.contains('nav-x-init')) {
      navbar.classList.remove('nav-x-init')
      navbar.classList.add('nav-x-post')
    }
    const x = `${
      100 -
      Math.round(
        (Math.round(pillLeft + Math.round(pillWidth / 2) + 60) /
          navbar.offsetWidth) *
          100
      )
    }%`
    navbar.style.setProperty('--x', x)
  }, [pillLeft, pillWidth])

  return (
    <div id='body' className={theme}>
      <aside className='lightbulb'></aside>
      <header className='header'>
        <div className='navbar' ref={navbarRef}>
          <div className='navbar-curr--stroke' aria-hidden='true'></div>
          <div className='navbar-root' onMouseLeave={() => setHover(null)}>
            {links[lang].map(({ name, href }) => (
              <NavbarButton
                href={href}
                key={name}
                btnName={name}
                btnClass={
                  activeLink === href
                    ? 'navbar-link navbar-link--active'
                    : 'navbar-link'
                }
                setOffsets={handleSetOffsets}
                onHover={handleHover}
                active={activeLink}
              />
            ))}
            <div
              className='navbar-curr--pill'
              aria-hidden='true'
              style={{
                transform: `translateX(${pillLeft - 4}px)`,
                width: `${pillWidth}px`,
              }}></div>
            <div
              className='navbar-curr--glow'
              aria-hidden='true'
              style={{
                transform: `translateX(${
                  pillLeft + Math.round(pillWidth / 2) - 20.25
                }px)`,
              }}></div>
          </div>
        </div>
      </header>
    </div>
  )
}
