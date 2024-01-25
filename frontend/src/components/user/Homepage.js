import React from 'react'
import isAuthenticated from '../../utils/AuthAPI'

export default function Homepage() {
  const isAuthenticatedUser = isAuthenticated()
  if(!isAuthenticatedUser) return <div>Access denied</div>
    return (
      <div>homepage</div>
    )
}
