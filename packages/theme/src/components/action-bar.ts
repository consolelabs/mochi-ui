import { cva } from 'class-variance-authority'

const contentCva = cva(['z-50'])

const anchorCva = cva([
  '!absolute',
  'inset-x-4',
  'bottom-4',
  'h-0',
  '[&>[data-radix-popper-content-wrapper]]:!min-w-0',
  '[&>[data-radix-popper-content-wrapper]]:!relative',
])

const actionBar = {
  contentCva,
  anchorCva,
}

export { actionBar }
