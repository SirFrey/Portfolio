export async function verifyToken(formData: FormData) {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  try {
    const result = await fetch(url, {
      body: formData,
      method: 'POST',
    })
    const outcome = await result.json()
    return outcome.success === true
  } catch {
    return false
  }
}
