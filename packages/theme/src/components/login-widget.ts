import clsx from 'clsx'

const loginWidgetTriggerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'px-1.5 text-sm rounded-md border shadow bg-neutral-outline-active border-neutral-solid-focus',
    className,
  )

const loginWidgetDialogOverlayClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('fixed z-50 w-screen h-screen bg-neutral-solid/40', className)

const loginWidgetDialogContentWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) =>
  clsx(
    'flex fixed top-1/2 w-full left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    className,
  )

const loginContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'overflow-hidden rounded-lg relative max-w-[400px] w-full sm:w-screen',
    className,
  )

const loginIntroClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex flex-col items-stretch gap-y-3', className)

const loginIntroHeaderClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex justify-between items-center', className)

const loginIntroHeaderIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-6 h-6', className)

const loginIntroBodyClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex flex-col gap-y-1 pt-3', className)

const loginIntroBodyWalletButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex justify-between items-center h-[56px] hover:!bg-connect-button-hover',
    className,
  )

const loginIntroBodyWalletIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-8 h-8', className)

const loginSocialListClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'h-[48px] lg:h-auto lg:max-h-[144px] w-full flex lg:flex-wrap gap-2',
    className,
  )

const loginWalletListWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-col gap-y-3 items-center', className)

const loginWalletListHeaderClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex justify-between items-center self-stretch', className)

const loginWidget = {
  loginWidgetTriggerClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
  loginContentClsx,
  loginWalletListWrapperClsx,
  loginWalletListHeaderClsx,
  loginIntroClsx,
  loginIntroHeaderClsx,
  loginIntroHeaderIconClsx,
  loginIntroBodyClsx,
  loginIntroBodyWalletButtonClsx,
  loginIntroBodyWalletIconClsx,
  loginSocialListClsx,
}

export { loginWidget }
