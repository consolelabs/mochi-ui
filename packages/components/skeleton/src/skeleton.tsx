import { PropsWithChildren, forwardRef } from 'react'
import { skeleton } from '@mochi-ui/theme'

const { skeletonVariants, skeletonContentVariants } = skeleton

interface SkeletonProps extends PropsWithChildren {
  isLoaded?: boolean
  className?: string
  contentClassName?: string
  as?: React.ElementType
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ children, ...props }, ref) => {
    const { isLoaded = false, className, contentClassName, as } = props
    const Component = as || 'div'

    return (
      <Component
        ref={ref}
        className={skeletonVariants({ className, isLoaded })}
      >
        <div
          className={skeletonContentVariants({
            className: contentClassName,
            isLoaded,
          })}
        >
          {children}
        </div>
      </Component>
    )
  },
)

Skeleton.displayName = 'Skeleton'

export { Skeleton, type SkeletonProps }
