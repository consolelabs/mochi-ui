import {
  Avatar,
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  TabContent,
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
import { useFetchTotalBalance } from '~hooks/profile/useFetchTotalBalance'
import { usePrevious } from '@dwarvesf/react-hooks'
import { Token } from '@consolelabs/mochi-rest'

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
  TON: 'TON',
  BNB: 'BNB',
}

export const ProfileWidget = () => {
  const { me } = useProfileStore()
  const { data: info } = useFetchProfileGlobalInfo(me?.id)
  const {
    data: {
      totalUsdAmount: total = 0,
      pnl = '0',
      offchain = [],
      cex = {},
    } = {},
    isLoading,
  } = useFetchTotalBalance(me?.id)
  const { future: binanceFuture = [], asset: binanceSpot = [] } =
    cex.binance ?? {}
  const isFetchingBalance = !me?.id || isLoading
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
  const [tabsWidth, setTabsWidth] = useState(0)
  const [displayChainAmount, setDisplayChainAmount] = useState(2)
  const [_selectedChain, setSelectedChain] = useState('')

  const balances: BalanceWithSource[] = [
    ...wallets.flatMap((w) =>
      w.balances.map((b) => ({
        ...b,
        pnl: offchain.find((each) => each.token?.id === b.token.id)?.token?.pnl,
        source: {
          id: w.id,
          title: w.title,
        },
      })),
    ),
    ...(binanceSpot?.map<BalanceWithSource>((each) => ({
      type: 'token',
      asset_balance: each.asset_balance || 0,
      usd_balance: each.usd_balance || 0,
      token: {
        ...each.token,
        chain: {
          id: 'binance',
          symbol: 'Binance',
        },
      } as Token,
      disabled: false,
      pnl: each.token?.pnl,
      source: {
        id: 'binance',
        title: 'Binance',
      },
    })) ?? []),
    ...(binanceFuture
      ?.filter((each) => Number(each.balance) !== 0)
      .map<BalanceWithSource>((each) => ({
        type: 'token',
        asset_balance: +(each.balance || 0),
        usd_balance: each.usd_balance || 0,
        token: {
          symbol: each.asset ?? '',
          price: each.token?.price,
          chain: {
            id: 'binance',
            symbol: 'Binance',
          },
        } as Token,
        disabled: false,
        pnl: each.token?.pnl,
        source: {
          id: 'binance',
          title: 'Binance (Future)',
        },
      })) ?? []),
  ]
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
      Mochi: balances.filter((b) => b.source.id === 'mochi'),
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
  const selectedIndex = sortedChains.findIndex(
    (chain) => chain === selectedChain,
  )
  const dropdownWidth = sortedChains.length > displayChainAmount ? 40 : 0
  const tabAmount = Math.min(displayChainAmount, sortedChains.length)
  const tabWidth =
    tabsWidth && displayChainAmount > 1
      ? Math.min(
          (tabsWidth - 120 - dropdownWidth) / (tabAmount - 1),
          tabsWidth / tabAmount,
        )
      : 0
  const selectedTabWidth = Math.max(tabWidth, 120)
  const translateX = selectedIndex * tabWidth

  const previousSelectedIndex = usePrevious(selectedIndex)
  const slideTabDirection =
    selectedIndex < previousSelectedIndex ? 'left' : 'right'

  useEffect(() => {
    const element = tabElement.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      setTabsWidth(element.clientWidth)
      const amount = Math.floor((element.clientWidth - 120) / 40)
      setDisplayChainAmount(amount)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Card className="pb-3 space-y-4 shadow-input !bg-background-level1">
      <div className="flex items-center space-x-2">
        <Avatar src={me?.avatar || ''} size="xl" />
        <div className="overflow-hidden flex-1 space-y-1">
          <Typography level="h6" noWrap fontWeight="md">
            {me?.profile_name}
          </Typography>
          <Badge appearance="neutral" className="w-fit">
            <Typography level="p6">Rank #{info?.rank || 0}</Typography>
          </Badge>
        </div>
        <div className="text-right">
          <Typography level="h5">
            {isFetchingBalance ? '$0.00' : utils.formatUsdDigit(total)}
          </Typography>
          <div className="flex justify-end items-center">
            <ValueChange trend={pnl.startsWith('-') ? 'down' : 'up'}>
              <ValueChangeIndicator />
              <Typography
                level="h8"
                color={pnl.startsWith('-') ? 'danger' : 'success'}
              >
                {utils.formatPercentDigit(Number.isNaN(Number(pnl)) ? 0 : pnl)}
              </Typography>
            </ValueChange>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="soft"
          color="primary"
          className="border border-primary-outline-border"
        >
          <ArrowUpSquareSolid className="w-4 h-4" />
          Send
        </Button>
        <Button
          variant="soft"
          color="primary"
          className="border border-primary-outline-border"
        >
          <ArrowDownSquareSolid className="w-4 h-4" />
          Receive
        </Button>
      </div>
      <Tabs value={selectedChain} onValueChange={setSelectedChain}>
        <TabList
          className="flex relative items-center -mx-4 border-t border-b border-divider"
          ref={tabElement}
        >
          <div
            className="absolute top-0 left-0 h-full transition-transform duration-500 bg-background-hover"
            style={{
              transform: `translateX(${translateX}px)`,
              width: selectedTabWidth,
            }}
          />
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
                wrapperClassName="pl-0 pr-0 border-r-0"
                className={clsx(
                  'h-10 outline-none rounded-none transition duration-500 z-10 hover:!opacity-100',
                  {
                    'w-[120px]': isSelected,
                  },
                )}
                onClick={() => setSelectedChain(chain)}
              >
                <div>{avatar}</div>
                {isSelected && (
                  <Typography
                    level="h8"
                    className="duration-500 translate-x-1 animate-in fade-in-0 slide-in-from-left-2"
                  >
                    {name.split(' ')[0]}
                  </Typography>
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
        <div className="overflow-hidden relative">
          {Object.entries(chains).map(([chain, data]) => (
            <TabContent
              key={chain}
              value={chain}
              className={clsx(
                'data-[state=active]:animate-in data-[state=active]:duration-500 data-[state=active]:fade-in',
                'data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:animate-out data-[state=inactive]:duration-500 data-[state=inactive]:fade-out',

                {
                  'data-[state=active]:slide-in-from-left data-[state=inactive]:slide-out-to-right':
                    slideTabDirection === 'left' &&
                    (!!selectedIndex || !!previousSelectedIndex),
                  'data-[state=active]:slide-in-from-right data-[state=inactive]:slide-out-to-left':
                    slideTabDirection === 'right' &&
                    (!!selectedIndex || !!previousSelectedIndex),
                },
              )}
            >
              <TokenTableList
                isLoading={!wallets.length && isFetchingWallets}
                data={data}
                hideLastBorder
                onRow={(record) => ({
                  onClick: () => !record.disabled && setSelectedAsset(record),
                })}
              />
            </TabContent>
          ))}
        </div>
      </Tabs>
    </Card>
  )
}
