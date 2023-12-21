import { DollarBubbleSolid } from '@mochi-ui/icons'
import { robotoFont } from '~utils/next-font'
import { isSSR } from '@dwarvesf/react-utils'
import Header from './Header'
import Footer from './Footer'
import UpperBody from './UpperBody'
import { PayRequest } from './type'
import LowerBody from './LowerBody'
import ShareButton from './ShareButton'
import PayButton from './PayButton'

export type Props = {
  data: PayRequest
}

export default function PayMe({ data }: Props) {
  return (
    <div className="flex flex-col gap-y-10 m-auto w-[300px] max-w-[300px]">
      <div className="flex-1 drop-shadow-xl">
        <style jsx global>{`
          #receipt-body {
            font-family: ${robotoFont.style.fontFamily};
          }
        `}</style>
        <div className="flex flex-col pb-10 rounded-t bg-white-pure jagged-bottom">
          <Header
            color="gray"
            title="Pay Me"
            url={`/pay/${data.code}`}
            Icon={DollarBubbleSolid}
          />
          <div className="flex flex-col p-6 pt-10 pb-0">
            <UpperBody
              author={data.profile?.name ?? 'User'}
              action={
                data.type === 'paylink'
                  ? 'create the pay link'
                  : `requests ${data.to?.name ?? 'someone'} pay`
              }
              avatarUrl={data.profile?.avatar}
              avatarPlatform={data.profile?.platform}
              amountTokenIcon={data.token.icon}
              amountUsd={data.usdAmountDisplay}
              amountSymbol={data.token.symbol}
              amountToken={data.amountDisplay}
            />
            <LowerBody data={data} />
            <Footer date={data.date} />
          </div>
        </div>
      </div>
      <div className="flex gap-x-2 justify-center">
        <ShareButton link={isSSR() ? '' : window.location.href} />
        <PayButton
          wallets={data.recipient_wallets}
          chain={data.token.chain.type}
          amount={data.amount}
          chainId={data.token.chain.chain_id}
          {...(data.token.native ? {} : { tokenAddress: data.token.address })}
        />
      </div>
    </div>
  )
}
