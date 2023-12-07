import { cva } from 'class-variance-authority'

const skeletonVariants = cva(
  [
    'relative overflow-hidden',
    'before:absolute before:inset-0 before:w-full before:h-full',
  ],
  {
    variants: {
      isLoaded: {
        true: 'before:bg-transparent',
        false: 'before:animate-pulse before:bg-background-level3',
      },
    },
    defaultVariants: {
      isLoaded: false,
    },
  },
)

const skeletonContentVariants = cva([''], {
  variants: {
    isLoaded: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    isLoaded: false,
  },
})

const skeleton = {
  skeletonVariants,
  skeletonContentVariants,
}

export { skeleton }
