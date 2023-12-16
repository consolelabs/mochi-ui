import { GetServerSideProps } from 'next'
import { API, GET_PATHS } from '~constants/api'
import { DashboardBody } from '~cpn/DashboardBody'
import { NextPageWithLayout } from '~pages/_app'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params ?? {}
  if (!id)
    return {
      notFound: true,
    }
  await API.MOCHI.get(GET_PATHS.GUILD(id as string)).json((r) => r.data)

  return {
    props: { id },
  }
}

function Home({ id }: { id: string }) {
  return <div>{id}</div>
}

const Server: NextPageWithLayout<{ id: string }> = (props) => {
  return (
    <DashboardBody>
      <Home {...props} />
    </DashboardBody>
  )
}

export default Server
