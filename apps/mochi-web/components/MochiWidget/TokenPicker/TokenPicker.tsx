import clsx from 'clsx'
import Image from 'next/image'
import {
  ChevronDownLine,
  MagnifierLine,
  DollarSquareSolid,
  TeaSolid,
} from '@mochi-ui/icons'
import { useShallow } from 'zustand/react/shallow'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TextFieldInput,
  TextFieldDecorator,
  TextFieldRoot,
  Tabs,
  TabList,
  TabTrigger,
  Typography,
  TabContent,
} from '@mochi-ui/core'
import { BottomSheet, useBottomSheetContext } from '~cpn/BottomSheet'
import { BalanceWithSource, TokenTableList } from '~cpn/TokenTableList'
import { MonikerTableList } from '~cpn/MonikerTableList'
import { Balance, useWalletStore } from '~store'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { Moniker } from './type'
import { MonikerIcons, isToken } from './utils'
import { DEFAULT_BALANCE } from './default-data'
import sortOrder from './sort-order.json'

const TokenTabs = [
  {
    key: 1,
    value: 'token',
    Icon: DollarSquareSolid,
  },
  {
    key: 2,
    value: 'moniker',
    Icon: TeaSolid,
  },
]

interface TokenPickerProps {
  selectedAsset: Balance | Moniker | null
  onSelect?: (item: BalanceWithSource | Moniker | null) => void
}

interface TokenButtonProps {
  isToken?: boolean
  name?: string
  icon: string
  isOpenSelector?: boolean
}

const TokenButton = (props: TokenButtonProps) => {
  return (
    <div className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg border bg-primary-soft border-primary-outline-border">
      {props.isToken ? (
        <span className="text-base shrink-0" role="img">
          <Image
            width={22}
            height={22}
            alt={`${props.name} icon`}
            className="object-contain rounded-full shrink-0"
            src={props.icon}
          />
        </span>
      ) : (
        <span className="text-base w-[22px] h-[22px]" role="img">
          {MonikerIcons.get(props.name ?? '')}
        </span>
      )}
      <span className="text-sm font-medium">{props.name}</span>
      <ChevronDownLine
        className={clsx(
          'shrink-0 transition w-4 h-4 text-primary-soft-fg opacity-80',
          {
            'rotate-180': props.isOpenSelector,
          },
        )}
      />
    </div>
  )
}

function getFilterTokenNameFunc(searchTerm: string) {
  return function filterTokenName(bal: BalanceWithSource) {
    const name = bal.token?.name?.toLowerCase()
    const symbol = bal.token?.symbol?.toLowerCase()

    return (
      name.includes(searchTerm.toLowerCase()) ||
      symbol.includes(searchTerm.toLowerCase())
    )
  }
}

export const TokenPicker: React.FC<TokenPickerProps> = ({
  selectedAsset,
  onSelect,
}) => {
  const [selectedTab, setSelectedTab] = useState('token')
  const { isLoggedIn: authorized } = useLoginWidget()
  const { setOpenSheets } = useBottomSheetContext()
  const { isFetchingWallets, wallets } = useWalletStore(
    useShallow((s) => ({
      isFetchingWallets: s.isFetching,
      wallets: s.wallets,
    })),
  )
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  /* const filteredTokens = useMemo<Balance[]>( */
  /*   () => tokenBalances.filter(getFilterTokenNameFunc(searchTerm)), */
  /*   [searchTerm, tokenBalances], */
  /* ) */
  const isTokenSelected = isToken(selectedAsset)

  const balancesWithSource = useMemo(() => {
    return wallets.flatMap((w) =>
      w.balances.map((b) => ({
        ...b,
        source: {
          id: w.id,
          title: w.title,
        },
      })),
    )
  }, [wallets])

  const balancesSorted = useMemo(() => {
    return balancesWithSource.sort((a, b) => {
      const indexA = sortOrder.findIndex((symbol) => symbol === a.token.symbol)
      const indexB = sortOrder.findIndex((symbol) => symbol === b.token.symbol)

      if (indexA === -1) return 1
      if (indexB === -1) return -1

      if (indexA > indexB) return 1
      if (indexA < indexB) return -1
      return 0
    })
  }, [balancesWithSource])

  const filteredTokens = useMemo(() => {
    return balancesSorted.filter(getFilterTokenNameFunc(searchTerm))
  }, [balancesSorted, searchTerm])

  const onClose = useCallback(() => {
    setOpenSheets([])
  }, [setOpenSheets])

  const handleTokenSelect = useCallback(
    (asset: BalanceWithSource | null) => {
      setSearchTerm('')
      setIsOpenSelector(false)
      onSelect?.(asset)
      onClose()
    },
    [onClose, onSelect],
  )

  function handleMonikerSelect(asset: Moniker) {
    setSearchTerm('')
    setIsOpenSelector(false)
    onSelect?.(asset)
    onClose()
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (!authorized || !Array.isArray(balancesSorted)) return
    if (balancesSorted.length) {
      if (!selectedAsset) {
        handleTokenSelect(balancesSorted[0])
      }
    } else {
      handleTokenSelect(null)
    }
  }, [authorized, balancesSorted, handleTokenSelect, selectedAsset])

  return (
    <BottomSheet
      name="TokenPicker"
      title={authorized ? 'Choose token' : ''}
      focusNthChild={0}
      trigger={
        <button tabIndex={-1} className="relative outline-none">
          <input
            tabIndex={-1}
            readOnly
            className="absolute top-0 left-0 w-full h-full bg-transparent border-0 cursor-pointer outline-none"
          />
          <TokenButton
            isToken={isTokenSelected}
            name={
              isTokenSelected
                ? selectedAsset?.token?.symbol ?? DEFAULT_BALANCE.token.symbol
                : selectedAsset?.name
            }
            icon={selectedAsset?.token.icon ?? DEFAULT_BALANCE.token.icon}
            isOpenSelector={isOpenSelector}
          />
        </button>
      }
    >
      <div className="flex flex-col flex-1 w-full min-h-0">
        <TextFieldRoot className="flex-shrink-0 mt-1">
          <TextFieldDecorator>
            <MagnifierLine className="w-5 h-5 text-gray-500" />
          </TextFieldDecorator>
          <TextFieldInput
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </TextFieldRoot>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="flex flex-col mt-3 min-h-0"
        >
          <TabList className="flex -mx-3">
            {TokenTabs.map((t) => {
              const isSelected = selectedTab === t.value
              return (
                <TabTrigger
                  key={t.key}
                  value={t.value}
                  onClick={() => setSelectedTab(t.value)}
                  wrapperClassName="!p-0"
                  variant="solid"
                  className={clsx(
                    'flex flex-1 justify-center !px-0 rounded-none border-t border-b border-divider h-10',
                    {
                      'bg-background-level2': isSelected,
                    },
                  )}
                >
                  <t.Icon
                    className={clsx('w-5 h-5', {
                      'text-neutral-800': isSelected,
                      'text-neutral-500': !isSelected,
                    })}
                  />
                  <Typography
                    color={isSelected ? 'textPrimary' : 'textSecondary'}
                    className="capitalize"
                    level="p5"
                  >
                    {t.value}
                  </Typography>
                </TabTrigger>
              )
            })}
          </TabList>
          <TabContent value="token" className="flex flex-col gap-2 min-h-0">
            <TokenTableList
              isLoading={isFetchingWallets}
              data={filteredTokens}
              hideLastBorder
              onRow={(record) => {
                return {
                  onClick: () => !record.disabled && handleTokenSelect(record),
                }
              }}
            />
            <span className="mt-auto text-xs text-text-disabled">
              Only supported tokens are shown
            </span>
          </TabContent>
          <TabContent value="moniker" className="flex flex-col gap-2 min-h-0">
            <MonikerTableList
              data={balancesWithSource}
              searchTerm={searchTerm}
              onRow={(record) => {
                return {
                  onClick: () =>
                    !record.disabled && handleMonikerSelect(record),
                }
              }}
            />
          </TabContent>
        </Tabs>
      </div>
    </BottomSheet>
  )
}
