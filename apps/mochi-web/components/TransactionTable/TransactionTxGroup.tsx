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
        className="py-0.5 px-2 font-mono rounded-full border border-background-level3 bg-background-level1 !h-[20px] !w-[53px] flex items-center"
      >
        {tx.code.slice(0, 5)}
      </Typography>
    )
  }

  const uniqueTxCodes = Array.from(new Set(allTxs.map((tx) => tx.code)))

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
      <SelectTrigger className="!rounded-full !bg-background-level1 border !border-background-level3 !py-0.5 !px-2 !h-[20px] !font-normal !w-[53px] justify-between gap-x-0">
        <Typography level="p6" className="font-mono">
          {tx.code.slice(0, 2)}
        </Typography>
      </SelectTrigger>
      <SelectContent>
        {uniqueTxCodes.map((code) => (
          <SelectItem key={code} value={code} onClick={() => alert('Hi')}>
            <Typography level="p5" className="font-mono">
              {code.slice(0, 9)}
            </Typography>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
