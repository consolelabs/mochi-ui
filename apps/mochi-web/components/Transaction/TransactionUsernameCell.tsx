import { Avatar, Typography } from '@mochi-ui/core'
import { ModelProfileTransaction } from '~types/mochi-pay-schema'
import { truncateWallet } from '~utils/string'
import {
  arrangeTransactionProfile,
  type TransactionType,
  createTransactionMesssage,
  ActionType,
} from './utils'

export const TransactionUsernameCell = (props: ModelProfileTransaction) => {
  const {
    from_profile,
    other_profile,
    token,
    external_id,
    amount,
    type,
    action,
  } = props

  const { from, to } = arrangeTransactionProfile({
    profile: from_profile,
    otherProfile: other_profile,
    type: type as TransactionType,
  })

  return (
    <div className="flex gap-2 items-center">
      <Avatar src={from_profile?.avatar ?? ''} smallSrc="" />
      <div className="flex flex-col">
        <Typography level="p5">
          {createTransactionMesssage({
            type: type as TransactionType | undefined,
            action: action as ActionType | undefined,
            token,
            amount,
            from,
            to,
          })}
        </Typography>
        <Typography level="p6" color="textSecondary" fontWeight="sm">
          TxID: {truncateWallet(external_id)}
        </Typography>
      </div>
    </div>
  )
}
