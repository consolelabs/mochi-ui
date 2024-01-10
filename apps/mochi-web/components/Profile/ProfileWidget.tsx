import {
  Avatar,
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  TabList,
  TabTrigger,
  Tabs,
  Typography,
  ValueChange,
  ValueChangeIndicator,
} from '@mochi-ui/core'
import { utils } from '@consolelabs/mochi-formatter'
import {
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
  ChartSolid,
  ChevronDownLine,
  MenuAddSolid,
} from '@mochi-ui/icons'
import { useMochiWidget, useProfileStore, useWalletStore } from '~store'
import { useFetchProfileGlobalInfo } from '~hooks/profile/useFetchProfileGlobalInfo'
import { BalanceWithSource, TokenTableList } from '~cpn/TokenTableList'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useShallow } from 'zustand/react/shallow'
import { TokenAvatar } from '~cpn/TokenAvatar'

const sortOrder = ['All', 'Mochi']
const defaultChainMapping: Record<string, string> = {
  SOL: 'Solana',
  ETH: 'Ethereum',
  ARB: 'Arbitrum',
  RON: 'Ronin',
  ATOM: 'Cosmos',
  OP: 'Optimisim',
  ZKSYNC: 'zkSync',
  APT: 'Aptos',
  SUI: 'Sui',
  FIAT: 'Fiat',
}

export const ProfileWidget = () => {
  const { me } = useProfileStore()
  const { data } = useFetchProfileGlobalInfo(me?.id)
  const { isFetchingWallets, wallets } = useWalletStore(
    useShallow((s) => ({
      isFetchingWallets: s.isFetching,
      wallets: s.wallets,
    })),
  )
  const { setSelectedAsset } = useMochiWidget(
    useShallow((s) => ({
      selectedAsset: s.selectedAsset,
      setSelectedAsset: s.setSelectedAsset,
    })),
  )
  const tabElement = useRef<HTMLDivElement>(null)
  const [displayChainAmount, setDisplayChainAmount] = useState(2)
  const [_selectedChain, setSelectedChain] = useState('')
  const { info, pnl, total } = data

  const balances: BalanceWithSource[] = wallets.flatMap((w) =>
    w.balances.map((b) => ({
      ...b,
      source: {
        id: w.id,
        title: w.title,
      },
    })),
  )
  const chains = balances.reduce<{ [chain: string]: BalanceWithSource[] }>(
    (prev, curr) => {
      const key =
        curr.token?.chain?.symbol ||
        curr.token?.chain?.short_name?.toUpperCase() ||
        curr.token?.chain?.name?.toUpperCase() ||
        'All'
      return {
        ...prev,
        [key]: [...(prev[key] || []), curr],
      }
    },
    {
      All: balances,
      Mochi: wallets.flatMap((w) =>
        w.id === 'mochi'
          ? w.balances.map((b) => ({
              ...b,
              source: { id: w.id, title: w.title },
            }))
          : [],
      ),
      SOL: [],
      ETH: [],
      ARB: [],
      Fantom: [],
      RON: [],
      ATOM: [],
      TON: [],
      OP: [],
      ZKSYNC: [],
      APT: [],
      SUI: [],
      CEX: [],
      FIAT: [],
    },
  )
  const sortedChains = Object.keys(chains)
    .map((chain, index) => ({
      chain,
      index:
        index < displayChainAmount - 1
          ? displayChainAmount - index
          : Number(chain === _selectedChain),
    }))
    .sort((a, b) => {
      const indexA = sortOrder.findIndex((symbol) => symbol === a.chain)
      const indexB = sortOrder.findIndex((symbol) => symbol === b.chain)

      if (indexA === -1 && indexB === -1) return b.index - a.index

      if (indexA === -1) return 1
      if (indexB === -1) return -1

      if (indexA > indexB) return 1
      if (indexA < indexB) return -1
      return 0
    })
    .map(({ chain }) => chain)
  const selectedChain = _selectedChain || sortedChains[0]

  useEffect(() => {
    const element = tabElement.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      const amount = Math.floor((element.clientWidth - 120) / 50)
      setDisplayChainAmount(amount)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Card className="pb-3 space-y-4 shadow-input">
      <div className="flex items-center space-x-2">
        <Avatar src={me?.avatar || ''} size="lg" />
        <div className="overflow-hidden flex-1 space-y-1">
          <Typography level="h6" noWrap>
            {me?.profile_name}
          </Typography>
          <Badge appearance="white" className="w-fit">
            <Typography level="p6">Rank #{info?.rank || 0}</Typography>
          </Badge>
        </div>
        <div className="text-right">
          <Typography level="h5">
            $
            {utils.formatDigit({
              value: total,
              fractionDigits: total >= 100 ? 0 : 2,
            })}
          </Typography>
          <div className="flex justify-end items-center">
            <ValueChange
              trend={pnl.startsWith('-') ? 'down' : 'up'}
              className="mr-2"
            >
              <ValueChangeIndicator />
              <Typography
                level="h8"
                color={pnl.startsWith('-') ? 'danger' : 'success'}
              >
                {utils.formatPercentDigit(Number.isNaN(Number(pnl)) ? 0 : pnl)}{' '}
                (
                {utils.formatUsdDigit(
                  Number.isNaN(Number(pnl)) ? 0 : (pnl * total) / 100,
                )}
                )
              </Typography>
            </ValueChange>
            <IconButton
              color="neutral"
              variant="outline"
              label="chart"
              className="py-1 px-1"
              disabled
            >
              <ChartSolid className="w-3 h-3" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <ArrowUpSquareSolid className="w-4 h-4" />
          Send
        </Button>
        <Button variant="outline">
          <ArrowDownSquareSolid className="w-4 h-4" />
          Receive
        </Button>
      </div>
      <Tabs value={selectedChain}>
        <TabList
          className="flex items-center -mx-4 border-t border-b border-divider"
          ref={tabElement}
        >
          {sortedChains.slice(0, displayChainAmount).map((chain) => {
            const isSelected = chain === selectedChain
            const name =
              {
                All: 'All',
                Mochi: 'Mochi',
              }[chain] ||
              defaultChainMapping[chain] ||
              chains[chain]?.[0]?.token?.chain?.name ||
              chain
            const avatar = {
              All: <MenuAddSolid className="w-6 h-6 text-text-icon" />,
              Mochi: <Avatar src="/logo.png" className="w-6 h-6" />,
            }[chain] || (
              <TokenAvatar
                src={chains[chain]?.[0]?.token?.chain?.icon || ''}
                name={chain}
              />
            )
            return (
              <TabTrigger
                key={chain}
                value={chain}
                variant="solid"
                wrapperClassName="pl-0 pr-0 border-r-0"
                className={clsx('h-10 space-x-1 outline-none rounded-none', {
                  'bg-background-level2 w-[120px]': isSelected,
                })}
                onClick={() => setSelectedChain(chain)}
              >
                {avatar}
                {isSelected && (
                  <Typography level="h8">{name.split(' ')[0]}</Typography>
                )}
              </TabTrigger>
            )
          })}
          {sortedChains.length > displayChainAmount && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center w-10 h-10 hover:bg-neutral-outline-hover">
                <ChevronDownLine width={20} height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" wrapperClassName="z-50">
                <ScrollArea
                  className={clsx({
                    'h-96': sortedChains.slice(displayChainAmount).length > 8,
                  })}
                >
                  <ScrollAreaViewport>
                    {sortedChains.slice(displayChainAmount).map((chain) => (
                      <DropdownMenuItem
                        key={chain}
                        className="!flex-row items-center space-x-3"
                        onClick={() => setSelectedChain(chain)}
                      >
                        <TokenAvatar
                          src={chains[chain]?.[0]?.token?.chain?.icon || ''}
                          name={chain}
                        />
                        <Typography level="h8">
                          {defaultChainMapping[chain] ||
                            chains[chain]?.[0]?.token?.chain?.name ||
                            chain}
                        </Typography>
                      </DropdownMenuItem>
                    ))}
                    <Typography
                      level="p6"
                      color="textSecondary"
                      className="px-2"
                    >
                      Only supported chains are shown
                    </Typography>
                  </ScrollAreaViewport>
                  <ScrollAreaScrollbar>
                    <ScrollAreaThumb />
                  </ScrollAreaScrollbar>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </TabList>
      </Tabs>
      <TokenTableList
        isLoading={!wallets.length && isFetchingWallets}
        data={chains[selectedChain]}
        hideLastBorder
        onRow={(record) => ({
          onClick: () => setSelectedAsset(record),
        })}
      />
    </Card>
  )
}
