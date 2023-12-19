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
  clsx('overflow-hidden rounded-lg relative max-w-[400px] w-full', className)

const loginSocialClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex flex-col items-stretch', className)

const loginSocialButtonChangePageClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('mt-8', className)

const loginContentSocialGridWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-col gap-8 mt-8 text-center', className)

const loginContentSocialGridClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('grid grid-cols-4 grid-rows-2 gap-4 mx-auto text-3xl w-fit', className)

const loginWalletListWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex flex-col gap-y-3 items-center', className)

const loginWidget = {
  loginWidgetTriggerClsx,
  loginWidgetDialogOverlayClsx,
  loginWidgetDialogContentWrapperClsx,
  loginContentClsx,
  loginContentSocialGridWrapperClsx,
  loginContentSocialGridClsx,
  loginWalletListWrapperClsx,
  loginSocialButtonChangePageClsx,
  loginSocialClsx,
}

export { loginWidget }
