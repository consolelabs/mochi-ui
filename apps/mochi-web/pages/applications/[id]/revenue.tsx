import { ReactElement } from 'react'
import { PageHeader } from '@mochi-ui/core'
import AuthenticatedLayout from '../../../components/auth-layout'

const RevenuePage = () => {
  return null
}

RevenuePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout pageHeader={<PageHeader title="Revenue" />}>
      {page}
    </AuthenticatedLayout>
  )
}

export default RevenuePage
