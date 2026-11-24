import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Lock, Mail, Phone, User } from 'lucide-react'
import AuthCard from '../components/AuthCard'
import FormField from '../components/FormField'
import PasswordField from '../components/PasswordField'
import { useAuth } from '../hooks/useAuth'
import useAuthForm from '../hooks/useAuthForm'
import { isEmail, isMobile, isStrongEnough } from '@/utils/validators'
import logoMark from '@/assets/logos/logo-mark.svg'
import signupBg from '../assets/signup-bg.jpg'
import signupImage from '../assets/signup-image.jpg'
import { PATHS } from '@/config/paths'

function validate(form) {
  const found = {}
  if (form.name.trim().length < 2) found.name = 'Enter your full name'
  if (!isEmail(form.email)) found.email = 'Enter a valid email address'
  if (!isMobile(form.mobile)) found.mobile = 'Enter a valid 10-digit mobile number'
  if (!isStrongEnough(form.password)) found.password = 'Password must be at least 8 characters'
  if (!form.agreed) found.terms = 'Please accept the Terms of Service and Privacy Policy'
  return found
}

export default function SignupPage() {
  const { signup } = useAuth()
  const { state } = useLocation() // keeps "the page the user wanted" (set by ProtectedRoute)

  const { form, errors, serverError, loading, handleChange, handleSubmit } = useAuthForm({
    initialValues: { name: '', email: '', mobile: '', password: '', agreed: false },
    validate,
    onSubmit: signup, // creates the account and logs you in
  })

  return (
    <AuthCard variant="signup" image={signupImage} background={signupBg}>
      {/* TOP PART */}
      <div>
        <img src={logoMark} alt="Mobiyantra" className="mx-auto h-[44px] w-[70px]" />
        <div className="mt-1 text-center">
          <h1 className="text-[20px] font-bold leading-6">Create Account</h1>
          <p className="mt-[3px] text-[9px] text-slate-400">Enter your details below to get started</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-[21px]">
          <FormField id="name" name="name" label="Full Name" icon={User} placeholder="kumar suraj"
            autoComplete="name" value={form.name} onChange={handleChange} error={errors.name} />
          <FormField id="email" name="email" type="email" label="Email Address" icon={Mail} placeholder="Kumar suraj@gmail.com"
            autoComplete="email" value={form.email} onChange={handleChange} error={errors.email} />
          <FormField id="mobile" name="mobile" type="tel" inputMode="tel" label="Mobile Number" icon={Phone} placeholder="+91 93417504732"
            autoComplete="tel" value={form.mobile} onChange={handleChange} error={errors.mobile} />
          <PasswordField id="password" name="password" label="Password" icon={Lock} placeholder="Create a secure password"
            autoComplete="new-password" value={form.password} onChange={handleChange} error={errors.password} />

          <div className="-mt-1.5">
            <label className="flex cursor-pointer items-center gap-1.5 text-[8px] text-slate-400">
              <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} className="h-3 w-3 accent-[#013172]" />
              <span>
                I Agree to the <b className="text-slate-800">Terms Of Service</b> and <b className="text-slate-800">Privacy Policy</b>
              </span>
            </label>
            {errors.terms && <p role="alert" className="mt-1 text-[10px] text-red-500">{errors.terms}</p>}
          </div>

          {serverError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[10px] text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="-mt-1.5 flex h-[37px] w-full items-center justify-center gap-2 rounded-[9.33px] bg-[#0F172A] text-[12px] font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? 'Creating account…' : <>Create Account <ArrowRight size={14} /></>}
          </button>
        </form>
      </div>

      {/* BOTTOM PART */}
      <p className="pt-3 text-center text-[10px] text-slate-400">
        Already have an account? <Link to={PATHS.login} state={state} className="font-bold text-navy">Login</Link>
      </p>
    </AuthCard>
  )
}
