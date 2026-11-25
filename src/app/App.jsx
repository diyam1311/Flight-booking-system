import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import AppRoutes from './router/AppRoutes'

// The app shell: router + login state. Every page URL lives in router/AppRoutes.jsx.
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<p role="status" className="p-6 text-center text-navy">Loading...</p>}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
