// Vanilla reveal: toggles `.is-visible` on `[data-reveal]` elements when they enter the viewport.
// CSS in src/styles/index.css owns the actual fade/slide transitions.

const init = () => {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (!elements.length) return

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )

  elements.forEach(el => io.observe(el))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
