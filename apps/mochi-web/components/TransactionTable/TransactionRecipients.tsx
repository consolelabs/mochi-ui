import { utils } from '@consolelabs/mochi-formatter'
import { Avatar, AvatarGroup, Typography } from '@mochi-ui/core'
import { Tx } from './types'

export type TransactionRecipientsProps = {
  tx: Tx
}

export const TransactionRecipients = (props: TransactionRecipientsProps) => {
  const { tx } = props

  const allTxs = [tx, ...tx.siblingTxs]

  return (
    <div className="flex gap-3 items-center">
      {allTxs.length === 1 ? (
        <Avatar
          smallSrc={tx.to.platformIcon}
          src={tx.to.avatar}
          fallback={tx.to.address}
        />
      ) : (
        <AvatarGroup size="sm">
          {allTxs.map((tx) => (
            <Avatar key={tx.code} src={tx.to.avatar} fallback={tx.to.address} />
          ))}
        </AvatarGroup>
      )}
      <div className="flex flex-col gap-1">
        <Typography level="p5" className="break-words truncate">
          {utils.string.formatAddressUsername(tx.to.address)}
        </Typography>
        {tx.to.platform && (
          <Typography level="p6" className="!text-text-secondary capitalize">
            {tx.to.platform}
          </Typography>
        )}
      </div>
    </div>
  )
}
