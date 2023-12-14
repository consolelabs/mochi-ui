import { GetServerSideProps } from 'next'
import { Layout } from '~app/layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import { truncate } from '@dwarvesf/react-utils'
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
    <Layout>
      <style jsx global>{`
        #receipt-body {
          font-family: ${robotoFont.style.fontFamily};
        }
      `}</style>
      <SEO
        title={
          data.data.template
            ? data.data.template.title
            : `Tip from ${data.data.from} - Mochi`
        }
        image={`${HOME_URL}/api/transfer-og?data=${encodeURIComponent(
          JSON.stringify(ogData),
        )}`}
        description={`${data.data.from} paid ${
          Array.isArray(data.data.to)
            ? `${data.data.to.length} people`
            : data.data.to
        } ${data.amountDisplay} ${data.unitCurrency}${
          data.message
            ? ` with message: "${truncate(data.message, 30, false)}"`
            : ''
        }`}
        url={`${HOME_URL}/transfer/${data.data.external_id}`}
      />
      <div className="flex items-center p-10 my-auto">
        <Receipt data={data} />
      </div>
    </Layout>
  )
}

Transfer.layoutType = 'landing'
