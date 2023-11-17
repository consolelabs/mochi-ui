import React from 'react'

export default function Skeleton() {
  return Array(10)
    .fill(0)
    .map((_, i) => (
      <div
        key={`skeleton-${i}`}
        className="items-center p-2 space-x-2 w-full h-12 rounded-lg animate-pulse min-w-[226px] bg-neutral-200"
      />
    ))
}
