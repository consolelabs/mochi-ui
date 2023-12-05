import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertBodyCva = cva('flex gap-1 h-fit flex-1', {
  variants: {
    layout: {
      inline: 'flex-row items-center',
      stack: 'flex-col items-start',
    },
  },
  defaultVariants: {
    layout: 'stack',
  },
})

const alertCva = cva(['flex rounded-lg relative gap-1 pointer-events-auto'], {
  variants: {
    layout: {
      inline: 'items-center flex-row',
      stack: ['items-start flex-col'],
    },
    shadow: {
      true: 'shadow-lg',
    },
    outline: {
      true: 'border',
    },
    paddingSize: {
      default: ['p-2'],
      large: ['p-3'],
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
      layout: 'inline',
      paddingSize: 'default',
      className: [
        '[&:has(.alert-icon)]:pl-9',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-9',
        '[&:has(.alert-icon)>.alert-icon]:top-1/2',
        '[&:has(.alert-icon)>.alert-icon]:-translate-y-1/2',
        '[&:has(.alert-icon)>.alert-icon]:left-3',

        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:has(.alert-icon)>.alert-icon-close]:top-1/2',
        '[&:has(.alert-icon)>.alert-icon-close]:-translate-y-1/2',
        '[&:has(.alert-icon)>.alert-icon-close]:right-3',
        'px-3',
      ],
    },
    {
      layout: 'inline',
      paddingSize: 'large',
      className: [
        '[&:has(.alert-icon)]:pl-10',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-10',
        '[&:has(.alert-icon)>.alert-icon]:top-1/2',
        '[&:has(.alert-icon)>.alert-icon]:-translate-y-1/2',
        '[&:has(.alert-icon)>.alert-icon]:left-4',

        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:has(.alert-icon)>.alert-icon-close]:top-1/2',
        '[&:has(.alert-icon)>.alert-icon-close]:-translate-y-1/2',
        '[&:has(.alert-icon)>.alert-icon-close]:right-4',
        'px-4',
      ],
    },
    {
      layout: 'stack',
      paddingSize: 'large',
      className: [
        '[&:not(:has(.alert-action-group)):has(.alert-icon)]:pl-10',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-10',
        '[&:has(.alert-action-group)>.alert-icon]:hidden',
        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:has(.alert-icon)>.alert-icon]:top-4',
        '[&:has(.alert-icon)>.alert-icon]:left-4',
        '[&:has(.alert-icon)>.alert-icon-close]:top-4',
        '[&:has(.alert-icon)>.alert-icon-close]:right-4',
        'px-4',
      ],
    },
    {
      layout: 'stack',
      paddingSize: 'default',
      className: [
        '[&:not(:has(.alert-action-group)):has(.alert-icon)]:pl-9',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-9',
        '[&:has(.alert-action-group)>.alert-icon]:hidden',
        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',

        '[&:has(.alert-icon)>.alert-icon]:top-3',
        '[&:has(.alert-icon)>.alert-icon]:left-3',
        '[&:has(.alert-icon)>.alert-icon-close]:top-3',
        '[&:has(.alert-icon)>.alert-icon-close]:right-3',
        'px-2',
      ],
    },
    {
      outline: true,
      scheme: 'primary',
      className: 'border-primary-outline-border',
    },
    {
      outline: true,
      scheme: 'secondary',
      className: 'border-secondary-outline-border',
    },
    {
      outline: true,
      scheme: 'neutral',
      className: 'border-neutral-outline-border',
    },
    {
      outline: true,
      scheme: 'danger',
      className: 'border-danger-outline-border',
    },
    {
      outline: true,
      scheme: 'success',
      className: 'border-success-outline-border',
    },
    {
      outline: true,
      scheme: 'warning',
      className: 'border-warning-outline-border',
    },
  ],
  defaultVariants: {
    scheme: 'primary',
    size: 'md',
    layout: 'inline',
    paddingSize: 'default',
  },
})

const createTextCva = (base?: string, compoundVariants: any[] = []) =>
  cva(base, {
    variants: {
      scheme: {
        primary: 'text-primary-solid',
        secondary: 'text-secondary-solid',
        success: 'text-success-solid',
        danger: 'text-danger-solid',
        warning: 'text-warning-solid',
        neutral: 'text-neutral-solid',
      },
      size: {
        sm: '',
        md: '',
      },
      layout: {
        inline: '',
        stack: '',
      },
    },
    compoundVariants,
    defaultVariants: {
      scheme: 'primary',
      size: 'md',
      layout: 'inline',
    },
  })

const alertIconCva = createTextCva('alert-icon text-base shrink-0 absolute')

const alertIconCloseCva = createTextCva(
  'alert-icon-close text-base cursor-pointer shrink-0 absolute',
)

const alertTitleCva = createTextCva(
  'font-semibold tracking-tight h-fit min-w-0 w-fit',
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
      layout: 'inline',
      className: 'line-clamp-1',
    },
  ],
)

const alertDescriptionCva = createTextCva('tracking-tight h-fit flex-1 ', [
  {
    size: 'sm',
    className: 'text-xs',
  },
  {
    size: 'md',
    className: 'text-sm',
  },
  {
    layout: 'inline',
    className: 'line-clamp-1',
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

const alertConfirmClsx = ({
  className = '',
  layout = 'inline',
}: {
  className?: string
  layout?: 'inline' | 'stack'
}) =>
  clsx(
    {
      'w-fit': layout === 'inline',
      'w-full': layout === 'stack',
    },
    className,
  )

const alertCancelClsx = ({
  className = '',
  layout = 'inline',
}: {
  className?: string
  layout?: 'inline' | 'stack'
}) =>
  clsx(
    {
      'wit-fit bg-inherit': layout === 'inline',
      'w-full bg-white': layout === 'stack',
    },
    className,
  )

const alertActionGroupCva = cva(
  ['alert-action-group flex gap-3 shrink-0 items-center'],
  {
    variants: {
      layout: {
        inline: 'w-fit flex-row-reverse mt-0',
        stack: 'w-full flex-col mt-2',
      },
    },
    defaultVariants: {},
  },
)

export const alert = {
  alertCva,
  alertIconCva,
  alertTitleCva,
  alertDescriptionCva,
  alertIconCloseCva,
  alertActionGroupCva,
  alertConfirmClsx,
  alertCancelClsx,
  alertLinkCva,
  alertBodyCva,
}

export type AlertStylesProps = VariantProps<typeof alertCva>
export type AlertBodyStyleProps = VariantProps<typeof alertBodyCva>
