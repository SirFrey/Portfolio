'use client'
import { useScrollSpy } from '@assets/hooks/useScrollSpy'
import MenuToggle from '@components/MenuToggle/MenuToggle'
import LangSwitch from '@components/LangSwitch/LangSwitch'
import SlideBar from '@components/NavBar/NavBar'
import { type Variants, motion, useCycle } from 'framer-motion'
import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import s from './Header.module.css'
import { links, variantsHeader } from './dataHeader'
import { blockScroll, unblockScroll, useWindowSize } from './scripts'
import type { Lang } from '../../i18n/loader'
const childVariants: Variants = {
  hidden: {
    filter: 'blur(4px)',
    opacity: 0,
  },
  open: {
    filter: 'blur(0)',
    opacity: 1,
  },
  hover: {
    backgroundColor: 'rgba(238, 242, 248, 0.08)',
  },
}
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
  const [isOpen, toggleOpen] = useCycle(false, true)
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
        <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
      </div>
      <header className={s.mainHeader}>
        <motion.nav
          initial='navHidden'
          animate='navVisible'
          variants={variantsHeader}
          ref={navFixed}
          className={s.nav_fixed}>
          <a
            href='#inicio'
            className={`${s.logo}${showName ? ` ${s.logoExpanded}` : ''}`}
            aria-label='Moises Castellanos'>
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
        </motion.nav>
        <motion.aside
          initial='hidden'
          animate={isOpen ? 'open' : ''}
          variants={variantsHeader}
          ref={navFixedBar}
          // closed, the panel is only squeezed to ~0 width; inert keeps its
          // links out of the tab order and the accessibility tree
          inert={!isOpen}
          className={`${s.principal_nav}${isOpen ? ` ${s.menuOpen}` : ''}`}>
          <ul className={s.nav_fixed_ul}>
            {links[lang].map(({ href, name }, i) => {
              return (
                <motion.li
                  variants={childVariants}
                  className={s.nav_fixed_li}
                  key={i}>
                  <motion.a
                    whileHover={{
                      backgroundColor: 'rgba(238, 242, 248, 0.08)',
                    }}
                    href={'#' + href}
                    className={active === href ? s.isActive : undefined}
                    style={{ '--i': i } as CSSProperties}
                    aria-current={active === href ? 'location' : undefined}
                    onClick={() => toggleOpen()}>
                    <span className={s.menuLabel}>{name}</span>
                  </motion.a>
                </motion.li>
              )
            })}
          </ul>
          <LangSwitch lang={lang} active={active} className={s.langMobile} />
        </motion.aside>
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
