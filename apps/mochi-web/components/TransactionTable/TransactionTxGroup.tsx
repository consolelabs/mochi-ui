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
        className="py-0.5 px-2 font-mono rounded-full border border-divider bg-background-level1 h-[20px] w-[80px]"
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
      <SelectTrigger className="!rounded-full !bg-background-level1 border !border-divider !py-0.5 !px-2 h-[20px] !font-normal w-[80px] justify-between gap-x-0">
        <Typography level="p6" className="font-mono">
          {tx.code.slice(0, 6)}
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
