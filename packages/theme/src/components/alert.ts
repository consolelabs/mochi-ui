import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex rounded-lg relative'], {
  variants: {
    variant: {
      default: 'flex-col gap-y-1 px-9 py-2',
      outlined: 'border shadow-lg flex-col gap-y-1 px-9 py-2',
      action: [
        'border shadow-lg gap-y-1',
        'flex-col p-4',
        'sm:flex-row sm:gap-x-1 sm:pl-9 sm:pr-2 sm:items-center sm:py-2',
      ],
    },
    scheme: {
      primary: ['bg-primary-outline'],
      secondary: ['bg-secondary-outline'],
      neutral: ['bg-neutral-outline'],
      success: ['bg-success-outline'],
      warning: ['bg-warning-outline'],
      danger: ['bg-danger-outline'],
    },
    size: {
      sm: '',
      md: '',
    },
  },
  compoundVariants: [
    {
      variant: ['outlined', 'action'],
      scheme: 'primary',
      className: 'border-primary-outline-border',
    },
    {
      variant: ['outlined', 'action'],
      scheme: 'secondary',
      className: 'border-secondary-outline-border',
    },
    {
      variant: ['outlined', 'action'],
      scheme: 'neutral',
      className: 'border-neutral-outline-border',
    },
    {
      variant: ['outlined', 'action'],
      scheme: 'danger',
      className: 'border-danger-outline-border',
    },
    {
      variant: ['outlined', 'action'],
      scheme: 'success',
      className: 'border-success-outline-border',
    },
    {
      variant: ['outlined', 'action'],
      scheme: 'warning',
      className: 'border-warning-outline-border',
    },
  ],
  defaultVariants: {
    variant: 'default',
    scheme: 'primary',
    size: 'md',
  },
})

const createTextCva = (base?: string, compoundVariants: any[] = []) =>
  cva(base, {
    variants: {
      variant: {
        default: '',
        outlined: '',
        action: '',
      },
      scheme: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
        neutral: '',
      },
      size: {
        sm: '',
        md: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        scheme: 'primary',
        className: 'text-primary-solid',
      },
      {
        variant: 'default',
        scheme: 'secondary',
        className: 'text-secondary-solid',
      },
      {
        variant: 'default',
        scheme: 'danger',
        className: 'text-danger-solid',
      },
      {
        variant: 'default',
        scheme: 'neutral',
        className: 'text-neutral-solid',
      },
      {
        variant: 'default',
        scheme: 'warning',
        className: 'text-warning-solid',
      },
      {
        variant: 'default',
        scheme: 'success',
        className: 'text-success-solid',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'primary',
        className: 'text-primary-outline-fg',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'secondary',
        className: 'text-secondary-outline-fg',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'danger',
        className: 'text-danger-outline-fg',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'neutral',
        className: 'text-neutral-outline-fg',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'warning',
        className: 'text-warning-outline-fg',
      },
      {
        variant: ['outlined', 'action'],
        scheme: 'success',
        className: 'text-success-outline-fg',
      },
      ...compoundVariants,
    ],
    defaultVariants: {
      scheme: 'primary',
      size: 'md',
      variant: 'default',
    },
  })

const alertIconCva = createTextCva('text-base absolute', [
  {
    variant: 'action',
    className: 'top-1/2 left-3 -translate-y-1/2 hidden sm:block',
  },
  {
    variant: ['default', 'outlined'],
    className: 'left-3 top-3 block',
  },
])

const alertIconCloseCva = createTextCva('text-base absolute cursor-pointer', [
  {
    variant: 'action',
    className: 'top-1/2 right-3 -translate-y-1/2 hidden',
  },
  {
    variant: ['default', 'outlined'],
    className: 'right-3 top-3',
  },
])

const alertTitleCva = createTextCva(
  'alert-content font-semibold tracking-tight h-fit',
  [
    {
      size: 'sm',
      className: 'text-xs',
    },
    {
      size: 'md',
      className: 'text-sm',
    },
    {
      variant: 'action',
      className: 'shrink-0 max-w-full line-clamp-1',
    },
  ],
)

const alertDescriptionCva = createTextCva(
  'alert-content tracking-tight line-clamp-1 h-fit',
  [
    {
      size: 'sm',
      className: 'text-xs',
    },
    {
      size: 'md',
      className: 'text-sm',
    },
    {
      variant: 'action',
      className: '',
    },
  ],
)

const alertConfirmClsx = ({ className = '' }: { className?: string }) =>
  clsx('w-full', className)

const alertCancelClsx = ({ className = '' }: { className?: string }) =>
  clsx('w-full bg-white sm:bg-inherit', className)

const alertActionGroup = ({ className = '' }: { className?: string }) =>
  clsx(
    'flex sm:flex-row flex-col-reverse gap-3 shrink-0 items-center sm:ml-1 sm:mt-0 mt-3',
    className,
  )

export const alert = {
  alertCva,
  alertIconCva,
  alertTitleCva,
  alertDescriptionCva,
  alertIconCloseCva,
  alertActionGroup,
  alertConfirmClsx,
  alertCancelClsx,
}

export type AlertStylesProps = VariantProps<typeof alertCva>
