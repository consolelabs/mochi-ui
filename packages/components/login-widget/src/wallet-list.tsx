import { Fragment, useState } from 'react'
import { Tabs, TabList, TabTrigger, TabContent } from '@mochi-ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@mochi-ui/dropdown'
import { ChevronDownLine } from '@mochi-ui/icons'
import { loginWidget } from '@mochi-ui/theme'
import Wallet from './wallet'
import type { ConnectorName, Connectors } from './providers'
import { ChainProvider } from './providers/provider'

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

interface WalletListProps {
  onSelectWallet: (w: ChainProvider) => void
  connectors: Connectors
  chain?: string
}

const connectorNames: ConnectorName[] = ['EVM', 'SOL', 'RON', 'SUI', 'TON']

export default function WalletList({
  connectors,
  onSelectWallet,
  chain: _chain,
}: WalletListProps) {
  const chain = _chain?.slice(0, 3).toUpperCase()
  const [selectedConnector, setSelectedConnector] = useState(
    chain ?? connectorNames[0],
  )
  const sortedConnectors = connectorNames
    .filter((connector) => {
      return !chain ? true : connector === chain
    })
    .map((connector, index) => ({
      connector,
      index: index < 3 ? 4 - index : Number(connector === selectedConnector),
    }))
    .sort((a, b) => b.index - a.index)
    .map(({ connector }) => connector)
  const selectedIndex = sortedConnectors.indexOf(
    selectedConnector as ConnectorName,
  )

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
        {!chain && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={loginWalletListDropdownTriggerClsx()}
            >
              <ChevronDownLine width={20} height={20} />
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
        )}
      </TabList>
      {connectorNames.map((value) => (
        <TabContent
          key={value}
          value={value}
          className={loginWalletListTabContentClsx()}
        >
          {connectors[value as ConnectorName].map((provider) => (
            <Wallet
              key={provider.name}
              provider={provider}
              connect={() => onSelectWallet(provider)}
            />
          ))}
        </TabContent>
      ))}
    </Tabs>
  )
}
