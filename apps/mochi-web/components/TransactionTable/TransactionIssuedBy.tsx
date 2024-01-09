import { utils } from '@consolelabs/mochi-formatter'
import { Avatar, AvatarGroup, Typography } from '@mochi-ui/core'
import { Tx } from './types'

export type TransactionIssuedByProps = {
  tx: Tx
}

export const TransactionIssuedBy = (props: TransactionIssuedByProps) => {
  const { tx } = props

  const allTxs = [tx, ...tx.otherTxs]

  return (
    <div className="flex gap-3 items-center">
      {allTxs.length === 1 ? (
        <Avatar
          smallSrc={tx.from.platformIcon}
          src={tx.from.avatar}
          fallback={tx.from.address}
        />
      ) : (
        <AvatarGroup>
          {allTxs.map((tx) => (
            <Avatar
              key={tx.code}
              src={tx.from.avatar}
              fallback={tx.from.address}
            />
          ))}
        </AvatarGroup>
      )}
      <div className="flex flex-col gap-1">
        <Typography level="p5" className="break-words truncate">
          {utils.string.formatAddressUsername(tx.from.address)}
        </Typography>
        {tx.from.platform && (
          <Typography level="p6" className="!text-text-secondary capitalize">
            {tx.from.platform}
          </Typography>
        )}
      </div>
    </div>
  )
}
