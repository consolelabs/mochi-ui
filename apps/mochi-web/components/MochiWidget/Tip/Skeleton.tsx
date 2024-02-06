// skeleton component to be reused across all pickers in tip widget

import React from 'react'

interface SkeletonProps {
  height?: number
  avatarHeight?: number
  count?: number
}

export default function Skeleton(props: SkeletonProps) {
  return Array(props.count ?? 5)
    .fill(0)
    .map((_, i) => (
      <div
        key={`skeleton-${i}`}
        className="flex gap-x-2 p-2 min-w-full animate-pulse"
        style={{ height: props.height ?? 52 }}
      >
        <div
          style={{ height: props.avatarHeight ?? 24 }}
          className="flex-shrink-0 my-auto rounded-full bg-background-level3 aspect-square"
        />
        <div className="flex-1 w-full rounded-md bg-background-level3" />
      </div>
    ))
}
