import { clsx } from 'clsx'

const pageHeaderWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'overflow-hidden flex flex-col items-start sm:items-center gap-2 sm:flex-row px-4 py-4 md:px-8 sm:py-3 bg-background-body shrink-0',
    className,
  )

const pageHeaderTitleWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex shrink flex-wrap flex-1 items-center gap-2', className)

const pageHeaderTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'text-[22px] font-semibold text-text-primary py-1 break-words',
    className,
  )

const pageHeaderTitleExtraClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('!text-sm truncate', className)

const pageHeaderActionsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'pt-2 sm:pt-0 flex justify-start sm:justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    className,
  )

const pageHeaderBackButtonWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    '!h-10 !w-10 !min-w-[40px] ml-0 sm:-ml-2 justify-start sm:justify-center',
    className,
  )

const pageHeaderBackIconWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-2xl', className)

const pageHeader = {
  pageHeaderWrapperClsx,
  pageHeaderTitleWrapperClsx,
  pageHeaderTitleClsx,
  pageHeaderTitleExtraClsx,
  pageHeaderActionsWrapperClsx,
  pageHeaderBackButtonWrapperClsx,
  pageHeaderBackIconWrapperClsx,
}

export { pageHeader }
