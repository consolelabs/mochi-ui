import { clsx } from 'clsx'

const pageHeaderWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-col items-center gap-8 sm:flex-row', className)

const pageHeaderLeftClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex gap-2 items-start', className)

const pageHeaderTitleWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex items-center gap-2 mb-2', className)

const pageHeaderTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-[22px] font-semibold text-text-primary', className)

const pageHeaderTitleExtraClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('!text-sm', className)

const pageHeaderActionsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex-1 flex justify-end w-full flex-wrap gap-2 min-w-max sm:w-auto',
    className,
  )

const pageHeaderBackButtonWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('!h-10 !w-10 !min-w-[40px] justify-center', className)

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
