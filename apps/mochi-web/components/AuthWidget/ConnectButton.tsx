import { Button } from '@consolelabs/core'
import { WalletSolid } from '@consolelabs/icons'
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
        <Button
          ref={ref}
          className="flex gap-x-2 items-center justify-center h-[48px] px-6 py-3 bg-blue-700 !text-base text-white shadow-none rounded-lg"
          {...rest}
        >
          <WalletSolid className="text-xl" />
          Connect Wallet
        </Button>
      )
  }
})
