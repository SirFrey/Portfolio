import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  output: 'static',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img2.cgtrader.com' },
      { protocol: 'https', hostname: 's3-us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'ca-times.brightspotcdn.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@styles': '/src/styles',
        '@public': '/public',
      },
    },
  },
})
