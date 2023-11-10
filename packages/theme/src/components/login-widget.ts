import clsx from 'clsx'

const loginGroupWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('flex flex-col md:gap-y-2', className)

const loginGroupNameClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-xs font-semibold text-neutral-500 uppercase', className)

const loginGroupWalletsClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-row gap-x-1 md:flex-col md:gap-x-0 md:gap-y-1', className)

const loginInnerWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex flex-col gap-y-2 p-5 w-full md:overflow-auto md:gap-y-5 md:w-auto md:border-r md:border-neutral-400 md:min-w-[287px]',
    className,
  )

const loginInnerTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-base', className)

const loginInnerGroupClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex overflow-auto flex-row gap-x-5 md:flex-col md:gap-x-0 md:gap-y-5',
    className,
  )

const loginInnerContentClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex relative justify-center items-center py-28 px-16 md:py-5 md:px-10 md:flex-1',
    className,
  )

const loginInnerCloseButtonClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('hidden absolute top-5 right-5 md:block', className)

const loginInnerCloseIconClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('w-6 h-6 transition text-neutral-600 hover:text-neutral-700', className)

const loginInnerStateClsx = () => ({
  connecting: {
    container: 'flex flex-col items-center',
    imgWrapper: 'flex items-center',
    img: 'w-12 h-12 rounded-full',
    divider: 'w-16 border border-dashed border-primary-500',
    icon: 'w-12 h-12 rounded',
    message: 'mt-4 text-sm',
    error: 'text-sm text-center text-red-500',
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

const loginWidgetMobileDrawerOverlayClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('fixed inset-0 z-40 bg-black/30', className)

const loginWidgetMobileDrawerContentWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) =>
  clsx(
    'flex fixed right-0 bottom-0 left-0 z-50 flex-col bg-white rounded-t-2xl',
    className,
  )

const loginWidgetMobileDrawerContentClsx = () => ({
  container: 'flex flex-col w-full',
  divider:
    'sticky top-2 z-10 flex-shrink-0 mx-auto mt-2 w-20 h-1.5 rounded-full bg-neutral-400',
  innerWrapper: 'flex flex-col-reverse w-full',
})

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
    'flex fixed top-1/2 w-[720px] left-1/2 z-50 bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2 max-h-[450px]',
    className,
  )

const loginWallet = ({
  isInstalled,
  active,
  className = '',
}: {
  isInstalled?: boolean
  active?: boolean
  className?: string
}) =>
  clsx(
    'flex gap-x-3 items-center py-3 px-6 rounded-xl transition hover:bg-neutral-100',
    {
      'opacity-50': !isInstalled,
      'text-neutral-600': !active,
      'text-neutral-800': Boolean(active),
    },
    className,
  )

const loginWalletIconClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-6 h-6 rounded', className)

const loginWalletNameClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-sm text-left', className)

const loginWidget = {
  loginGroupWrapperClsx,
  loginGroupNameClsx,
  loginGroupWalletsClsx,
  loginInnerWrapperClsx,
  loginInnerTitleClsx,
  loginInnerGroupClsx,
  loginInnerContentClsx,
  loginInnerCloseButtonClsx,
  loginInnerCloseIconClsx,
  loginInnerStateClsx,
  loginWidgetTriggerClsx,
  loginWidgetMobileDrawerOverlayClsx,
  loginWidgetMobileDrawerContentWrapperClsx,
  loginWidgetMobileDrawerContentClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
  loginWallet,
  loginWalletIconClsx,
  loginWalletNameClsx,
}

export { loginWidget }
