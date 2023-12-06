import { loginWidget } from '@mochi-ui/theme'
import { useEffect, useState } from 'react'
import { ChainProvider } from './providers/provider'

const { loginWallet, loginWalletIconClsx, loginWalletNameClsx } = loginWidget

export interface WalletProps {
  provider: ChainProvider
  connect: () => void
}

export default function Wallet({ provider, connect }: WalletProps) {
  const Icon = provider.icon
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    provider.isInstalled().then(setIsInstalled)
  }, [provider])

  return (
    <button
      className={loginWallet({
        isInstalled,
      })}
      disabled={!isInstalled}
      onClick={connect}
      type="button"
    >
      <Icon width={24} height={24} className={loginWalletIconClsx()} />
      <span
        aria-label={provider.id || provider.name}
        className={loginWalletNameClsx()}
      >
        {provider.name}
      </span>
    </button>
  )
}
