import { cva, VariantProps } from 'class-variance-authority'

const alertCva = cva(['flex flex-col gap-y-1 px-9 rounded-lg py-2 relative'], {
  variants: {
    variant: {
      default: '',
      outlined: 'border',
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
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  compoundVariants: [
    {
      variant: 'outlined',
      scheme: 'primary',
      className: 'border-primary-outline-border',
    },
    {
      variant: 'outlined',
      scheme: 'secondary',
      className: 'border-secondary-outline-border',
    },
    {
      variant: 'outlined',
      scheme: 'neutral',
      className: 'border-neutral-outline-border',
    },
    {
      variant: 'outlined',
      scheme: 'danger',
      className: 'border-danger-outline-border',
    },
    {
      variant: 'outlined',
      scheme: 'success',
      className: 'border-success-outline-border',
    },
    {
      variant: 'outlined',
      scheme: 'warning',
      className: 'border-warning-outline-border',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    scheme: 'primary',
  },
})

const createTextCva = (
  base?: string,
  size: { sm: string; md: string } = { sm: '', md: '' },
) =>
  cva(base, {
    variants: {
      variant: {
        default: '',
        outlined: '',
      },
      scheme: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
        neutral: '',
      },
      size,
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
        variant: 'outlined',
        scheme: 'primary',
        className: 'text-primary-outline-fg',
      },
      {
        variant: 'outlined',
        scheme: 'secondary',
        className: 'text-secondary-outline-fg',
      },
      {
        variant: 'outlined',
        scheme: 'danger',
        className: 'text-danger-outline-fg',
      },
      {
        variant: 'outlined',
        scheme: 'neutral',
        className: 'text-neutral-outline-fg',
      },
      {
        variant: 'outlined',
        scheme: 'warning',
        className: 'text-warning-outline-fg',
      },
      {
        variant: 'outlined',
        scheme: 'success',
        className: 'text-success-outline-fg',
      },
    ],
    defaultVariants: {
      scheme: 'primary',
    },
  })

const alertIconCva = createTextCva('text-base absolute left-3 top-3')

const alertIconCloseCva = createTextCva('text-base absolute right-3 top-3')

const alertTitleCva = createTextCva('font-semibold tracking-tight', {
  sm: 'text-xs',
  md: 'text-sm',
})

const alertDescriptionCva = createTextCva('tracking-tight line-clamp-1', {
  sm: 'text-xs',
  md: 'text-sm',
})

export const alert = {
  alertCva,
  alertIconCva,
  alertTitleCva,
  alertDescriptionCva,
  alertIconCloseCva,
}

export type AlertStylesProps = VariantProps<typeof alertCva>
