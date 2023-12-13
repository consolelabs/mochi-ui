import { connectWalletWidget } from '@mochi-ui/theme'
import { useEffect, useState } from 'react'
import { ChainProvider } from './providers/provider'

const { connectWallet, connectWalletIconClsx, connectWalletNameClsx } =
  connectWalletWidget

export interface WalletProps {
  provider: ChainProvider
  connect: () => void
  hideDisabledWallets: boolean
}

export default function Wallet({
  provider,
  hideDisabledWallets,
  connect,
}: WalletProps) {
  const Icon = provider.icon
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    provider.isInstalled().then(setIsInstalled)
  }, [provider])

  if (!isInstalled && hideDisabledWallets) return null

  return (
    <button
      className={connectWallet({
        isInstalled: true,
      })}
      /* disabled={!isInstalled} */
      onClick={connect}
      type="button"
    >
      <Icon width={24} height={24} className={connectWalletIconClsx()} />
      <span
        aria-label={provider.id || provider.name}
        className={connectWalletNameClsx()}
      >
        {provider.name}
      </span>
    </button>
  )
}
