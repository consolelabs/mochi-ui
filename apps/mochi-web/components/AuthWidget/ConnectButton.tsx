import { IconWallet, Button } from '@consolelabs/ui-components'
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
        <div className="flex justify-center items-center w-full">
          <Button
            className="flex gap-x-2 items-center justify-center w-fit h-[48px] px-6 py-3 bg-white-pure !text-base !text-[#343433] shadow-sm rounded-lg !border-[#e5e4e3]"
            {...rest}
          >
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
