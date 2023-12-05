import { ReactElement } from 'react'
import AuthenticatedLayout from '../../../components/auth-layout'

const RevenuePage = () => {
  return <>Revenue</>
}

RevenuePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default RevenuePage
