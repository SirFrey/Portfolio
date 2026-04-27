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
  active: string
  href: string
}

const NavbarButton = ({
  btnClass,
  btnName,
  setOffsets,
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
        if (active === btnName) {
          setOffsetsRef.current(target.offsetLeft, target.offsetWidth)
        }
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [active, btnName])

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
  const [theme] = useState('dark')
  const navbarRef = useRef<HTMLDivElement>(null)
  const activeLink = useScrollSpy(hrefNames(lang), {
    threshold: 0.5,
  })

  const handleSetOffsets = (left: number, width: number) => {
    setOffLeft(left)
    setOffWidth(width)
  }

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
        (Math.round(offLeft + Math.round(offWidth / 2) + 60) /
          navbar.offsetWidth) *
          100
      )
    }%`
    navbar.style.setProperty('--x', x)
  }, [offLeft, offWidth])

  return (
    <div id='body' className={theme}>
      <aside className='lightbulb'></aside>
      <header className='header'>
        <div className='navbar' ref={navbarRef}>
          <div className='navbar-curr--stroke' aria-hidden='true'></div>
          <div className='navbar-root'>
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
                active={activeLink}
              />
            ))}
            <div
              className='navbar-curr--pill'
              aria-hidden='true'
              style={{
                transform: `translateX(${offLeft - 4}px)`,
                width: `${offWidth}px`,
              }}></div>
            <div
              className='navbar-curr--glow'
              aria-hidden='true'
              style={{
                transform: `translateX(${
                  offLeft + Math.round(offWidth / 2) - 20.25
                }px)`,
              }}></div>
          </div>
        </div>
      </header>
    </div>
  )
}
