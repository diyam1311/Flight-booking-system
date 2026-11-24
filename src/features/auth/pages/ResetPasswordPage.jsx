import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CircleCheck, Lock, ShieldCheck } from 'lucide-react'
import AuthCard from '../components/AuthCard'
import PasswordInput from '../components/PasswordInput'
import PasswordStrength from '../components/PasswordStrength'
import useAuthForm from '../hooks/useAuthForm'
import { resetPassword } from '../services/passwordResetService'
import { isStrongEnough } from '@/utils/validators'
import logoMark from '@/assets/logos/logo-mark.svg'
import loginBg from '../assets/login-bg.jpg'
import loginImage from '../assets/login-image.jpg'
import { PATHS } from '@/config/paths'

function validate(form) {
  const found = {}
  if (!form.password) found.password = 'Enter a new password'
  else if (!isStrongEnough(form.password)) found.password = 'Password must be at least 8 characters'
  if (!form.confirm) found.confirm = 'Confirm your new password'
  else if (form.confirm !== form.password) found.confirm = 'Passwords do not match'
  return found
}

// "Set New Password" page. The user opens it from the link in the reset e-mail: /reset-password?token=...
// Card size comes from AuthCard variant "reset" (Figma: 856 x 569).
// The server call is in services/passwordResetService.js.
export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || '' // the secret code from the e-mail link
  const [done, setDone] = useState(false)  // true after the password was changed

  const { form, errors, serverError, loading, handleChange, handleSubmit } = useAuthForm({
    initialValues: { password: '', confirm: '' },
    validate,
    onSubmit: async (values) => {
      await resetPassword({ token, password: values.password })
      setDone(true)
    },
  })

  return (
    <AuthCard variant="reset" image={loginImage} background={loginBg}>
      <div className="flex w-full max-w-[378.7px] flex-col items-center">
        <img src={logoMark} alt="Mobiyantra" className="h-[52px] w-[83px]" />

        <h1 className="mt-[7px] text-[20px] font-bold leading-7">{done ? 'Password Updated' : 'Set New Password'}</h1>
        <p className="mt-[7px] text-center text-[11px] leading-[17px] text-slate-500">
          {done
            ? 'Your password was changed. Log in with your new password.'
            : 'Create a secure password to protect your MobiYantra travel credentials.'}
        </p>

        {done ? (
          <>
            <p className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
              <CircleCheck size={16} /> Password updated successfully.
            </p>
            <Link
              to={PATHS.login}
              className="mt-6 flex h-[39px] w-full items-center justify-center gap-[6.94px] rounded-[8.1px] bg-[#0E1C2F] text-xs font-bold text-white transition hover:brightness-125"
            >
              Go to Login <ArrowRight size={13} />
            </Link>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} noValidate className="mt-6 flex w-full flex-col">
              <PasswordInput
                id="password" name="password" label="New Password" hint="Min. 8 characters" icon={Lock}
                autoComplete="new-password" value={form.password} onChange={handleChange} error={errors.password}
              >
                <PasswordStrength password={form.password} />
              </PasswordInput>

              <PasswordInput
                id="confirm" name="confirm" label="Confirm Password" icon={ShieldCheck} className="mt-[17.5px]"
                autoComplete="new-password" value={form.confirm} onChange={handleChange} error={errors.confirm}
              />

              {serverError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[10px] text-red-600">{serverError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-[25.5px] flex h-[39px] w-full items-center justify-center gap-[6.94px] rounded-[8.1px] bg-[#0E1C2F] text-xs font-bold text-white transition hover:brightness-125 disabled:opacity-70"
              >
                {loading ? 'Updating…' : <>Update Password <ArrowRight size={13} /></>}
              </button>
            </form>

            <Link to={PATHS.login} className="mt-[21.5px] flex items-center gap-1 text-xs font-medium leading-[14px] text-[#0E1C2F] hover:underline">
              <ArrowLeft size={12} /> Back to Login
            </Link>
          </>
        )}
      </div>
    </AuthCard>
  )
}
