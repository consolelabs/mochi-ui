import { Button } from '@mochi-ui/core'
import { Tx } from './types'

export type TransactionActionProps = {
  tx: Tx
}

export const TransactionAction = (props: TransactionActionProps) => {
  const { tx } = props

  switch (true) {
    case tx.action === 'payme' && tx.status !== 'success': {
      return <Button className="!shadow-none">Pay</Button>
    }
    case tx.action === 'paylink' && tx.status !== 'success': {
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
