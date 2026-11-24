import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import AppRoutes from './router/AppRoutes'

// The app shell: router + login state. Every page URL lives in router/AppRoutes.jsx.
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
