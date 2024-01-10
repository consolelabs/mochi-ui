import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const alertBodyCva = cva('flex gap-1 h-fit flex-1', {
  variants: {
    layout: {
      auto: 'sm:flex-row sm:items-center flex-col items-start',
      inline: 'flex-row items-center',
      stack: 'flex-col items-start',
    },
  },
  defaultVariants: {
    layout: 'auto',
  },
})

const alertCva = cva(['flex rounded-lg relative gap-1'], {
  variants: {
    layout: {
      auto: ['sm:items-center sm:flex-row', 'items-start flex-col'],
      inline: ['items-center', 'flex-row', ''],
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
      large: ['p-4'],
    },
    scheme: {
      primary: ['bg-background-body'],
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
      layout: 'auto',
      className: [
        'sm:[&:has(.alert-icon)]:pl-9',
        'sm:[&>.alert-icon]:top-1/2',
        'sm:[&>.alert-icon]:-translate-y-1/2',
        'sm:[&>.alert-icon]:left-3',

        'sm:[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-9',
        'sm:[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        'sm:[&>.alert-icon-close]:top-1/2',
        'sm:[&>.alert-icon-close]:-translate-y-1/2',
        'sm:[&>.alert-icon-close]:right-3',
        'sm:[&:has(.alert-action-group)>.alert-icon]:block',

        '[&:not(:has(.alert-action-group)):has(.alert-icon)]:pl-10',
        '[&:has(.alert-action-group)>.alert-icon]:hidden',
        '[&>.alert-icon]:top-4',
        '[&>.alert-icon]:left-4',

        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-10',
        '[&>.alert-icon-close]:top-4',
        '[&>.alert-icon-close]:right-4',

        'sm:p-2',
        'p-4',
      ],
    },
    {
      layout: 'inline',
      paddingSize: 'default',
      className: [
        '[&:has(.alert-icon)]:pl-9',
        '[&>.alert-icon]:top-1/2',
        '[&>.alert-icon]:-translate-y-1/2',
        '[&>.alert-icon]:left-3',

        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-9',
        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&>.alert-icon-close]:top-1/2',
        '[&>.alert-icon-close]:-translate-y-1/2',
        '[&>.alert-icon-close]:right-3',
        'px-2',
      ],
    },
    {
      layout: 'inline',
      paddingSize: 'large',
      className: [
        '[&:has(.alert-icon)]:pl-10',
        '[&>.alert-icon]:top-1/2',
        '[&>.alert-icon]:-translate-y-1/2',
        '[&>.alert-icon]:left-4',

        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-10',
        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&>.alert-icon-close]:top-1/2',
        '[&>.alert-icon-close]:-translate-y-1/2',
        '[&>.alert-icon-close]:right-4',
        'px-4',
      ],
    },
    {
      layout: 'stack',
      paddingSize: 'large',
      className: [
        '[&:not(:has(.alert-action-group)):has(.alert-icon)]:pl-10',
        '[&:has(.alert-action-group)>.alert-icon]:hidden',
        '[&>.alert-icon]:top-4',
        '[&>.alert-icon]:left-4',

        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-10',
        '[&>.alert-icon-close]:top-4',
        '[&>.alert-icon-close]:right-4',
        'px-4',
      ],
    },
    {
      layout: 'stack',
      paddingSize: 'default',
      className: [
        '[&:not(:has(.alert-action-group)):has(.alert-icon)]:pl-9',
        '[&:has(.alert-action-group)>.alert-icon]:hidden',
        '[&>.alert-icon]:top-3',
        '[&>.alert-icon]:left-3',

        '[&:has(.alert-action-group)>.alert-icon-close]:hidden',
        '[&:not(:has(.alert-action-group)):has(.alert-icon-close)]:pr-9',
        '[&>.alert-icon-close]:top-3',
        '[&>.alert-icon-close]:right-3',
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
    layout: 'auto',
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
        auto: '',
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
    {
      layout: 'auto',
      className: 'sm:line-clamp-1',
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
  {
    layout: 'auto',
    className: 'sm:line-clamp-1',
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
  layout?: 'inline' | 'stack' | 'auto'
}) =>
  clsx(
    {
      'w-fit !rounded h-[34px]': layout === 'inline',
      'w-full h-10': layout === 'stack',
      'w-full h-10 sm:w-fit sm:h-[34px] sm:rounded': layout === 'auto',
    },
    className,
  )

const alertCancelClsx = ({
  className = '',
  layout = 'inline',
}: {
  className?: string
  layout?: 'inline' | 'stack' | 'auto'
}) =>
  clsx(
    {
      'wit-fit bg-inherit h-[34px]': layout === 'inline',
      'w-full bg-white h-10': layout === 'stack',
      'w-full bg-white sm:h-[34px] h-10 sm:w-fit sm:bg-inherit sm:border-none sm:focus:shadow-none sm:hover:bg-inherit':
        layout === 'auto',
    },
    className,
  )

const alertActionGroupCva = cva(
  ['alert-action-group flex gap-3 shrink-0 items-center flex-row'],
  {
    variants: {
      layout: {
        auto: ['w-full mt-2', 'sm:w-fit sm:mt-0'],
        inline: 'w-fit mt-0',
        stack: 'w-full mt-2',
      },
    },
    defaultVariants: {
      layout: 'auto',
    },
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
export type alertActionGroupStyleProps = VariantProps<
  typeof alertActionGroupCva
>
