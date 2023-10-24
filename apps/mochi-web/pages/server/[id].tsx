import { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'
import AuthenticatedLayout from '~components/auth-layout'
import { API, GET_PATHS } from '~constants/api'
import { NextPageWithLayout } from '~pages/_app'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params ?? {}
  if (!id)
    return {
      notFound: true,
    }
  const g = await API.MOCHI.get(GET_PATHS.GUILD(id as string)).json(
    (r) => r.data,
  )
  console.log(g)

  return {
    props: { id },
  }
}

function Home({ id }: { id: string }) {
  return <div>{id}</div>
}

const Server: NextPageWithLayout<{ id: string }> = (props) => {
  return <Home {...props} />
}

Server.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default Server
