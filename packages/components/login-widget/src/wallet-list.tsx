import { Fragment, useMemo, useState } from 'react'
import { Tabs, TabList, TabTrigger, TabContent } from '@mochi-ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@mochi-ui/dropdown'
import { ChevronDownLine } from '@mochi-ui/icons'
import { loginWidget } from '@mochi-ui/theme'
import getProviders from './providers'
import Wallet, { WalletProps } from './wallet'
import { useLoginWidget } from './store'

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
  onSelectWallet: (w: WalletProps) => void
}

export default function WalletList({ onSelectWallet }: WalletListProps) {
  const { isLoggedIn } = useLoginWidget()

  const { connectors, connectorNames } = useMemo(() => {
    return getProviders(!isLoggedIn)
  }, [isLoggedIn])

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
              connect={async () => onSelectWallet(wallet)}
            />
          ))}
        </TabContent>
      ))}
    </Tabs>
  )
}
