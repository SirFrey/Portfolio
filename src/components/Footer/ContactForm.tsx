'use client'
import s from './Footer.module.css'
import { handleSubmit } from './actions'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import type { Dictionary } from '../../i18n/loader'

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [, setStatus] = useState<string>()
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.formGrid}>
        <div className={s.field}>
          <label htmlFor='email'>{dict.footer.email}</label>
          <input
            type='email'
            name='email'
            id='email'
            spellCheck={false}
            required
          />
        </div>
        <div className={s.field}>
          <label htmlFor='name'>{dict.footer.name}</label>
          <input
            type='text'
            name='name'
            id='name'
            spellCheck={false}
            required
          />
        </div>
      </div>
      <div className={s.field}>
        <label htmlFor='message'>{dict.footer.message}</label>
        <textarea name='message' id='message' required></textarea>
      </div>
      <Turnstile
        siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
        onSuccess={() => setStatus('success')}
        onError={() => setStatus('error')}
        onExpire={() => setStatus('expired')}
      />
      <button type='submit' className={s.sendBtn}>
        <span className={s.sendLabel}>{dict.footer.send}</span>
        <svg
          className={s.checkmark}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 52 52'>
          <path
            className={s.checkmark__check}
            fill='none'
            d='M14.1 27.2l7.1 7.2 16.7-16.8'
          />
        </svg>
      </button>
    </form>
  )
}
