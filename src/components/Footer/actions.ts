import type { FormEvent } from 'react'
import s from './Footer.module.css'

/**
 * Send the contact form to `/api/contact` and drive the button's states:
 * loading (spinner, stripes half-closed), success (green fill and checkmark,
 * form cleared) or error (red "Error", shake), each for 3 seconds.
 *
 * Two kinds of failure, handled the same way: `fetch` *rejects* when the
 * request never completes (offline, dropped connection), and *resolves* with
 * `res.ok === false` when the server answers with an error status.
 *
 * The caller resets the Turnstile widget afterwards (see ContactForm).
 */
export async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const button = form.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement
  // Only the label text changes on error: replacing the button's contents
  // would drop the fill layer and checkmark, and lose the localized label.
  const label = button.querySelector(`.${s.sendLabel}`) as HTMLSpanElement
  const labelText = label.textContent
  button.disabled = true
  button.classList.add(s.loading)

  const showError = () => {
    button.classList.remove(s.loading)
    button.classList.add(s.error)
    button.classList.add(s.bounce)
    label.textContent = 'Error'
    setTimeout(() => {
      button.classList.remove(s.error)
      button.disabled = false
      label.textContent = labelText
      button.classList.remove(s.bounce)
    }, 3000)
  }

  let res: Response
  try {
    res = await fetch(`/api/contact`, {
      method: 'POST',
      body: formData,
    })
  } catch (err) {
    // offline / dropped connection: fetch rejects instead of returning !ok
    showError()
    console.error(err)
    return
  }

  if (res.ok) {
    button.classList.add(s.success)
    button.classList.remove(s.loading)
    setTimeout(() => {
      button.classList.remove(s.success)
      button.disabled = false
    }, 3000)
    form.reset()
  } else {
    showError()
    console.error(await res.text())
  }
}
