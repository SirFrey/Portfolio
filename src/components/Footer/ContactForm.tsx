'use client'
import s from './Footer.module.css'
import { handleSubmit } from './actions'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'
import type { Dictionary } from '../../i18n/loader'

/**
 * Contact form: email, name, message, a Cloudflare Turnstile check and the
 * striped send button.
 *
 * Turnstile runs in `interaction-only` mode, so most visitors never see it;
 * it only appears when Cloudflare wants a click. Because a failed check is
 * otherwise invisible, the form refuses to send without a token and says why.
 */
export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [check, setCheck] = useState<
    'pending' | 'interactive' | 'ready' | 'failed'
  >('pending')
  const [triedEarly, setTriedEarly] = useState(false)
  const turnstile = useRef<TurnstileInstance | undefined>(undefined)
  return (
    <form
      // Turnstile tokens are single-use: reset after every attempt so a second
      // send in the same page load gets a fresh one instead of a 400
      onSubmit={e => {
        if (check !== 'ready') {
          // without a token the API answers 400 "invalid turnstile"
          e.preventDefault()
          setTriedEarly(true)
          return
        }
        setCheck('pending')
        handleSubmit(e).finally(() => turnstile.current?.reset())
      }}
      className={s.form}>
      <div className={s.formGrid}>
        <div className={s.field}>
          <label htmlFor='email'>{dict.footer.email}</label>
          <input
            type='email'
            name='email'
            id='email'
            autoComplete='email'
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
            autoComplete='name'
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
        ref={turnstile}
        siteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
        onSuccess={() => {
          setCheck('ready')
          setTriedEarly(false)
        }}
        onError={() => setCheck('failed')}
        onUnsupported={() => setCheck('failed')}
        onExpire={() => setCheck('pending')}
        // Cloudflare wants a click: the checkbox is now visible above the note
        onBeforeInteractive={() => setCheck('interactive')}
        onAfterInteractive={() => setCheck('pending')}
        onTimeout={() => setCheck('interactive')}
        // stays invisible unless Cloudflare needs the visitor to interact
        options={{
          appearance: 'interaction-only',
          theme: 'dark',
          size: 'flexible',
        }}
        className={s.turnstile}
      />
      <p className={s.formNote} role='status' aria-live='polite'>
        {check === 'failed'
          ? dict.footer.checkFailed
          : check === 'interactive'
            ? dict.footer.checkClick
            : check === 'pending' && triedEarly
              ? dict.footer.checking
              : null}
      </p>
      <button type='submit' className={s.sendBtn}>
        <span className={s.sendFill} aria-hidden='true' />
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
