import emojiStrip from 'emoji-strip'
import { Avatar, AvatarGroup, Tooltip, Typography } from '@mochi-ui/core'
import { useMemo } from 'react'
import { utils } from '@consolelabs/mochi-formatter'
import { Tx } from './types'
import { buildAddressString } from './utils'

export type TransactionIssuedByProps = {
  tx: Tx
}

export const TransactionIssuedBy = (props: TransactionIssuedByProps) => {
  const { tx } = props

  const allTxs = useMemo(() => [tx, ...tx.otherTxs], [tx])
  const allAddresses = useMemo(
    () => Array.from(new Set(allTxs.map((tx) => emojiStrip(tx.from.address)))),
    [allTxs],
  )
  /* const allPlatforms = useMemo( */
  /*   () => */
  /*     Array.from(new Set(allTxs.map((tx) => tx.from.platform))).filter( */
  /*       Boolean, */
  /*     ) as string[], */
  /*   [allTxs], */
  /* ) */

  const uniqueAllTxs = allTxs.filter(
    (tx, index, self) =>
      self.findIndex((t) => t.from.address === tx.from.address) === index,
  )

  const text = (
    <Typography level="p5" className="break-words truncate">
      {buildAddressString(allAddresses)}
    </Typography>
  )

  const hasAddress =
    allAddresses.some((addr) => utils.address.isAddress(addr).valid) &&
    ['payme', 'deposit'].includes(tx.action)

  return (
    <div className="flex gap-3 items-center">
      <AvatarGroup size="sm">
        {uniqueAllTxs.map((tx) => (
          <Avatar
            size="sm"
            key={tx.code}
            src={tx.from.avatar}
            fallback={tx.from.address}
            {...(uniqueAllTxs.length > 1
              ? {}
              : { smallSrc: tx.from.platformIcon })}
          />
        ))}
      </AvatarGroup>
      <div className="flex flex-col gap-1">
        {allAddresses.length > 1 || hasAddress ? (
          <Tooltip
            content={
              <div className="flex flex-col gap-2">
                {allAddresses.map((address) => (
                  <Typography
                    key={address}
                    level="p5"
                    fontWeight="md"
                    className="!text-inherit"
                  >
                    {address}
                  </Typography>
                ))}
              </div>
            }
          >
            {text}
          </Tooltip>
        ) : (
          text
        )}
        {/* {allPlatforms.length > 0 && ( */}
        {/*   <Tooltip */}
        {/*     content={ */}
        {/*       <div className="flex flex-col gap-2"> */}
        {/*         {allPlatforms.map((platform) => ( */}
        {/*           <Typography */}
        {/*             key={platform} */}
        {/*             level="p5" */}
        {/*             className="!font-normal capitalize" */}
        {/*           > */}
        {/*             {platform} */}
        {/*           </Typography> */}
        {/*         ))} */}
        {/*       </div> */}
        {/*     } */}
        {/*   > */}
        {/*     <Typography level="p6" className="!text-text-secondary capitalize"> */}
        {/*       {buildPlatformString(allPlatforms)} */}
        {/*     </Typography> */}
        {/*   </Tooltip> */}
        {/* )} */}
      </div>
    </div>
  )
}
