import * as React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ isLoggedin, children}) {
  return (
    isLoggedin ? children : <Navigate to="/" replace />
  )
}
