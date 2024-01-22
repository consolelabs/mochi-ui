import { GetServerSideProps } from 'next'
import { Layout } from '~app/layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import Receipt from '~cpn/Receipt'
import { transformData } from '~cpn/Receipt/utils'
import { API } from '~constants/api'
import { robotoFont } from '~utils/next-font'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query

    if (!id) {
      return {
        props: {},
      }
    }

    const transfer = await API.MOCHI_PAY.get(`/transfer/${id}`)
      .setTimeout(2000)
      .fetchError(() => null)
      .json((r: any) => r.data)

    if (!transfer) {
      return {
        notFound: true,
      }
    }

    const { ogDataOnly, ...data } = await transformData(transfer)

    return {
      props: {
        data,
        ogData: ogDataOnly,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  data: any
  ogData: any
}

export default function Transfer({ data, ogData }: Props) {
  return (
    <Layout noFooter className="bg-white lg:bg-white-pure">
      <style jsx global>{`
        #receipt-body {
          font-family: ${robotoFont.style.fontFamily};
        }
      `}</style>
      <SEO
        title={ogData.title}
        image={`${HOME_URL}/api/transfer-og?data=${encodeURIComponent(
          JSON.stringify(ogData),
        )}`}
        description={ogData.description}
        url={`${HOME_URL}/transfer/${data.data.external_id}`}
      />
      <div className="flex relative m-auto h-[calc(100vh-56px)] lg:m-0">
        <img
          className="hidden lg:block object-cover object-[45%_center] w-1/2 h-full brightness-50"
          src="/to-the-moon.png"
          alt=""
        />
        <div className="flex overflow-auto justify-center items-center p-10 h-full lg:w-1/2">
          <Receipt data={data} />
        </div>
      </div>
    </Layout>
  )
}

Transfer.layoutType = 'landing'
