import { Skeleton } from '@mochi-ui/core'

export const AppDetailSkeleton = () => {
  return (
    <>
      <Skeleton className="rounded-lg h-52" />
      <div className="grid flex-1 grid-cols-2 gap-2 mt-8 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 space-y-4 border rounded-xl border-divider shadow-input"
          >
            <Skeleton className="w-1/2 h-5 rounded-lg" />
            <Skeleton className="w-2/5 h-8 rounded-lg" />
            <Skeleton className="w-3/4 h-5 rounded-lg" />
          </div>
        ))}
      </div>
    </>
  )
}
