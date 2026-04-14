import type { FormEvent } from 'react'
import s from './Footer.module.css'

export async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  // pause button
  const button = form.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement
  button.disabled = true
  button.classList.add(s.loading)
  const res = await fetch(`/api/contact`, {
    method: 'POST',
    body: formData,
  })
  if (res.ok) {
    button.classList.add(s.success)
    button.classList.remove(s.loading)
    setTimeout(() => {
      button.classList.remove(s.success)
      button.disabled = false
    }, 3000)
    form.reset()
  } else {
    button.classList.remove(s.loading)
    button.classList.add(s.error)
    button.classList.add(s.bounce)
    button.innerText = 'Error'
    setTimeout(() => {
      button.classList.remove(s.error)
      button.disabled = false
      button.innerText = 'Send'
      button.classList.remove(s.bounce)
    }, 3000)
    console.error(await res.text())
  }
}
