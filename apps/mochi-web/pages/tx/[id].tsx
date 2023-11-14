import { GetServerSideProps } from 'next'
import { Layout } from '~app/layout'
import { HOME_URL, MOCHI_PAY_API } from '~envs'
import { SEO } from '~app/layout/seo'
import { truncate } from '@dwarvesf/react-utils'
import Receipt, { transformData } from '~cpn/Receipt'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query

    if (!id) {
      return {
        props: {},
      }
    }

    const res = await fetch(`${MOCHI_PAY_API}/transfer/${id}`)
    const json = await res.json()
    const transfer = json.data

    if (!transfer) {
      return {
        notFound: true,
      }
    }

    const { data, ogDataOnly } = await transformData(transfer)

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

export default function Transfer({ data }: Props) {
  return (
    <Layout>
      <SEO
        title={
          data.template ? data.template.title : `Tip from ${data.from} - Mochi`
        }
        description={`${data.from} paid ${
          Array.isArray(data.to) ? `${data.to.length} people` : data.to
        } ${data.amountDisplay} ${data.unitCurrency}${
          data.message
            ? ` with message: "${truncate(data.message, 30, false)}"`
            : ''
        }`}
        url={`${HOME_URL}/transfer/${data.external_id}`}
      />
      <div className="flex items-center p-10 my-auto">
        <Receipt id={data.external_id} />
      </div>
    </Layout>
  )
}
