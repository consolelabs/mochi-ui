import clsx from 'clsx'

const mobileNavWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('flex flex-col', className)

const mobileNavListRootClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex-1 py-6 px-4 gap-4 w-full', className)

const mobileNavListContentClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('space-y-4 h-fit', className)

const mobileNavListViewportClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('h-fit', className)

const topBarNavToggleButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'bg-background-surface focus:outline-none !p-2 rounded-md hover:border-none focus:ring ring-neutral-outline',
    className,
  )

const topBarNavToggleButtonIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-2xl text-neutral-800', className)

const topBarNavMobileNavContainerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'fixed sm:hidden top-16 inset-0 bg-background-popup rounded-none flex flex-col overflow-y-scroll',
    className,
  )

const topBarNavContainerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'sticky h-16 py-3 gap-6 w-screen max-w-full top-0 flex flex-shrink-0 justify-between items-center z-20 bg-background-surface',
    'pl-4 pr-3 gap-y-4', // mobile
    'sm:px-8', // desktop
    'sm:h-16 sm:flex-row', // tablet-desktop
    'border-b border-neutral-outline-border',
    className,
  )

const topBarRightClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('overflow-auto p-1 -mr-1', className)

const topBarDesktopNavClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'hidden sm:flex flex-nowrap flex-row self-center ml-auto gap-y-2 gap-x-6',
    className,
  )

const topBarMobileNavClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex sm:hidden flex-nowrap flex-row self-center ml-auto gap-y-2 gap-x-6',
    className,
  )

const topBarDesktopNavContainerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-nowrap items-center gap-4', className)

const topBar = {
  topBarRightClsx,
  mobileNavWrapperClsx,
  mobileNavListRootClsx,
  mobileNavListContentClsx,
  mobileNavListViewportClsx,
  topBarNavToggleButtonClsx,
  topBarNavToggleButtonIconClsx,
  topBarNavMobileNavContainerClsx,
  topBarNavContainerClsx,
  topBarDesktopNavClsx,
  topBarMobileNavClsx,
  topBarDesktopNavContainerClsx,
}

export { topBar }
