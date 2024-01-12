import emojiStrip from 'emoji-strip'
import { Avatar, AvatarGroup, Tooltip, Typography } from '@mochi-ui/core'
import { useMemo } from 'react'
import { Tx } from './types'
import { buildAddressString } from './utils'

export type TransactionRecipientsProps = {
  tx: Tx
}

export const TransactionRecipients = (props: TransactionRecipientsProps) => {
  const { tx } = props

  const allTxs = useMemo(() => [tx, ...tx.siblingTxs], [tx])
  const allAddresses = useMemo(
    () => Array.from(new Set(allTxs.map((tx) => emojiStrip(tx.to.address)))),
    [allTxs],
  )
  /* const allPlatforms = useMemo( */
  /*   () => */
  /*     Array.from(new Set(allTxs.map((tx) => tx.to.platform))).filter( */
  /*       Boolean, */
  /*     ) as string[], */
  /*   [allTxs], */
  /* ) */

  const uniqueAllTxs = allTxs.filter(
    (tx, index, self) =>
      self.findIndex((t) => t.to.address === tx.to.address) === index,
  )

  const text = (
    <Typography level="p5" className="break-words truncate">
      {buildAddressString(allAddresses)}
    </Typography>
  )

  return (
    <div className="flex gap-3 items-center">
      <AvatarGroup size="sm">
        {uniqueAllTxs.map((tx) => (
          <Avatar
            size="sm"
            key={tx.code}
            src={tx.to.avatar}
            fallback={tx.to.address}
            {...(uniqueAllTxs.length > 1
              ? {}
              : { smallSrc: tx.to.platformIcon })}
          />
        ))}
      </AvatarGroup>
      <div className="flex flex-col gap-1">
        {allAddresses.length > 1 ? (
          <Tooltip
            content={
              <div className="flex flex-col gap-2">
                {allAddresses.map((address) => (
                  <Typography
                    key={address}
                    level="p5"
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
