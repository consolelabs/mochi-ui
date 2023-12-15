import { clsx } from 'clsx'

const sectionHeaderWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex flex-col sm:items-center gap-4 sm:gap-8 sm:flex-row py-4 sm:py-2',
    className,
  )

const sectionHeaderLeftClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex gap-2 items-start flex-col sm:flex-row', className)

const sectionHeaderTitleWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex w-full items-center gap-2', className)

const sectionHeaderTitleClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('!text-base font-medium text-text-primary pb-2', className)

const sectionHeaderActionsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex-1 flex justify-start sm:justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    className,
  )

const sectionHeader = {
  sectionHeaderWrapperClsx,
  sectionHeaderLeftClsx,
  sectionHeaderTitleWrapperClsx,
  sectionHeaderTitleClsx,
  sectionHeaderActionsWrapperClsx,
}

export { sectionHeader }
