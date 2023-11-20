import type { SVGProps } from 'react'
import { loginWidget } from '@consolelabs/theme'

const { loginWallet, loginWalletIconClsx, loginWalletNameClsx } = loginWidget

export interface WalletProps {
  icon: string | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  name: string
  isInstalled: boolean
  connect: (...params: any) => Promise<any>
}

export default function Wallet(props: WalletProps) {
  const Icon = props.icon
  return (
    <button
      className={loginWallet({
        isInstalled: props.isInstalled,
      })}
      disabled={!props.isInstalled}
      onClick={() => void props.connect()}
      type="button"
    >
      <Icon className={loginWalletIconClsx()} />
      <span className={loginWalletNameClsx()}>{props.name}</span>
    </button>
  )
}
