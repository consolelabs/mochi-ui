import { Avatar, AvatarGroup, Tooltip, Typography } from '@mochi-ui/core'
import { useMemo } from 'react'
import { Tx } from './types'
import { buildAddressString, buildPlatformString } from './utils'

export type TransactionIssuedByProps = {
  tx: Tx
}

export const TransactionIssuedBy = (props: TransactionIssuedByProps) => {
  const { tx } = props

  const allTxs = useMemo(() => [tx, ...tx.otherTxs], [tx])
  const allAddresses = useMemo(
    () => Array.from(new Set(allTxs.map((tx) => tx.from.address))),
    [allTxs],
  )
  const allPlatforms = useMemo(
    () =>
      Array.from(new Set(allTxs.map((tx) => tx.from.platform))).filter(
        Boolean,
      ) as string[],
    [allTxs],
  )

  return (
    <div className="flex gap-3 items-center">
      <AvatarGroup>
        {allTxs
          // Dedupe by address
          .filter(
            (tx, index, self) =>
              self.findIndex((t) => t.from.address === tx.from.address) ===
              index,
          )
          .map((tx) => (
            <Avatar
              key={tx.code}
              src={tx.from.avatar}
              fallback={tx.from.address}
            />
          ))}
      </AvatarGroup>
      <div className="flex flex-col gap-1">
        <Tooltip
          content={
            <div className="flex flex-col gap-2">
              {allAddresses.map((address) => (
                <Typography key={address} level="p5" className="!font-normal">
                  {address}
                </Typography>
              ))}
            </div>
          }
        >
          <Typography level="p5" className="break-words truncate">
            {buildAddressString(allAddresses)}
          </Typography>
        </Tooltip>
        {allPlatforms.length > 0 && (
          <Tooltip
            content={
              <div className="flex flex-col gap-2">
                {allPlatforms.map((platform) => (
                  <Typography
                    key={platform}
                    level="p5"
                    className="!font-normal capitalize"
                  >
                    {platform}
                  </Typography>
                ))}
              </div>
            }
          >
            <Typography level="p6" className="!text-text-secondary capitalize">
              {buildPlatformString(allPlatforms)}
            </Typography>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
