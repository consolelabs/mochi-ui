import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    notFound: true,
  }
}

export default function Index() {
  return null
}
