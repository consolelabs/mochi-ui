import { Spinner } from '@mochi-ui/icons'
import useSWR from 'swr'
import { API } from '~constants/api'
import { PayLink, PayMe } from '~cpn/PayRequest'
import { PayRequest } from '~cpn/PayRequest/type'
import { transformData as transformPayRequestData } from '~cpn/PayRequest/utils'
import Receipt from '~cpn/Receipt'
import type { Tx } from '~cpn/TransactionTable'
import { transformData as transformReceiptData } from '~cpn/Receipt/utils'

export type TransactionPeekingCardProps = {
  tx: Tx
}

export const TransactionPeekingCard = (props: TransactionPeekingCardProps) => {
  const { tx } = props

  const { data, isLoading } = useSWR(['tx-peeking-card', tx.code], async () => {
    switch (tx.action) {
      case 'payme':
      case 'paylink': {
        return API.MOCHI_PAY.get(`/pay-requests/${tx.paycode}`)
          .setTimeout(2000)
          .fetchError(() => null)
          .json((r) => r.data)
          .then(transformPayRequestData)
      }
      default: {
        return API.MOCHI_PAY.get(`/transfer/${tx.code}`)
          .fetchError(() => null)
          .json((r: any) => r.data)
          .then(transformReceiptData)
      }
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-16 h-16 shadow bg-white-pure">
        <Spinner />
      </div>
    )
  }

  switch (tx.action) {
    case 'payme': {
      return <PayMe data={data as PayRequest} variant="peeking" />
    }
    case 'paylink': {
      return <PayLink data={data as PayRequest} variant="peeking" />
    }
    default: {
      return <Receipt data={data} variant="peeking" />
    }
  }
}
