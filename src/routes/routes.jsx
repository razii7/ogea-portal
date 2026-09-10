import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import ProtectedRoute from '../components/custom/routeguard/ProtectedRoute'

// Lazy load pages for code splitting
const Home = lazy(() => import('../Pages/Home'))
const Works = lazy(() => import('../Pages/Works'))
const Contact = lazy(() => import('../Pages/Contact'))
const Article = lazy(() => import('../Pages/Article'))
const Charts = lazy(() => import('../Pages/Charts'))
const Achievements = lazy(() => import('../Pages/Achievements'))
const Login = lazy(() => import('../Pages/Login'))
const StudentDashboard = lazy(() => import('../Pages/StudentDashboard'))
const AdminDashboard = lazy(() => import('../Pages/AdminDashboard'))
const Error = lazy(() => import('../components/custom/error/Error'))

import { PageLoader } from '@/components/shared'

// Wrap component with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

// Create browser router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: 'works',
        element: withSuspense(Works),
      },
      {
        path: 'works/:articleId',
        element: withSuspense(Article),
      },
      {
        path: 'achievements',
        element: withSuspense(Achievements),
      },
      {
        path: 'contact',
        element: withSuspense(Contact),
      },
      {
        path: 'analytics',
        element: withSuspense(Charts),
      },
      {
        path: 'login',
        element: withSuspense(Login),
      },
      {
        path: 'student',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'admin',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(Error),
  },
])

export default router
