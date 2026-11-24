import { Link, useLocation } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'
import PasswordField from '../components/PasswordField'
import SocialLogin from '../components/SocialLogin'
import { useAuth } from '../hooks/useAuth'
import useAuthForm from '../hooks/useAuthForm'
import { isEmail, isMobile } from '@/utils/validators'
import logoMark from '@/assets/logos/logo-mark.svg'
import loginBg from '../assets/login-bg.jpg'
import loginImage from '../assets/login-image.jpg'
import { PATHS } from '@/config/paths'

function validate(form) {
  const found = {}
  if (!form.identifier.trim()) found.identifier = 'Enter your email or mobile number'
  else if (!isEmail(form.identifier) && !isMobile(form.identifier))
    found.identifier = 'Enter a valid email or 10-digit mobile number'
  if (!form.password) found.password = 'Enter your password'
  return found
}

export default function LoginPage() {
  const { login } = useAuth()
  const { state } = useLocation() // keeps "the page the user wanted" (set by ProtectedRoute)

  const { form, errors, serverError, loading, handleChange, handleSubmit } = useAuthForm({
    initialValues: { identifier: '', password: '', remember: false },
    validate,
    onSubmit: (values) => login(values, values.remember),
  })

  return (
    <AuthCard variant="login" image={loginImage} background={loginBg}>
      {/* TOP PART */}
      <div className="flex flex-col gap-[12.44px]">
        <img src={logoMark} alt="Mobiyantra" className="mx-auto h-[30px] w-[47px]" />

        <div className="text-center">
          <h1 className="text-[28px] font-bold leading-7">Welcome Back</h1>
          <p className="mt-[3px] text-[11px] leading-[13px] text-slate-400">Enter your details to login to your account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[12.44px] pt-1.5">
          <FormField
            id="identifier"
            name="identifier"
            label="Email/Mobile No."
            placeholder="Enter your email/Mobile No."
            autoComplete="username"
            value={form.identifier}
            onChange={handleChange}
            error={errors.identifier}
          />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex items-center justify-between text-[10px]">
            <label className="flex cursor-pointer items-center gap-1.5 text-slate-500">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-3 w-3 accent-[#013172]"
              />
              Remember login
            </label>
            <Link to={PATHS.forgotPassword} state={state} className="font-semibold text-navy">Forget Password?</Link>
          </div>

          {serverError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[10px] text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-[34px] w-full rounded-[9.33px] bg-[#0F172A] text-[11px] font-bold text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <SocialLogin />
      </div>

      {/* BOTTOM PART */}
      <p className="pb-[3px] pt-[15px] text-center text-[10px] text-slate-400">
        New here? <Link to={PATHS.signup} state={state} className="font-bold text-navy">Create account</Link>
      </p>
    </AuthCard>
  )
}
