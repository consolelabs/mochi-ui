import { cva, VariantProps } from 'class-variance-authority'

const group = 'space-y-1'

const iconChevron = cva([], {
  variants: {
    appearance: {
      form: ['text-base'],
      button: ['text-sm'],
    },
  },
  defaultVariants: {
    appearance: 'button',
  },
})

const content = [
  'relative z-50 w-fit',

  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in-0',
  'data-[state=open]:zoom-in-0',
  'data-[state=open]:duration-300',

  'data-[state=open]:data-[side=bottom]:slide-in-from-top-1/2',
  'data-[state=open]:data-[side=left]:slide-in-from-right-1/2',
  'data-[state=open]:data-[side=right]:slide-in-from-left-1/2',
  'data-[state=open]:data-[side=top]:slide-in-from-bottom-1/2',

  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=closed]:zoom-out-0',
  'data-[state=closed]:duration-300',

  'data-[state=closed]:data-[side=bottom]:slide-out-to-top-1/2',
  'data-[state=closed]:data-[side=left]:slide-out-to-right-1/2',
  'data-[state=closed]:data-[side=right]:slide-out-to-left-1/2',
  'data-[state=closed]:data-[side=top]:slide-out-to-bottom-1/2',
].join(' ')

const viewportPoperMode =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] '

const viewport =
  'space-y-1 bg-background-popup p-3 rounded-lg shadow-md border border-divider'

const label =
  'text-[10px] uppercase font-bold text-text-secondary tracking-tight leading-4'

const bodyWrapper = 'flex-1 flex flex-col items-start'

const subTitleWrapper = 'text-text-secondary text-xs'

const separator = 'block !my-3 w-full h-px bg-divider'

const value = 'truncate'

const triggerCva = cva(
  [
    'flex gap-2 items-center',
    'transition duration-100',
    'text-sm',
    'focus-visible:outline-none',
    'truncate',
    'focus-visible:shadow-small',
    'hover:outline-none focus:outline-none',
    'data-[disable=true]:pointer-events-none',
    'data-[error=true]:border-danger-outline-border',
  ],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        danger: '',
        neutral: '',
      },
      variant: {
        solid: '',
        plain: '',
        soft: '',
        outline: 'border',
      },
      isFilled: {
        true: [],
        false: [],
      },
      appearance: {
        form: ['justify-between'],
        button: ['font-semibold'],
      },
    },
    compoundVariants: [
      {
        appearance: 'form',
        size: ['lg', 'md', 'sm'],
        className: 'px-3.5',
      },
      {
        appearance: 'button',
        size: 'sm',
        className: 'text-sm leading-4 px-4 h-[34px] rounded',
      },
      {
        appearance: 'button',
        size: 'md',
        className: 'text-sm leading-4 px-4 h-10 rounded-lg',
      },
      {
        appearance: 'button',
        size: 'lg',
        className: 'text-base leading-6 px-6 h-12 rounded-lg',
      },
      {
        appearance: 'form',
        size: 'sm',
        className: 'text-sm leading-4 px-3.5 h-[34px] rounded',
      },
      {
        appearance: 'form',
        size: 'md',
        className: 'text-sm px-3.5 h-10 rounded',
      },
      {
        appearance: 'form',
        size: 'lg',
        className: 'text-md px-3.5 h-[52px] rounded',
      },
      {
        appearance: 'button',
        className: '',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: [
          'bg-primary-solid text-primary-solid-fg',
          'hover:bg-primary-solid-hover',
          'active:bg-primary-solid-active',
          'data-[disable=true]:bg-primary-solid-disable data-[disable=true]:text-primary-solid-disable-fg',
        ],
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: [
          'bg-secondary-solid text-secondary-solid-fg',
          'hover:bg-secondary-solid-hover',
          'active:bg-secondary-solid-active',
          'data-[disable=true]:bg-secondary-solid-disable data-[disable=true]:text-secondary-solid-disable-fg',
        ],
      },
      {
        variant: 'solid',
        color: 'success',
        className: [
          'bg-success-solid text-success-solid-fg',
          'hover:bg-success-solid-hover',
          'active:bg-success-solid-active',
          'data-[disable=true]:bg-success-solid-disable data-[disable=true]:text-success-solid-disable-fg',
        ],
      },
      {
        variant: 'solid',
        color: 'danger',
        className: [
          'bg-danger-solid text-danger-solid-fg',
          'hover:bg-danger-solid-hover',
          'active:bg-danger-solid-active',
          'data-[disable=true]:bg-danger-solid-disable data-[disable=true]:text-danger-solid-disable-fg',
        ],
      },
      {
        variant: 'solid',
        color: 'warning',
        className: [
          'bg-warning-solid text-warning-solid-fg',
          'hover:bg-warning-solid-hover',
          'active:bg-warning-solid-active',
          'data-[disable=true]:bg-warning-solid-disable data-[disable=true]:text-warning-solid-disable-fg',
        ],
      },
      {
        variant: 'solid',
        color: 'neutral',
        className: [
          'bg-neutral-solid text-neutral-solid-fg',
          'hover:bg-neutral-solid-hover',
          'active:bg-neutral-solid-active',
          'data-[disable=true]:bg-neutral-solid-disable data-[disable=true]:text-neutral-solid-disable-fg',
        ],
      },
      {
        variant: 'outline',
        color: 'primary',
        className: [
          'text-primary-outline-fg',
          'border-primary-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-primary-outline-hover',
          'active:bg-primary-outline-active',
          'data-[disable=true]:text-primary-outline-disable-fg data-[disable=true]:border-primary-outline-disable-border',
        ],
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: [
          'text-secondary-outline-fg',
          'border-secondary-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-secondary-outline-hover',
          'active:bg-secondary-outline-active',
          'data-[disable=true]:text-secondary-outline-disable-fg data-[disable=true]:border-secondary-outline-disable-border',
        ],
      },
      {
        variant: 'outline',
        color: 'success',
        className: [
          'text-success-outline-fg',
          'border-success-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-success-outline-hover',
          'active:bg-success-outline-active',
          'data-[disable=true]:text-success-outline-disable-fg data-[disable=true]:border-success-outline-disable-border',
        ],
      },
      {
        variant: 'outline',
        color: 'danger',
        className: [
          'text-danger-outline-fg',
          'border-danger-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-danger-outline-hover',
          'active:bg-danger-outline-active',
          'data-[disable=true]:text-danger-outline-disable-fg data-[disable=true]:border-danger-outline-disable-border',
        ],
      },
      {
        variant: 'outline',
        color: 'warning',
        className: [
          'text-warning-outline-fg',
          'border-warning-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-warning-outline-hover',
          'active:bg-warning-outline-active',
          'data-[disable=true]:text-warning-outline-disable-fg data-[disable=true]:border-warning-outline-disable-border',
        ],
      },
      {
        variant: 'outline',
        color: 'neutral',
        className: [
          'text-neutral-outline-fg',
          'border-neutral-outline-border data-[error=true]:border-danger-outline-border',
          'hover:bg-neutral-outline-hover',
          'active:bg-neutral-outline-active',
          'data-[disable=true]:text-neutral-outline-disable-fg data-[disable=true]:border-neutral-outline-disable-border',
        ],
      },
      {
        variant: 'plain',
        color: 'primary',
        className: [
          'text-primary-plain-fg',
          'hover:bg-primary-plain-hover',
          'active:bg-primary-plain-active',
          'data-[disable=true]:text-primary-plain-disable-fg',
        ],
      },
      {
        variant: 'plain',
        color: 'secondary',
        className: [
          'text-secondary-plain-fg',
          'hover:bg-secondary-plain-hover',
          'active:bg-secondary-plain-active',
          'data-[disable=true]:text-secondary-plain-disable-fg',
        ],
      },
      {
        variant: 'plain',
        color: 'success',
        className: [
          'text-success-plain-fg',
          'hover:bg-success-plain-hover',
          'active:bg-success-plain-active',
          'data-[disable=true]:text-success-plain-disable-fg',
        ],
      },
      {
        variant: 'plain',
        color: 'warning',
        className: [
          'text-warning-plain-fg',
          'hover:bg-warning-plain-hover',
          'active:bg-warning-plain-active',
          'data-[disable=true]:text-warning-plain-disable-fg',
        ],
      },
      {
        variant: 'plain',
        color: 'danger',
        className: [
          'text-danger-plain-fg',
          'hover:bg-danger-plain-hover',
          'active:bg-danger-plain-active',
          'data-[disable=true]:text-danger-plain-disable-fg',
        ],
      },
      {
        variant: 'plain',
        color: 'neutral',
        className: [
          'text-neutral-plain-fg',
          'hover:bg-neutral-plain-hover',
          'active:bg-neutral-plain-active',
          'data-[disable=true]:text-neutral-plain-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'primary',
        className: [
          'bg-primary-soft',
          'text-primary-soft-fg',
          'hover:bg-primary-soft-hover',
          'active:bg-primary-soft-active active:text-primary-soft-active-fg',
          'data-[disable=true]:bg-primary-soft-disable data-[disable=true]:text-primary-soft-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'secondary',
        className: [
          'bg-secondary-soft',
          'text-secondary-soft-fg',
          'hover:bg-secondary-soft-hover',
          'active:bg-secondary-soft-active active:text-secondary-soft-active-fg',
          'data-[disable=true]:bg-secondary-soft-disable data-[disable=true]:text-secondary-soft-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'danger',
        className: [
          'bg-danger-soft',
          'text-danger-soft-fg',
          'hover:bg-danger-soft-hover',
          'active:bg-danger-soft-active active:text-danger-soft-active-fg',
          'data-[disable=true]:bg-danger-soft-disable data-[disable=true]:text-danger-soft-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'success',
        className: [
          'bg-success-soft',
          'text-success-soft-fg',
          'hover:bg-success-soft-hover',
          'active:bg-success-soft-active active:text-success-soft-active-fg',
          'data-[disable=true]:bg-success-soft-disable data-[disable=true]:text-success-soft-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'warning',
        className: [
          'bg-warning-soft',
          'text-warning-soft-fg',
          'hover:bg-warning-soft-hover',
          'active:bg-warning-soft-active active:text-warning-soft-active-fg',
          'data-[disable=true]:bg-warning-soft-disable data-[disable=true]:text-warning-soft-disable-fg',
        ],
      },
      {
        variant: 'soft',
        color: 'neutral',
        className: [
          'bg-neutral-soft',
          'text-neutral-soft-fg',
          'hover:bg-neutral-soft-hover',
          'active:bg-neutral-soft-active active:text-neutral-soft-active-fg',
          'data-[disable=true]:bg-neutral-soft-disable data-[disable=true]:text-neutral-soft-disable-fg',
        ],
      },
    ],
    defaultVariants: {
      color: 'neutral',
      variant: 'outline',
      size: 'md',
      appearance: 'button',
    },
  },
)

const iconWrapperCva = cva('', {
  variants: {
    isRightIcon: {
      true: 'text-base max-w-4 max-h-4',
      false: 'text-2xl max-w-6 max-h-6',
    },
  },
  defaultVariants: {
    isRightIcon: false,
  },
})

const itemCva = cva(
  [
    'flex gap-2 items-center',
    'transition duration-100',
    'text-sm',
    'truncate',
    'font-medium',
    'hover:bg-background-hover focus:bg-background-hover',
    'hover:outline-none focus:outline-none',
    'cursor-pointer',
    'p-2',
    'rounded-lg',
    'focus:shadow-none',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      disabled: {
        true: ['text-text-secondary', 'cursor-not-allowed'],
        false: ['text-text-primary'],
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export const select = {
  group,
  content,
  label,
  separator,
  value,
  subTitleWrapper,
  viewport,
  viewportPoperMode,
  iconChevron,
  itemCva,
  triggerCva,
  iconWrapperCva,
  bodyWrapper,
}

export type selectItemProps = VariantProps<typeof itemCva>
export type SelectTriggerStyleProps = VariantProps<typeof triggerCva>
