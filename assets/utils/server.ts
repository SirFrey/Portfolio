import 'server-only'

export async function verifyToken(formData: FormData) {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  const firstResult = await fetch(url, {
    body: formData,
    method: 'POST',
  })
  const firstOutcome = await firstResult.json()
  if (!firstOutcome.success) {
    return false
  }
  return true
}
