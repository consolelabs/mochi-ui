import type { SVGProps } from 'react'
import { loginWidget } from '@mochi-ui/theme'

const { loginWallet, loginWalletIconClsx, loginWalletNameClsx } = loginWidget

export interface WalletProps {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  name: string
  isInstalled: boolean
  connect: (...params: any) => Promise<any>
  rdns?: string
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
      <Icon width={24} height={24} className={loginWalletIconClsx()} />
      <span aria-label={props.rdns} className={loginWalletNameClsx()}>
        {props.name}
      </span>
    </button>
  )
}
