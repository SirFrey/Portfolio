import { match } from '@formatjs/intl-localematcher'
import { Negotiator } from 'negotiator'
import { NextRequest } from 'next/server'
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
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl
	const pathnameHasLocale = locales.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)
	if (pathnameHasLocale) return

	const locale = getLocale(request)
	// Redirect if there is no locale
	request.nextUrl.pathname = `/${locale}${pathname}`
	// e.g. incoming request is /products
	// The new URL is now /en-US/products
	return Response.redirect(request.nextUrl)
}
export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
		// Optional: only run on root (/) URL
		// '/'
	],
}
