import { Button } from '@mochi-ui/core'
import { Tx } from './types'

export type TransactionActionProps = {
  tx: Tx
}

export const TransactionAction = (props: TransactionActionProps) => {
  const { tx } = props

  switch (tx.action) {
    case 'payme': {
      return <Button>Pay</Button>
    }
    case 'paylink': {
      return <Button color="success">Claim</Button>
    }
    default: {
      return (
        <Button variant="outline" className="border-none">
          View
        </Button>
      )
    }
  }
}
