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
  TabList,
  TabTrigger,
  Tabs,
  Typography,
} from '@mochi-ui/core'
import { utils } from '@consolelabs/mochi-ui'
import {
  ArrowDownSquareSolid,
  ArrowUpSquareSolid,
  ArrowDownLine,
  ArrowUpLine,
  ChartSolid,
  ChevronDownLine,
} from '@mochi-ui/icons'
import { useMochiWidget, useProfileStore, useWalletStore } from '~store'
import { useFetchProfileGlobalInfo } from '~hooks/profile/useFetchProfileGlobalInfo'
import { BalanceWithSource, TokenTableList } from '~cpn/TokenTableList'
import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { useShallow } from 'zustand/react/shallow'

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
        'ALL'
      return {
        ...prev,
        [key]: [...(prev[key] || []), curr],
      }
    },
    {
      ALL: balances,
      MOCHI: wallets.flatMap((w) =>
        w.id === 'mochi'
          ? w.balances.map((b) => ({
              ...b,
              source: { id: w.id, title: w.title },
            }))
          : [],
      ),
    },
  )
  const sortedChains = Object.keys(chains)
    .map((chain, index) => ({
      chain,
      index: index < 3 ? 4 - index : Number(chain === _selectedChain),
    }))
    .sort((a, b) => {
      return b.index - a.index
    })
    .map(({ chain }) => chain)
  const selectedChain = _selectedChain || sortedChains[0]
  const selectedIndex = sortedChains.indexOf(selectedChain)

  return (
    <Card className="pb-3 space-y-4 shadow-input">
      <div className="flex items-center space-x-2">
        <Avatar src={me?.avatar || ''} size="lg" />
        <div className="flex-1 space-y-1 overflow-hidden">
          <Typography level="h6" noWrap>
            {me?.profile_name}
          </Typography>
          <Badge
            appearance="white"
            className="w-fit"
            label={<Typography level="h8">Rank #{info?.rank || 0}</Typography>}
          />
        </div>
        <div className="text-right">
          <Typography level="h5">
            $
            {utils.formatDigit({
              value: total,
              fractionDigits: total >= 100 ? 0 : 2,
            })}
          </Typography>
          <div className="flex items-center justify-end">
            {pnl.startsWith('-') ? (
              <ArrowDownLine className="w-4 h-4 text-danger-solid" />
            ) : (
              <ArrowUpLine className="w-4 h-4 text-success-solid" />
            )}
            <Typography
              level="h8"
              color={pnl.startsWith('-') ? 'danger' : 'success'}
              className="ml-1 mr-2"
            >
              {utils.formatPercentDigit(Number.isNaN(Number(pnl)) ? 0 : pnl)}
            </Typography>
            <IconButton
              color="white"
              label="chart"
              className="px-1 py-1"
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
        <TabList className="flex items-center p-0.5 rounded-lg bg-neutral-outline-active">
          {sortedChains.slice(0, 4).map((chain, index) => (
            <Fragment key={chain}>
              <TabTrigger
                value={chain}
                wrapperClassName="pl-0 pr-0"
                className={clsx('rounded-md', {
                  'bg-background-popup': chain === selectedChain,
                })}
                onClick={() => setSelectedChain(chain)}
              >
                {chain}
              </TabTrigger>
              {selectedIndex !== index &&
                selectedIndex !== index + 1 &&
                index < sortedChains.length - 1 &&
                index < 3 && (
                  <div className="h-3 border-r border-neutral-solid-focus" />
                )}
            </Fragment>
          ))}
          {sortedChains.length > 4 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center rounded-md w-7 h-7 text-text-secondary hover:bg-background-popup">
                <ChevronDownLine width={20} height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortedChains.slice(4).map((chain) => (
                  <DropdownMenuItem
                    key={chain}
                    wrapperClassName="py-0.5"
                    onClick={() => setSelectedChain(chain)}
                  >
                    {chain}
                  </DropdownMenuItem>
                ))}
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
      <div className="text-center">
        <Typography level="p6" color="textSecondary">
          Powered by Console Labs
        </Typography>
      </div>
    </Card>
  )
}
