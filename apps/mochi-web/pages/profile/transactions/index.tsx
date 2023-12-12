import {
  PageHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  useLoginWidget,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import { SEO } from '~app/layout/seo'
import AuthLayout from '~components/auth-layout'
import { ROUTES } from '~constants/routes'
import { platformFilters, typeFilters } from '~constants/transactions'
import { NextPageWithLayout } from '~pages/_app'

const AppPageHeader = () => {
  const { push } = useRouter()

  return (
    <PageHeader
      title="Transactions"
      onBack={() => push(ROUTES.MY_PROFILE)}
      actions={[
        <Select key="filter-types">
          <SelectTrigger className="border border-divider min-w-[130px] justify-between px-4">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent align="end">
            {typeFilters.map((type) => (
              <SelectItem key={type.key} value={type.key}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
        <Select key="filter-platforms">
          <SelectTrigger className="border border-divider min-w-[150px] justify-between px-4">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent align="end">
            {platformFilters.map((platform) => (
              <SelectItem key={platform.key} value={platform.key}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      ]}
    />
  )
}

const App: NextPageWithLayout = () => {
  const { profile } = useLoginWidget()

  return (
    <>
      <SEO title={`${profile?.profile_name}'s transactions`} />
      <AuthLayout pageHeader={<AppPageHeader />}>
        <Table columns={[]} data={[]} />
      </AuthLayout>
    </>
  )
}

export default App
