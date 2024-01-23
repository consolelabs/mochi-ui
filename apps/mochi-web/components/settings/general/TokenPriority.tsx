import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from '@mochi-ui/core'
import React from 'react'
import { TokenPriorityModal } from './TokenPriorityModal'

export const TokenPriority = () => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <SectionHeader
        wrapActionsOnMobile={false}
        className="!grid-cols-[1fr,auto]"
      >
        <SectionHeaderTitle className="font-normal">
          Default token priority
        </SectionHeaderTitle>
        <SectionHeaderDescription>
          Set up the order of your tokens for payment.
        </SectionHeaderDescription>
        <SectionHeaderActions>
          <TokenPriorityModal />
        </SectionHeaderActions>
      </SectionHeader>
    </div>
  )
}
