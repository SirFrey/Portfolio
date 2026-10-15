import type { HTMLMotionProps, SVGMotionProps, Variants } from 'framer-motion'

// Vertical offsets only: a sideways one pushed tiles past the viewport edge on phones.
export const variantsHiddenElm: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}
export const propsHiddenElm: HTMLMotionProps<'div'> = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: {
    once: true,
  },
  variants: variantsHiddenElm,
}
export const containerVariants: Variants = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.25,
    },
  },
}

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}
const pathVariants: Variants = {
  hidden1: {
    translateX: '-80vw',
  },
  hidden2: {
    translateX: '20vw',
  },
  hidden3: {
    translateX: '20vw',
  },
  visible: {
    translateX: '0',
  },
}
export const propsPath: SVGMotionProps<SVGPathElement> = {
  variants: pathVariants,
}
