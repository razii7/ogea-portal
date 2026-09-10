import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PageLoader } from '@/components/shared'

const ProtectedRoute = ({ role, children }) => {
  const { user, initializing } = useAuth()
  const location = useLocation()

  if (initializing) return <PageLoader />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (role && user.role !== role) {
    const fallback = user.role === 'admin' ? '/admin' : '/student'
    return <Navigate to={fallback} replace />
  }

  return children
}

export default ProtectedRoute
