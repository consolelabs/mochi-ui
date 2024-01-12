import { cva } from 'class-variance-authority'

const contentCva = cva([
  'transition-all',
  'data-[state=open]:animate-in',
  'data-[state=open]:slide-in-from-bottom-1/2',
  'data-[state=open]:fade-in-0',
  'data-[state=open]:zoom-in-100',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:slide-out-to-bottom-1/2',
  'data-[state=closed]:zoom-out-100',
  'data-[state=closed]:fade-out-0',
])

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
