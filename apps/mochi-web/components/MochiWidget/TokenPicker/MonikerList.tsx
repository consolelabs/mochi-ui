import { API } from '~constants/api'
import { useMemo } from 'react'
import useSWR from 'swr'
import { SectionList } from '@consolelabs/core'
import { sectionFormatter } from './utils'
import { MonikerItem } from './MonikerItem'
import { EmptyList } from './EmptyList'
import Skeleton from './Skeleton'
import { Moniker } from './type'

interface Props {
  searchTerm: string
  onSelect?: (item: Moniker) => void
}

function getFilterMonikerNameFunc(searchTerm: string) {
  return function filterMonikerName(monikerAsset: Moniker) {
    return monikerAsset.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

export const MonikerList = (props: Props) => {
  const { searchTerm, onSelect } = props

  const { data = [], isLoading } = useSWR<Moniker[]>(
    ['moniker-list'],
    async () => {
      const data = await API.MOCHI.get('/config-defi/monikers/default').json(
        (r) => r.data,
      )
      return data.map((d: any) => ({
        type: 'moniker',
        group: 'Default',
        id: d.moniker.id,
        name: d.moniker.moniker,
        asset_balance: d.moniker.amount,
        token_amount: d.value,
        token: {
          price: d.moniker.token.token_price,
          symbol: d.moniker.token.token_symbol,
          chain_id: d.moniker.token.chain_id,
        },
      }))
    },
  )

  const filteredMonikers = useMemo(() => {
    const filteredData = data.filter(getFilterMonikerNameFunc(searchTerm))
    return sectionFormatter(filteredData, 'group')
  }, [searchTerm, data])

  return (
    <SectionList
      sections={filteredMonikers}
      renderItem={(item) =>
        isLoading ? (
          <Skeleton />
        ) : (
          <MonikerItem
            key={`moniker-list-${item.id}`}
            item={item}
            onSelect={onSelect}
          />
        )
      }
      renderSectionHeader={(section) => (
        <label className="font-bold text-[0.625rem] uppercase text-[#ADACAA]">
          {section.title}
        </label>
      )}
      SectionEmpty={isLoading ? <Skeleton /> : <EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
