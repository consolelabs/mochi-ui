import { clsx } from 'clsx'

const sectionHeaderWrapperClsx = ({
  className = '',
  wrapActionsOnMobile = true,
}: { className?: string; wrapActionsOnMobile?: boolean } = {}) =>
  clsx(
    'grid sm:grid-cols-2 gap-x-2 sm:gap-x-4 py-4 sm:py-2',
    {
      'grid-cols-1': wrapActionsOnMobile,
      'grid-cols-2': !wrapActionsOnMobile,
    },
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
    'col-span-1 row-span-1 col-start-1 col-end-2 row-start-2 row-end-3 pt-2',
    className,
  )

const sectionHeaderTitleClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('!text-base font-medium text-text-primary', className)

const sectionHeaderActionsWrapperClsx = ({
  className = '',
  wrapActionsOnMobile = true,
}: { className?: string; wrapActionsOnMobile?: boolean } = {}) =>
  clsx(
    'col-span-1',
    'sm:row-span-2 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-3',
    {
      'row-span-1 col-start-1 col-end-2 row-start-3 row-end-4':
        wrapActionsOnMobile,
      'row-span-2 col-start-2 col-end-3 row-start-1 row-end-3':
        !wrapActionsOnMobile,
    },
    className,
  )

const sectionHeaderActionsClsx = ({
  className = '',
  wrapActionsOnMobile = true,
}: { className?: string; wrapActionsOnMobile?: boolean } = {}) =>
  clsx(
    'flex sm:pt-0 sm:justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    {
      'pt-2 justify-start': wrapActionsOnMobile,
      'pt-0 justify-end': !wrapActionsOnMobile,
    },
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
