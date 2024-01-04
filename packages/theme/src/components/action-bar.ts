import { cva } from 'class-variance-authority'

const contentCva = cva([
  'z-50',
  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in-50',
  'data-[state=open]:zoom-in-95',

  'data-[state=open]:slide-in-from-top-2',
  'data-[state=closed]:slide-out-to-bottom-2',

  'duration-75',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=closed]:zoom-out-95',
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
