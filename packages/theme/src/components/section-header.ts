import { clsx } from 'clsx'

const sectionHeaderWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 sm:gap-x-8 py-4 sm:py-2',
    className,
  )

const sectionHeaderTitleWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'col-span-1 row-span-1 col-start-1 col-end-2 row-start-1 row-end-2',
    className,
  )

const sectionHeaderDescriptionWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'col-span-1 row-span-1 col-start-1 col-end-2 row-start-2 row-end-3',
    className,
  )

const sectionHeaderTitleClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('!text-base font-medium text-text-primary', className)

const sectionHeaderActionsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'col-span-1',
    'sm:row-span-2 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-3',
    'row-span-1 col-start-1 col-end-2 row-start-3 row-end-4',
    className,
  )

const sectionHeaderActionsClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex justify-start pt-2 sm:pt-0 sm:justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    className,
  )

const sectionHeader = {
  sectionHeaderWrapperClsx,
  sectionHeaderTitleWrapperClsx,
  sectionHeaderDescriptionWrapperClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsWrapperClsx,
  sectionHeaderActionsClsx,
}

export { sectionHeader }
