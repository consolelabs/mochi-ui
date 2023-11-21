import { Fragment, SVGProps, useState } from 'react'
import { Tabs, TabList, TabTrigger, TabContent } from '@consolelabs/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@consolelabs/dropdown'
import { IconChevronDown } from '@consolelabs/icons'
import { loginWidget } from '@consolelabs/theme'
import getAvailableWallets from './providers'
import Wallet from './wallet'

const connectors = getAvailableWallets()
const connectorNames =
  (Object.keys(connectors) as (keyof typeof connectors)[]) || []

const {
  loginWalletListTabsClsx,
  loginWalletListTabListClsx,
  loginWalletListTabTriggerWrapperClsx,
  loginWalletListTabTriggerClsx,
  loginWalletListTabTriggerDividerClsx,
  loginWalletListTabContentClsx,
  loginWalletListDropdownTriggerClsx,
  loginWalletListDropdownItemWrapperClsx,
  loginWalletListDropdownItemClsx,
} = loginWidget

export interface WalletProps {
  icon: string | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  name: string
  active?: boolean
  isInstalled: boolean
  connect: (...params: any) => Promise<any>
}

export type OnSuccess = (data: {
  signature: string
  msg: string
  addresses: string[]
  platform: 'evm' | 'solana' | 'ronin' | 'sui'
}) => void

interface WalletListProps {
  onSelectWallet: (w: WalletProps) => void
  onError: (e: string) => void
  onSuccess?: OnSuccess
}

export const WalletList = ({
  onSelectWallet,
  onSuccess,
  onError,
}: WalletListProps) => {
  const [selectedConnector, setSelectedConnector] = useState(
    connectorNames[0] as keyof typeof connectors,
  )
  const sortedConnectors = connectorNames
    .map((connector, index) => ({
      connector,
      index: index < 3 ? 4 - index : Number(connector === selectedConnector),
    }))
    .sort((a, b) => b.index - a.index)
    .map(({ connector }) => connector)
  const selectedIndex = sortedConnectors.indexOf(selectedConnector)

  return (
    <Tabs value={selectedConnector} className={loginWalletListTabsClsx()}>
      <TabList className={loginWalletListTabListClsx()}>
        {sortedConnectors.slice(0, 4).map((connector, index) => (
          <Fragment key={connector}>
            <TabTrigger
              value={connector}
              wrapperClassName={loginWalletListTabTriggerWrapperClsx()}
              className={loginWalletListTabTriggerClsx({
                isSelected: connector === selectedConnector,
              })}
              onClick={() => setSelectedConnector(connector)}
            >
              {connector}
            </TabTrigger>
            {selectedIndex !== index && selectedIndex !== index + 1 && (
              <div className={loginWalletListTabTriggerDividerClsx()} />
            )}
          </Fragment>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className={loginWalletListDropdownTriggerClsx()}>
            <IconChevronDown width={20} height={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortedConnectors.slice(4).map((connector) => (
              <DropdownMenuItem
                key={connector}
                wrapperClassName={loginWalletListDropdownItemWrapperClsx()}
                onClick={() => setSelectedConnector(connector)}
              >
                <span className={loginWalletListDropdownItemClsx()}>
                  {connector}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TabList>
      {connectorNames.map((value) => (
        <TabContent
          key={value}
          value={value}
          className={loginWalletListTabContentClsx()}
        >
          {connectors[value].map((wallet) => (
            <Wallet
              {...wallet}
              key={wallet.name}
              connect={() => {
                onSelectWallet(wallet)
                return wallet
                  .connect()
                  .then(onSuccess)
                  .catch((e: { message?: string; cause?: string }) => {
                    onError(e.message ?? e.cause ?? 'Something went wrong')
                  })
              }}
            />
          ))}
        </TabContent>
      ))}
    </Tabs>
  )
}
