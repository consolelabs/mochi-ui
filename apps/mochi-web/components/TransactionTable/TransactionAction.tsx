import { Button } from '@mochi-ui/core'
import { Tx } from './types'

export type TransactionActionProps = {
  tx: Tx
}

export const TransactionAction = (props: TransactionActionProps) => {
  const { tx } = props

  switch (tx.action) {
    case 'payme': {
      return <Button className="!shadow-none">Pay</Button>
    }
    case 'paylink': {
      return (
        <Button color="success" className="!shadow-none">
          Claim
        </Button>
      )
    }
    default: {
      return (
        <Button variant="outline" className="border-none !shadow-none">
          View
        </Button>
      )
    }
  }
}
