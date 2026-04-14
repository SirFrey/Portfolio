/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MAIL: string
  readonly PASS: string
  readonly TURNSTILE_SECRET_KEY: string
  readonly PUBLIC_TURNSTILE_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
