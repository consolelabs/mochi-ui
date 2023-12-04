import { Button } from '@mochi-ui/core'
import { WalletSolid } from '@mochi-ui/icons'
import React, { MouseEventHandler } from 'react'
import type { Variant } from './types'

interface ConnectButtonProps {
  variant?: Variant
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ConnectButton = React.forwardRef<
  HTMLButtonElement,
  ConnectButtonProps
>(({ variant, ...rest }, ref) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div className="flex justify-center items-center w-full">
          <Button ref={ref} variant="outline" color="neutral" {...rest}>
            <WalletSolid className="text-xl" />
            Connect Wallet
          </Button>
        </div>
      )
    case 'modal':
    default:
      return (
        <Button ref={ref} size="lg" {...rest}>
          <WalletSolid className="text-xl" />
          Connect Wallet
        </Button>
      )
  }
})
