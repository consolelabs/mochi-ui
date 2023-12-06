import { clsx } from 'clsx'

const pageHeaderWrapperClsx = ({
  className = '',
  hasBackButton = false,
}: { className?: string; hasBackButton?: boolean } = {}) =>
  clsx(
    'flex flex-col items-center gap-4 sm:gap-8 sm:flex-row px-4 py-4 sm:px-8 sm:py-3 bg-background-surface shrink-0',
    {
      '!pl-4 sm:!pl-2': hasBackButton,
    },
    className,
  )

const pageHeaderLeftClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex w-full gap-2 items-start flex-col sm:flex-row', className)

const pageHeaderTitleWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('flex items-center gap-2', className)

const pageHeaderTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-[22px] font-semibold text-text-primary py-1', className)

const pageHeaderTitleExtraClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('!text-sm', className)

const pageHeaderActionsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex-1 flex justify-start sm:justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    className,
  )

const pageHeaderBackButtonWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('!h-10 !w-10 !min-w-[40px] justify-start sm:justify-center', className)

const pageHeaderBackIconWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-3xl', className)

const pageHeader = {
  pageHeaderWrapperClsx,
  pageHeaderLeftClsx,
  pageHeaderTitleWrapperClsx,
  pageHeaderTitleClsx,
  pageHeaderTitleExtraClsx,
  pageHeaderActionsWrapperClsx,
  pageHeaderBackButtonWrapperClsx,
  pageHeaderBackIconWrapperClsx,
}

export { pageHeader }
