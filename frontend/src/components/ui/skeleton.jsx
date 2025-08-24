import React from 'react'

export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200/70 ${className}`}></div>
  )
}

export default Skeleton

