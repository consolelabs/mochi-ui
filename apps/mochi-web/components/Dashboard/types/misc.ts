export type BoxProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T
} & JSX.IntrinsicElements[T]
