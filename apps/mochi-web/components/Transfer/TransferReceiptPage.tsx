import { Layout } from '~app/layout'
import Receipt from '~cpn/Receipt'
import { robotoFont } from '~utils/next-font'

interface Props {
  data: any
}

export function TransferReceiptPage({ data = {} }: Props) {
  return (
    <Layout noFooter className="bg-white lg:bg-white-pure">
      <style jsx global>{`
        #receipt-body {
          font-family: ${robotoFont.style.fontFamily};
        }
      `}</style>
      <div className="flex relative m-auto h-full lg:m-0">
        <img
          className="hidden lg:block object-cover object-[45%_center] sticky top-0 -mt-14 w-1/2 h-screen brightness-50"
          src="/to-the-moon.png"
          alt=""
        />
        <div className="my-auto lg:w-1/2">
          <Receipt data={data} />
        </div>
      </div>
    </Layout>
  )
}

export default TransferReceiptPage
