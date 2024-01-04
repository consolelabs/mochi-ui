import clsx from 'clsx'

const accordionRootClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('p-2 space-y-1 rounded-lg shadow-md text-text-primary', className)

const accordionTriggerIconClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'text-text-secondary shrink-0 transition-transform duration-200 text-base',
    className,
  )

const accordionTriggerLeftIconClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-xl', className)

const accordionTriggerWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) =>
  clsx(
    'flex-1 flex font-medium text-sm items-center justify-between [&[data-state=open]>#chevron]:rotate-180 gap-3 p-2',
    className,
  )

const accordionHeaderClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex', className)

const accordionTriggerClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('flex flex-1', className)

const accordionContentWrapperClsx = ({
  className = '',
}: {
  className?: string
}) =>
  clsx(
    'text-sm',
    'data-[state=open]:animate-accordion-open',
    'data-[state=closed]:animate-accordion-close',
    'overflow-hidden',
    className,
  )

const accordionContentClsx = ({
  className = '',
  hasPadding = false,
}: {
  className?: string
  hasPadding?: boolean
}) =>
  clsx(
    'py-2 h-fit',
    {
      'px-10': hasPadding,
      'px-2 ': !hasPadding,
    },
    className,
  )

export const accordion = {
  accordionRootClsx,
  accordionTriggerIconClsx,
  accordionTriggerLeftIconClsx,
  accordionHeaderClsx,
  accordionTriggerWrapperClsx,
  accordionTriggerClsx,
  accordionContentWrapperClsx,
  accordionContentClsx,
}
