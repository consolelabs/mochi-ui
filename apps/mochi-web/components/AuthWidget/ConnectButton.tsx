import { Button } from '@consolelabs/core'
import { IconWallet } from '@consolelabs/icons'
import { MouseEventHandler } from 'react'
import type { Variant } from './types'

interface ConnectButtonProps {
  variant?: Variant
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  variant,
  ...rest
}) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div className="flex items-center justify-center w-full">
          <Button variant="outline" color="neutral" {...rest}>
            <IconWallet className="text-xl" />
            Connect Wallet
          </Button>
        </div>
      )
    case 'modal':
    default:
      return (
        <Button
          className="flex gap-x-2 items-center justify-center h-[48px] px-6 py-3 bg-blue-700 !text-base text-white shadow-none rounded-lg"
          {...rest}
        >
          <IconWallet className="text-xl" />
          Connect Wallet
        </Button>
      )
  }
}
