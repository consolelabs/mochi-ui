import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertCva = cva(['flex rounded-lg relative'], {
  variants: {
    responsive: {
      auto: '',
      shrink: '',
      expand: '',
    },
    variant: {
      default: 'flex-col gap-y-1 px-9 py-2',
      outlined: 'border shadow-lg flex-col gap-y-1 px-9 py-2',
      action: ['border shadow-lg'],
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
      variant: ['action'],
      responsive: 'auto',
      className: [
        'flex-col p-4 gap-y-1',
        'sm:flex-row sm:gap-x-1 sm:pl-9 sm:pr-2 sm:items-center sm:py-2',
      ],
    },
    {
      variant: ['action'],
      responsive: 'expand',
      className: ['flex-row gap-x-1 pl-9 pr-2 items-center py-2'],
    },
    {
      variant: ['action'],
      responsive: 'shrink',
      className: ['flex-col p-4 gap-y-1'],
    },
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
      responsive: {
        auto: '',
        shrink: '',
        expand: '',
      },
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
    responsive: 'auto',
    className: 'hidden sm:block',
  },
  {
    variant: 'action',
    responsive: 'shrink',
    className: 'hidden',
  },
  {
    variant: 'action',
    responsive: 'expand',
    className: 'block',
  },
  {
    variant: 'action',
    className: 'top-1/2 left-3 -translate-y-1/2',
  },
  {
    variant: ['default', 'outlined'],
    className: 'left-3 top-3 block',
  },
])

const alertIconCloseCva = createTextCva('text-base absolute cursor-pointer', [
  {
    variant: 'action',
    className: 'hidden',
  },
  {
    variant: ['default', 'outlined'],
    className: 'right-3 top-3',
  },
])

const alertTitleCva = createTextCva(' font-semibold tracking-tight h-fit', [
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
])

const alertDescriptionCva = createTextCva('tracking-tight h-fit', [
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
])

const alertLinkCva = createTextCva('cursor-pointer w-fit shrink-0', [
  {
    size: 'sm',
    className: 'text-[10px] font-bold',
  },
  {
    size: 'md',
    className: 'text-sm font-semibold',
  },
])

const alertConfirmClsx = ({ className = '' }: { className?: string }) =>
  clsx('w-full', className)

const alertCancelClsx = ({
  className = '',
  responsive = 'auto',
}: {
  className?: string
  responsive?: AlertStylesProps['responsive']
}) =>
  clsx(
    'w-full',
    {
      'bg-white sm:bg-inherit': responsive === 'auto',
      'bg-white': responsive === 'shrink',
      'bg-inherit': responsive === 'expand',
    },
    className,
  )

const alertActionGroup = ({
  className = '',
  responsive = 'auto',
}: {
  className?: string
  responsive?: AlertStylesProps['responsive']
}) =>
  clsx(
    'flex gap-3 shrink-0 items-center',
    {
      'sm:flex-row flex-col-reverse sm:ml-1 sm:mt-0 mt-3':
        responsive === 'auto',
      'flex-row ml-1 mt-0': responsive === 'expand',
      'flex-col-reverse mt-3': responsive === 'shrink',
    },
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
  alertLinkCva,
}

export type AlertStylesProps = VariantProps<typeof alertCva>
