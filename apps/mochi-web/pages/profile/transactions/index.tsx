import {
  PageHeader,
  PageHeaderActions,
  PageHeaderBackButton,
  PageHeaderTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useLoginWidget,
} from '@mochi-ui/core'
import Link from 'next/link'
import { SEO } from '~app/layout/seo'
import { ROUTES } from '~constants/routes'
import {
  TransactionActionType,
  TransactionPlatform,
  platformFilters,
  typeFilters,
} from '~constants/transactions'
import { NextPageWithLayout } from '~pages/_app'
import { useState } from 'react'
import { DashboardBody } from '~cpn/DashboardBody'
import Transaction from '~cpn/Transaction'

interface AppPageHeaderProps {
  filterType: TransactionActionType | 'all'
  filterPlatform: TransactionPlatform | 'all'
  onFilterTypeChange: (_: TransactionActionType | 'all') => void
  onFilterPlatformChange: (_: TransactionPlatform | 'all') => void
}

const AppPageHeader = (props: AppPageHeaderProps) => {
  const {
    filterType,
    filterPlatform,
    onFilterPlatformChange,
    onFilterTypeChange,
  } = props

  return (
    <PageHeader>
      <PageHeaderBackButton as={Link} href={ROUTES.MY_PROFILE} />
      <PageHeaderTitle>Transactions</PageHeaderTitle>
      <PageHeaderActions>
        <Select onChange={onFilterTypeChange} value={filterType}>
          <SelectTrigger className="justify-between px-4 !border-divider min-w-[130px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent align="end">
            {typeFilters.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onChange={onFilterPlatformChange} value={filterPlatform}>
          <SelectTrigger className="justify-between px-4 !border-divider min-w-[150px]">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent align="end">
            {platformFilters.map((platform) => (
              <SelectItem key={platform.value} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeaderActions>
    </PageHeader>
  )
}

const App: NextPageWithLayout = () => {
  const { profile } = useLoginWidget()

  const [filterPlatform, setFilterPlatform] = useState<
    TransactionPlatform | 'all'
  >('all')
  const [filterType, setFilterType] = useState<TransactionActionType | 'all'>(
    'all',
  )

  return (
    <>
      <SEO title={`${profile?.profile_name}'s transactions`} />
      <AppPageHeader
        filterType={filterType}
        filterPlatform={filterPlatform}
        onFilterPlatformChange={setFilterPlatform}
        onFilterTypeChange={setFilterType}
      />
      <DashboardBody>
        <Transaction filterType={filterType} filterPlatform={filterPlatform} />
      </DashboardBody>
    </>
  )
}

export default App
