import clsx from 'clsx'

const loginInnerStateClsx = () => ({
  connecting: {
    container: 'flex flex-col items-center justify-center p-3 w-full',
    imgWrapper: 'flex items-center mt-5',
    img: 'w-12 h-12 rounded-full',
    divider: 'w-16 border border-dashed border-primary-500 relative',
    icon: 'w-12 h-12 rounded',
    message: 'mt-5 text-sm font-semibold text-neutral-900',
    'message-detail': 'mt-2 text-sm text-neutral-600 text-center',
    error: 'text-sm text-center text-red-500',
    header: 'mt-4 text-lg font-medium text-center text-neutral-800',
    buttons: 'mt-8 space-x-3',
    'connect-icon-success':
      'flex items-center justify-center w-5 h-5 bg-success-700 rounded-full absolute -top-2.5 left-1/2 -translate-x-1/2',
    'connect-icon-error':
      'flex items-center justify-center w-5 h-5 bg-danger-700 rounded-full absolute -top-2.5 left-1/2 -translate-x-1/2',
    'connect-icon': 'w-3 h-3 text-white',
  },
  idle: {
    container: 'flex flex-col items-center',
    icon: 'mb-7 w-20 h-20',
    heading: 'text-base text-neutral-800',
    message: 'text-sm font-light text-center text-neutral-600',
  },
})

const loginWidgetTriggerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'px-1.5 text-sm rounded-md border shadow bg-neutral-200 border-neutral-500',
    className,
  )

const loginWidgetDialogOverlayClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('fixed z-40 w-screen h-screen bg-black/30', className)

const loginWidgetDialogContentWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) =>
  clsx(
    'flex fixed top-1/2 w-full max-w-sm left-1/2 z-50 bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2 p-3',
    className,
  )

const loginWallet = ({
  isInstalled,
  className = '',
}: {
  isInstalled?: boolean
  className?: string
}) =>
  clsx(
    'flex flex-col items-center justify-center h-20 gap-2 border rounded-lg border-neutral-150 hover:bg-neutral-150',
    {
      'opacity-50 cursor-not-allowed': !isInstalled,
    },
    className,
  )

const loginWalletIconClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-6 h-6 rounded', className)

const loginWalletNameClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-sm font-medium text-neutral-600', className)

const loginWalletListTabsClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-full space-y-3', className)

const loginWalletListTabListClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex rounded-lg bg-neutral-200 p-0.5 items-center', className)

const loginWalletListTabTriggerWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('pl-0 pr-0', className)

const loginWalletListTabTriggerClsx = ({
  className = '',
  isSelected,
}: { className?: string; isSelected?: boolean } = {}) =>
  clsx('rounded-md ', { 'bg-white': isSelected }, className)

const loginWalletListTabTriggerDividerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('h-3 border-r border-neutral-400', className)

const loginWalletListTabContentClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('grid grid-cols-4 gap-1', className)

const loginWalletListDropdownTriggerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex items-center justify-center rounded-md hover:bg-white text-neutral-600 w-7 h-7',
    className,
  )

const loginWalletListDropdownItemWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('py-0.5', className)

const loginWalletListDropdownItemClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-neutral-600', className)

const loginWidget = {
  loginInnerStateClsx,
  loginWidgetTriggerClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
  loginWallet,
  loginWalletIconClsx,
  loginWalletNameClsx,
  loginWalletListTabsClsx,
  loginWalletListTabListClsx,
  loginWalletListTabTriggerWrapperClsx,
  loginWalletListTabTriggerClsx,
  loginWalletListTabTriggerDividerClsx,
  loginWalletListTabContentClsx,
  loginWalletListDropdownTriggerClsx,
  loginWalletListDropdownItemWrapperClsx,
  loginWalletListDropdownItemClsx,
}

export { loginWidget }
