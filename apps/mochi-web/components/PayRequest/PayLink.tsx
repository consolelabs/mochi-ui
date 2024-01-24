import { LinkSquircledSolid } from '@mochi-ui/icons'
import { isSSR } from '@dwarvesf/react-utils'
import Header from './Header'
import UpperBody from './UpperBody'
import Footer from './Footer'
import { PayRequest } from './type'
import LowerBody from './LowerBody'
import ShareButton from './ShareButton'
import WithdrawButton from './WithdrawButton'

export type Props = {
  data: PayRequest
  variant?: 'default' | 'peeking'
}

export default function PayLink({ data, variant = 'default' }: Props) {
  return (
    <div className="gap-y-10 receipt-container">
      <div className="flex-1 drop-shadow-xl">
        <div className="flex flex-col pb-10 rounded-t bg-white-pure jagged-bottom">
          {variant === 'default' && (
            <Header
              color="blue"
              title="Pay Link"
              url={`/pay/${data.code}`}
              Icon={LinkSquircledSolid}
            />
          )}
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
        {!data.claim_tx && <WithdrawButton code={data.code} />}
      </div>
    </div>
  )
}
