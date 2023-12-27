import { Fragment, useState } from 'react'
import { Tabs, TabList, TabTrigger, TabContent } from '@mochi-ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@mochi-ui/dropdown'
import { ChevronDownLine } from '@mochi-ui/icons'
import { connectWalletWidget } from '@mochi-ui/theme'
import Wallet from './wallet'
import type { ConnectorName, Connectors } from './providers'
import { ChainProvider } from './providers/provider'

// sort
const chainPriority = ['SOL', 'EVM', 'RON']

const {
  connectWalletListTabsClsx,
  connectWalletListTabListClsx,
  connectWalletListTabTriggerWrapperClsx,
  connectWalletListTabTriggerClsx,
  connectWalletListTabTriggerDividerClsx,
  connectWalletListTabContentClsx,
  connectWalletListDropdownTriggerClsx,
  connectWalletListDropdownItemWrapperClsx,
  connectWalletListDropdownItemClsx,
} = connectWalletWidget

interface WalletListProps {
  onSelectWallet: (w: ChainProvider) => void
  connectors: Connectors
  chain?: string
  hideDisabledWallets: boolean
}

const connectorNames = ['EVM', 'SOL', 'RON', 'SUI', 'TON'].sort(
  (symbolA, symbolB) => {
    const indexA = chainPriority.findIndex((cp) => cp === symbolA)
    const indexB = chainPriority.findIndex((cp) => cp === symbolB)
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    if (indexA > indexB) return 1
    if (indexA < indexB) return -1
    return 0
  },
) as ConnectorName[]

export default function WalletList({
  connectors,
  onSelectWallet,
  chain: _chain,
  hideDisabledWallets,
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
    <Tabs value={selectedConnector} className={connectWalletListTabsClsx()}>
      <TabList className={connectWalletListTabListClsx()}>
        {sortedConnectors.slice(0, 4).map((connector, index) => (
          <Fragment key={connector}>
            <TabTrigger
              value={connector}
              wrapperClassName={connectWalletListTabTriggerWrapperClsx()}
              className={connectWalletListTabTriggerClsx({
                isSelected: connector === selectedConnector,
              })}
              onClick={() => setSelectedConnector(connector)}
            >
              {connector}
            </TabTrigger>
            {selectedIndex !== index && selectedIndex !== index + 1 && (
              <div className={connectWalletListTabTriggerDividerClsx()} />
            )}
          </Fragment>
        ))}
        {!chain && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={connectWalletListDropdownTriggerClsx()}
            >
              <ChevronDownLine width={20} height={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortedConnectors.slice(3).map((connector) => (
                <DropdownMenuItem
                  key={connector}
                  wrapperClassName={connectWalletListDropdownItemWrapperClsx()}
                  onClick={() => setSelectedConnector(connector)}
                >
                  <span className={connectWalletListDropdownItemClsx()}>
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
          className={connectWalletListTabContentClsx()}
        >
          {connectors[value as ConnectorName].map((provider) => (
            <Wallet
              key={provider.name}
              provider={provider}
              connect={() => onSelectWallet(provider)}
              hideDisabledWallets={hideDisabledWallets}
            />
          ))}
        </TabContent>
      ))}
    </Tabs>
  )
}
