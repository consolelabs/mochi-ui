import { IconWallet, Button } from '@consolelabs/ui-components'
import { Variant } from './AuthPanel'

interface ConnectButtonProps {
  variant?: Variant
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ variant }) => {
  switch (variant) {
    case 'dropdown':
      return (
        <div className="flex items-center justify-center w-full">
          <Button className="flex gap-x-2 items-center justify-center w-fit h-[48px] px-6 py-3 bg-white-pure !text-base !text-[#343433] shadow-sm rounded-lg !border-[#e5e4e3]">
            <IconWallet className="text-xl" />
            Connect Wallet
          </Button>
        </div>
      )
    case 'modal':
    default:
      return (
        <Button className="flex gap-x-2 items-center justify-center h-[48px] px-6 py-3 bg-blue-700 !text-base text-white shadow-none rounded-lg">
          <IconWallet className="text-xl" />
          Connect Wallet
        </Button>
      )
  }
}
