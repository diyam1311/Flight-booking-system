import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, AtSign, CircleCheck } from 'lucide-react'
import AuthCard from '../components/AuthCard'
import useAuthForm from '../hooks/useAuthForm'
import { requestPasswordReset } from '../services/passwordResetService'
import { isEmail, isMobile } from '@/utils/validators'
import logoMark from '@/assets/logos/logo-mark.svg'
import loginBg from '../assets/login-bg.jpg'
import loginImage from '../assets/login-image.jpg'
import { PATHS } from '@/config/paths'

function validate(form) {
  const found = {}
  if (!form.identifier.trim()) found.identifier = 'Enter your email or mobile number'
  else if (!isEmail(form.identifier) && !isMobile(form.identifier)) found.identifier = 'Enter a valid email or 10-digit mobile number'
  return found
}

// "Forgot Password?" page (Figma: card 938 x 578, form column 333.5 wide). Opens from the login page.
// The server call is in services/passwordResetService.js.
export default function ForgotPasswordPage() {
  const { state } = useLocation() // "the page the user wanted" - handed back to the login page
  const [sentTo, setSentTo] = useState('') // filled when the link was sent

  const { form, errors, serverError, loading, handleChange, handleSubmit } = useAuthForm({
    initialValues: { identifier: '' },
    validate,
    onSubmit: async (values) => {
      await requestPasswordReset(values.identifier)
      setSentTo(values.identifier.trim())
    },
  })

  return (
    <AuthCard variant="forgot" image={loginImage} background={loginBg}>
      <div className="flex w-full max-w-[333.51px] flex-col items-center">
        <img src={logoMark} alt="Mobiyantra" className="h-[52px] w-[83px]" />

        {/* heading block: 333.51 x 84.73, gap 6.24 */}
        <div className="mt-[16px] text-center">
          <h1 className="text-[26px] font-bold leading-[36.5px]">{sentTo ? 'Check your inbox' : 'Forgot Password?'}</h1>
          <p className="mt-[6.24px] text-xs leading-[21px] text-slate-500">
            {sentTo
              ? `We have sent a password reset link to ${sentTo}.`
              : "Don't worry! Enter your registered email or mobile number to reset your password."}
          </p>
        </div>

        {sentTo ? (
          <p className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
            <CircleCheck size={16} /> Reset link sent. It may take a minute to arrive.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-[29px] flex w-full flex-col gap-[19px]">
            <div>
              <label htmlFor="identifier" className="mb-[5px] block text-[10px] font-bold uppercase text-slate-900">Email / Mobile No.</label>
              <div className="relative">
                <AtSign size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  id="identifier"
                  name="identifier"
                  autoComplete="username"
                  placeholder="name@skywings.com or mobile"
                  value={form.identifier}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.identifier)}
                  className={`h-[44.66px] w-full rounded-lg border bg-[#EEF2FB] pl-9 pr-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-navy ${errors.identifier ? 'border-red-400' : 'border-transparent'}`}
                />
              </div>
              {errors.identifier && <p role="alert" className="mt-1 text-[10px] text-red-500">{errors.identifier}</p>}
            </div>

            {serverError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[10px] text-red-600">{serverError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex h-[45.32px] w-full items-center justify-center gap-[6.94px] rounded-[8.1px] bg-[#0E1C2F] px-[20.84px] py-[12.16px] text-[13px] font-bold text-white transition hover:brightness-125 disabled:opacity-70"
            >
              {loading ? 'Sending…' : <>Send Reset Link <ArrowRight size={13} /></>}
            </button>
          </form>
        )}

        <Link to={PATHS.login} state={state} className={`flex items-center gap-1 pb-[1.74px] text-xs font-medium text-[#0E1C2F] hover:underline ${sentTo ? 'mt-6' : 'mt-[24px]'}`}>
          <ArrowLeft size={12} /> Back to Login
        </Link>
      </div>
    </AuthCard>
  )
}
