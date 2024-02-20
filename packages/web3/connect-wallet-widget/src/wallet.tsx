import { Button } from '@mochi-ui/button'
import { Badge } from '@mochi-ui/badge'
import { Typography } from '@mochi-ui/typography'
import isMobile from 'is-mobile'
import { connectWalletWidget } from '@mochi-ui/theme'
import { useEffect, useState } from 'react'
import { ChainProvider } from './providers/provider'

const {
  connectWallet,
  connectWalletBadgeClsx,
  connectWalletIconClsx,
  connectWalletNameClsx,
} = connectWalletWidget

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
    <Button
      variant="outline"
      color="neutral"
      className={connectWallet({})}
      /* disabled={!isInstalled} */
      onClick={() =>
        !isMobile() && !isInstalled
          ? window.open(provider.metadata?.installUrl.extension, '_blank')
          : connect()
      }
    >
      <Icon width={24} height={24} className={connectWalletIconClsx()} />
      <span
        aria-label={provider.id || provider.name}
        className={connectWalletNameClsx()}
      >
        {provider.name}
      </span>
      {isInstalled && (
        <Badge className={connectWalletBadgeClsx({})} appearance="neutral">
          <Typography level="p7" color="textTertiary">
            INSTALLED
          </Typography>
        </Badge>
      )}
    </Button>
  )
}
