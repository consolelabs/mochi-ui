import * as Dialog from '@radix-ui/react-dialog'
import { Drawer } from 'vaul'
import { useWindowSize } from '@uidotdev/usehooks'
import { useState } from 'react'
import IconConnectWallets from '../icons/components/icon-connect-wallets'
import { Heading } from '../heading'
import IconCrossCircled from '../icons/components/icon-cross-circled'
import IconExclamationTriangle from '../icons/components/icon-exclamation-triangle'
import getAvailableWallets from './detect-providers'
import Wallet from './wallet'
import type { WalletProps } from './wallet'

const connectors = getAvailableWallets()

interface WidgetProps {
  open: boolean
  onOpenChange: (o: boolean) => void
  trigger?: React.ReactNode
  onSuccess: (data: { signature: string; msg: string; address: string }) => void
}

function Group(props: {
  name: string
  wallets: WalletProps[]
  onSelectWallet: (w: WalletProps) => void
  onError: (e: string) => void
  onSuccess: WidgetProps['onSuccess']
}) {
  if (!props.wallets.length) return null
  return (
    <div className="flex flex-col md:gap-y-2">
      <span className="text-xs font-semibold text-neutral-500">
        {props.name}
      </span>
      <div className="flex flex-row gap-x-1 md:flex-col md:gap-x-0 md:gap-y-1">
        {props.wallets.map((w) => {
          return (
            <Wallet
              {...w}
              connect={async () => {
                props.onSelectWallet(w)
                return w
                  .connect()
                  .then(props.onSuccess)
                  .catch((e: { message?: string; cause?: string }) =>
                    props.onError(
                      e.message ?? e.cause ?? 'Something went wrong',
                    ),
                  )
              }}
              key={w.name}
            />
          )
        })}
      </div>
    </div>
  )
}

enum LoginState {
  Idle = 1,
  Authenticating,
  NotInstalled,
}

function Inner({ onSuccess }: { onSuccess: WidgetProps['onSuccess'] }) {
  const [state, setState] = useState<LoginState>()
  const [wallet, setWallet] = useState<WalletProps>()
  const [error, setError] = useState('')

  return (
    <>
      <div className="flex flex-col gap-y-2 p-5 w-full md:overflow-auto md:gap-y-5 md:w-auto md:border-r md:border-neutral-400 md:min-w-[220px]">
        <Dialog.Title className="text-base">Choose your wallet</Dialog.Title>
        <div className="flex overflow-auto flex-row gap-x-5 md:flex-col md:gap-x-0 md:gap-y-5">
          {Object.entries(connectors).map((e) => {
            return (
              <Group
                key={`group-${e[0]}`}
                name={e[0]}
                onError={setError}
                onSelectWallet={(w) => {
                  setError('')
                  setState(LoginState.Authenticating)
                  setWallet(w)
                }}
                onSuccess={onSuccess}
                wallets={e[1]}
              />
            )
          })}
        </div>
      </div>
      <div className="flex relative justify-center items-center py-28 px-16 md:py-5 md:px-10 md:min-w-[440px]">
        <Dialog.Close className="hidden absolute top-5 right-5 md:block">
          <IconCrossCircled className="w-6 h-6 transition text-neutral-600 hover:text-neutral-700" />
        </Dialog.Close>
        {(() => {
          switch (true) {
            case state === LoginState.Authenticating && Boolean(wallet): {
              const Icon = wallet?.icon ?? IconExclamationTriangle

              return (
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <img
                      alt="mochi icon"
                      className="w-12 h-12 rounded-full"
                      src="https://mochi.gg/logo.png"
                    />
                    <div className="w-16 border border-dashed border-primary-500" />
                    <Icon className="w-12 h-12 rounded" />
                  </div>
                  <span className="mt-4 text-sm">
                    Opening {wallet?.name}...
                  </span>
                  {error ? (
                    <span className="text-sm text-center text-red-500">
                      {error}
                    </span>
                  ) : null}
                </div>
              )
            }
            case state === LoginState.Idle:
            default:
              return (
                <div className="flex flex-col items-center">
                  <IconConnectWallets className="mb-7 w-20 h-20" />
                  <Heading as="h3" className="text-base text-neutral-800">
                    Connect your wallet
                  </Heading>
                  <span className="text-sm font-light text-center text-neutral-600">
                    By connecting your wallet, you agree to your Term of Service
                    and our Privacy Policy
                  </span>
                </div>
              )
          }
        })()}
      </div>
    </>
  )
}

export default function LoginWidget({
  open,
  onOpenChange,
  trigger = <button type="button">Login</button>,
  onSuccess,
}: WidgetProps) {
  const size = useWindowSize()

  if ((size.width ?? 0) <= 768) {
    return (
      <Drawer.Root>
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="flex fixed right-0 bottom-0 left-0 flex-col bg-white rounded-t-2xl">
            <div className="flex flex-col w-full">
              <div className="sticky top-2 z-10 flex-shrink-0 mx-auto mt-2 w-20 h-1.5 rounded-full bg-neutral-400" />
              <div className="flex flex-col-reverse w-full">
                <Inner onSuccess={onSuccess} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-screen h-screen bg-black/30" />
        <Dialog.Content asChild>
          <div
            className="flex fixed top-1/2 left-1/2 z-10 bg-white rounded-2xl -translate-x-1/2 -translate-y-1/2 max-h-[450px]"
            style={{ boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.18)' }}
          >
            <Inner onSuccess={onSuccess} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
