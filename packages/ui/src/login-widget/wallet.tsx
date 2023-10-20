import type { SVGProps } from 'react'
import clsx from 'clsx'

export interface WalletProps {
  icon: string | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  transparent?: boolean
  name: string
  active?: boolean
  isInstalled: boolean
  connect: (...params: any) => Promise<any>
}

export default function Wallet(props: WalletProps) {
  return (
    <button
      className={clsx(
        'ui-flex ui-gap-x-3 ui-items-center ui-py-3 ui-px-6 ui-rounded-xl ui-transition hover:ui-bg-neutral-100',
        {
          'ui-opacity-50': !props.isInstalled,
          'ui-text-neutral-600': !props.active,
          'ui-text-neutral-800': Boolean(props.active),
        },
      )}
      disabled={!props.isInstalled}
      onClick={() => void props.connect()}
      type="button"
    >
      <props.icon className="ui-w-6 ui-h-6 ui-rounded" />
      <span className="ui-text-sm ui-text-left">{props.name}</span>
    </button>
  )
}
