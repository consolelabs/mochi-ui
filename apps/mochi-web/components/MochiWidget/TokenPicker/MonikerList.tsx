import { Balance, useWalletStore } from '~store'
import { api } from '~constants/mochi'
import { useMemo } from 'react'
import useSWR from 'swr'
import { SectionList } from '~cpn/base/section-list'
import Skeleton from '../Tip/Skeleton'
import { sectionFormatter } from './utils'
import { MonikerItem } from './MonikerItem'
import { EmptyList } from './EmptyList'
import { Moniker } from './type'

interface Props {
  searchTerm: string
  onSelect?: (item: Moniker) => void
  balances: Balance[]
  sectionHeaderHtmlFor?: string
}

function getFilterMonikerNameFunc(searchTerm: string) {
  return function filterMonikerName(monikerAsset: Moniker) {
    return monikerAsset.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

export const MonikerList = (props: Props) => {
  const { searchTerm, onSelect, sectionHeaderHtmlFor } = props
  const { wallets } = useWalletStore()

  const { data = [], isLoading } = useSWR<Moniker[], any, [string, Balance[]]>(
    ['moniker-list', props.balances],
    async ([_, balances]) => {
      const { ok, data } = await api.base.configDefi.getDefaultMonikers()
      if (!ok) return []

      const tokenIdsSet = new Set(balances.map((b) => b.token.id))

      return data.map((d) => {
        const wallet = wallets.find((w) =>
          w.balances.find(
            (b) =>
              b.token.id === d.moniker.token_id &&
              +b.token.chain_id === +d.moniker.token.chain_id,
          ),
        )

        const source = {
          id: wallet?.id,
          title: wallet?.title,
        }

        return {
          type: 'moniker',
          group: 'Default',
          id: d.moniker.id,
          name: d.moniker.moniker,
          asset_balance: d.moniker.amount,
          token_amount: d.value,
          disabled: !tokenIdsSet.has(d.moniker.token_id) && !wallet,
          source,
          token: {
            // @ts-ignore
            address: d.moniker.token.address,
            // @ts-ignore
            native: d.moniker.token.native,
            // @ts-ignore
            decimal: d.moniker.token.decimal,
            price: d.moniker.token.token_price,
            symbol: d.moniker.token.token_symbol,
            chain_id: d.moniker.token.chain_id,
          },
        }
      }) as Moniker[]
    },
  )

  const isUserHasUnusableMoniker = data.some((d) => d.disabled)

  const filteredMonikers = useMemo(() => {
    const filteredData = data.filter(getFilterMonikerNameFunc(searchTerm))
    return sectionFormatter(filteredData, 'group')
  }, [searchTerm, data])

  return (
    <>
      <SectionList
        sections={filteredMonikers}
        loading={isLoading}
        renderItem={(item) => (
          <MonikerItem
            key={`moniker-list-${item.id}`}
            item={item}
            onSelect={onSelect}
          />
        )}
        renderLoader={() => <Skeleton />}
        renderSectionHeader={(section) => (
          <label
            htmlFor={sectionHeaderHtmlFor}
            className="font-bold uppercase text-[0.625rem] text-neutral-500"
          >
            {section.title}
          </label>
        )}
        SectionEmpty={isLoading ? <Skeleton /> : <EmptyList />}
        rootClassName="w-full h-full"
      />
      {isUserHasUnusableMoniker ? (
        <span className="text-xs text-neutral-500">
          Unusable monikers (equivalent token has 0 amount) are disabled
        </span>
      ) : null}
    </>
  )
}
