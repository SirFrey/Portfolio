'use client'
import { useScrollSpy } from '@assets/hooks/useScrollSpy'
import MenuToggle from '@components/MenuToggle/MenuToggle'
import LangSwitch from '@components/LangSwitch/LangSwitch'
import SlideBar from '@components/NavBar/NavBar'
import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import s from './Header.module.css'
import { headerLabels, links } from './dataHeader'
import { blockScroll, unblockScroll, useWindowSize } from './scripts'
import type { Lang } from '../../i18n/loader'
// Shrinks the observer's viewport to a 1%-tall band just above the middle of
// the screen (the margins cut 50% off the top and 49% off the bottom). A
// section counts as "current" while it crosses that line, so exactly one
// section is active at a time, whichever direction you scroll.
const SPY_OPTIONS: IntersectionObserverInit = {
  rootMargin: '-50% 0px -49% 0px',
}

/**
 * Fixed header: the logo, the desktop tabs, the language switch and the
 * slide-out mobile menu.
 *
 * Owns the one scroll spy for the page and passes the current section to
 * both the desktop tabs and the mobile menu, so they always agree.
 *
 * @param lang Current locale.
 */
const Header = ({ lang }: { lang: Lang }) => {
  // one tracker feeds both the desktop tabs and the mobile menu
  const sectionIds = useMemo(() => links[lang].map(l => l.href), [lang])
  const active = useScrollSpy(sectionIds, SPY_OPTIONS)

  const windowSize = useWindowSize()
  const navFixed = useRef<HTMLElement>(null)
  const bgDark = useRef<HTMLButtonElement>(null)
  const navFixedBar = useRef<HTMLElement>(null)
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(open => !open)
  // The hero already shows the name in large type, so the header logo stays
  // an "MC" monogram until that headline has scrolled out of view.
  const [showName, setShowName] = useState(false)

  useEffect(() => {
    // every page carries the hero headline (single-page site), so there is
    // no "no hero" fallback to set here
    const heroName = document.querySelector('#inicio h1')
    if (!heroName) return
    const io = new IntersectionObserver(
      ([entry]) => setShowName(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' }
    )
    io.observe(heroName)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const scroller = document.scrollingElement as HTMLElement
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${window.innerWidth - scroller.clientWidth}px`
    )
  }, [windowSize])

  useEffect(() => {
    if (isOpen && bgDark.current) {
      bgDark.current.style.display = 'inline-block'
      bgDark.current.style.animation = 'show .3s forwards'
      blockScroll({ isBlock: true })
    } else {
      unblockScroll()
      bgDark.current!.style.animation = 'unShow .2s backwards'
    }
  }, [isOpen])
  return (
    <>
      <div className={s.containerMenuToggle}>
        <MenuToggle
          toggle={() => toggleOpen()}
          isOpen={isOpen}
          label={
            isOpen ? headerLabels[lang].closeMenu : headerLabels[lang].openMenu
          }
        />
      </div>
      <header className={s.mainHeader}>
        <nav ref={navFixed} className={s.nav_fixed}>
          <a
            href='#inicio'
            className={`${s.logo}${showName ? ` ${s.logoExpanded}` : ''}`}>
            M
            <span className={s.logoRest}>
              <span>oises&nbsp;</span>
            </span>
            C
            <span className={s.logoRest}>
              <span>astellanos</span>
            </span>
          </a>
          <SlideBar lang={lang} active={active} />
          <LangSwitch lang={lang} active={active} className={s.langDesktop} />
        </nav>
        <aside
          ref={navFixedBar}
          // closed, the panel is only squeezed to ~0 width; inert keeps its
          // links out of the tab order and the accessibility tree
          inert={!isOpen}
          className={`${s.principal_nav}${isOpen ? ` ${s.menuOpen}` : ''}`}>
          <ul className={s.nav_fixed_ul}>
            {links[lang].map(({ href, name }, i) => {
              return (
                <li
                  className={s.nav_fixed_li}
                  style={{ '--i': i } as CSSProperties}
                  key={i}>
                  <a
                    href={'#' + href}
                    className={active === href ? s.isActive : undefined}
                    style={{ '--i': i } as CSSProperties}
                    aria-current={active === href ? 'location' : undefined}
                    onClick={() => toggleOpen()}>
                    <span className={s.menuLabel}>{name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <LangSwitch lang={lang} active={active} className={s.langMobile} />
        </aside>
      </header>
      {/* <!-- Dark Background --> */}
      <button
        type='button'
        aria-label='Close menu'
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => toggleOpen()}
        onAnimationEnd={e => {
          const target = e.currentTarget
          if (!isOpen) {
            target.style.display = 'none'
          }
        }}
        ref={bgDark}
        id='bg'
        className={s.bg_dark}></button>
    </>
  )
}

export default Header
