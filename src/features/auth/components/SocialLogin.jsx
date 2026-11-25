import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { startGoogleChallenge } from '../services/authService'

const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client'

function loadGoogleIdentity() {
  if (window.google?.accounts?.id) return Promise.resolve(window.google)

  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = GOOGLE_SCRIPT_URL
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
    script.addEventListener('load', () => resolve(window.google), { once: true })
    script.addEventListener('error', () => reject(new Error('Google sign-in could not be loaded. Please try again.')), { once: true })
  })
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="12" height="12" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  )
}

const buttonClass =
  'flex h-[32.67px] w-full items-center justify-center gap-2 rounded-[9.33px] border border-[#E2E8F0]/80 bg-[#F8FAFC] px-3 text-[10px] font-medium text-slate-800 transition hover:bg-slate-100'

async function prepareGoogleButton(google, container, fallbackClientId, callback) {
  const challenge = await startGoogleChallenge()
  google.accounts.id.initialize({
    client_id: challenge.clientId || fallbackClientId,
    nonce: challenge.nonce,
    callback,
    auto_select: false,
  })
  container.replaceChildren()
  google.accounts.id.renderButton(container, {
    type: 'standard',
    theme: 'outline',
    size: 'medium',
    text: 'signin_with',
    shape: 'rectangular',
    width: container.clientWidth,
  })
}

export default function SocialLogin() {
  const googleIdentity = useRef(null)
  const googleButton = useRef(null)
  const { loginWithGoogle } = useAuth()
  const [googleError, setGoogleError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleReady, setGoogleReady] = useState(false)

  const handleGoogleCredential = useCallback(async ({ credential }) => {
    if (!credential) {
      setGoogleError('Google did not return a sign-in credential. Please try again.')
      return
    }
    setGoogleError('')
    setLoading(true)
    try {
      await loginWithGoogle(credential, false)
    } catch (error) {
      setGoogleError(error.message || 'Google sign-in failed. Please try again.')
      try {
        if (googleIdentity.current && googleButton.current) {
          await prepareGoogleButton(googleIdentity.current, googleButton.current, import.meta.env.VITE_GOOGLE_CLIENT_ID, handleGoogleCredential)
        }
      } catch {
        setGoogleError('Could not restart Google sign-in. Please refresh and try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [loginWithGoogle])

  useEffect(() => {
    let active = true
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      setGoogleError('Google sign-in is not configured. Set VITE_GOOGLE_CLIENT_ID to enable it.')
      return () => { active = false }
    }

    loadGoogleIdentity().then((google) => {
      if (!active) return
      if (!googleButton.current) return
      googleIdentity.current = google
      return prepareGoogleButton(google, googleButton.current, clientId, handleGoogleCredential)
        .then(() => { if (active) setGoogleReady(true) })
    }).catch((error) => {
      if (active) setGoogleError(error.message)
    })

    return () => { active = false }
  }, [handleGoogleCredential])

  return (
    <>
      <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-wider text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> or continue with <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="flex flex-col gap-[12.44px]">
        <button type="button" className={buttonClass}>
          <AppleIcon /> Sign in with Apple
        </button>
        <div className={`relative h-[32.67px] w-full overflow-hidden rounded-[9.33px] ${!googleReady || loading ? 'pointer-events-none opacity-60' : ''}`} aria-label="Sign in with Google">
          <div ref={googleButton} className="absolute inset-0 flex justify-center" />
          {!googleReady && (
            <span className={`${buttonClass} pointer-events-none absolute inset-0`}>
              <GoogleIcon /> Sign in with Google
            </span>
          )}
        </div>
        {googleError && <p role="alert" className="text-center text-[10px] text-red-600">{googleError}</p>}
      </div>
    </>
  )
}
