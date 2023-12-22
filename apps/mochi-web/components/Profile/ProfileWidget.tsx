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
import { ChevronDownLine, SettingsLine, UnionSolid } from '@mochi-ui/icons'
import { useProfileStore, useWalletStore } from '~store'
import { useFetchProfileGlobalInfo } from '~hooks/profile/useFetchProfileGlobalInfo'
import { BalanceWithSource, TokenTableList } from '~cpn/base/token-table-list'
import { Fragment, useState } from 'react'
import clsx from 'clsx'

export const ProfileWidget = () => {
  const { me } = useProfileStore()
  const { data: globalInfo } = useFetchProfileGlobalInfo(me?.id)
  const { wallets, isFetching } = useWalletStore()
  const [_selectedChain, setSelectedChain] = useState('')

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
    { ALL: balances },
  )
  const sortedChains = Object.keys(chains)
    .map((chain, index) => ({
      chain,
      index: index < 3 ? 4 - index : Number(chain === _selectedChain),
    }))
    .sort((a, b) => b.index - a.index)
    .map(({ chain }) => chain)
  const selectedChain = _selectedChain || sortedChains[0]
  const selectedIndex = sortedChains.indexOf(selectedChain)

  return (
    <Card className="pb-5 space-y-4 shadow-input">
      <div className="flex space-x-4">
        <Avatar src={me?.avatar || ''} size="xl" />
        <div className="overflow-hidden flex-1 mt-2 space-y-2">
          <Typography level="p2" fontWeight="md" noWrap>
            {me?.profile_name}
          </Typography>
          <div className="flex flex-wrap gap-1">
            {globalInfo?.roles?.map((role) => (
              <Badge
                key={role}
                label={
                  <Typography level="h8" color="primary">
                    {role}
                  </Typography>
                }
              />
            ))}
            <Badge
              appearance="white"
              label={
                <Typography level="h8">
                  Lvl. {globalInfo?.level || 0}
                </Typography>
              }
            />
            <Badge
              appearance="white"
              label={
                <Typography level="h8">
                  Rank #{globalInfo?.rank || 0}
                </Typography>
              }
            />
          </div>
        </div>
        <div className="flex mt-2 space-x-2">
          <IconButton
            variant="link"
            color="white"
            className="p-1.5"
            label="QR Code"
          >
            <UnionSolid className="w-5 h-5" />
          </IconButton>
          <IconButton
            variant="link"
            color="white"
            className="p-1.5"
            label="Setting"
          >
            <SettingsLine className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
      <div>
        <Typography level="p5" color="textSecondary">
          Total Value
        </Typography>
        <Typography level="h5" fontWeight="lg">
          $24,562,456
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button>Buy</Button>
        <Button variant="outline">Deposit</Button>
        <Button variant="outline">Withdraw</Button>
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
              {selectedIndex !== index && selectedIndex !== index + 1 && (
                <div className="h-3 border-r border-neutral-solid-focus" />
              )}
            </Fragment>
          ))}
          {sortedChains.length > 4 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center w-7 h-7 rounded-md text-text-secondary hover:bg-background-popup">
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
        wrapperClassName="overflow-y-auto h-96"
        className={!chains[selectedChain].length ? 'h-full' : ''}
        isLoading={isFetching || !wallets.length}
        data={chains[selectedChain]}
        hideLastBorder
      />
      <div className="text-center">
        <Typography level="p6" color="textSecondary">
          Powered by Console Labs
        </Typography>
      </div>
    </Card>
  )
}
