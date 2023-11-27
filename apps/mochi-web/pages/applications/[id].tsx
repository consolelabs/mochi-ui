import { ReactElement } from 'react'
import AuthenticatedLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { PageHeader } from '@consolelabs/core'

const App: NextPageWithLayout = () => {
  return (
    <PageHeader title="App Detail" description="In developmnent progress..." />
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default App
