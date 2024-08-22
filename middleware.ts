import { match } from '@formatjs/intl-localematcher'
import { Negotiator } from 'negotiator'

import { NextRequest, NextResponse } from 'next/server'
let locales = ['es', 'en']
let defaultLocale = 'es'
function getLocale(request: NextRequest) {
  const headers = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // check all routes to print hello world in the console
  if (pathname.match('/*')) {
    console.log('hello world')
  }


  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (
    pathnameHasLocale ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  )
    return
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}
export const config = {
  matcher: ['/((?!_next).*)'],
}
