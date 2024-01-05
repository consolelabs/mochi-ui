import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Typography,
} from '@mochi-ui/core'
import { Tx } from './types'
import { openTx } from './utils'

export type TransactionTxGroupProps = {
  tx: Tx
}

export const TransactionTxGroup = (props: TransactionTxGroupProps) => {
  const { tx } = props

  const allTxs = [tx, ...tx.otherTxs]

  if (allTxs.length === 1) {
    return (
      <Typography
        level="p6"
        className="font-mono py-0.5 px-2 border border-divider bg-background-level1 rounded-full"
      >
        {tx.code.slice(0, 9)}
      </Typography>
    )
  }

  return (
    <Select
      value={undefined}
      onChange={(code) => {
        const tx = allTxs.find((tx) => tx.code === code)

        if (tx) {
          openTx(tx)
        }
      }}
    >
      <SelectTrigger className="!rounded-full !bg-background-level1 border !border-divider !py-0.5 !px-2 h-[unset] !font-normal">
        <Typography level="p6" className="font-mono">
          {tx.code.slice(0, 9)}
        </Typography>
      </SelectTrigger>
      <SelectContent>
        {allTxs.map((tx) => (
          <SelectItem key={tx.code} value={tx.code} onClick={() => alert('Hi')}>
            <Typography level="p5" className="font-mono">
              {tx.code.slice(0, 9)}
            </Typography>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
