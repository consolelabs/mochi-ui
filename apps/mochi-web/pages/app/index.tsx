import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { Statistics } from '~cpn/app/Statistics'

const App: NextPageWithLayout = () => {
  return (
    <div>
      <Statistics />
    </div>
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default App
