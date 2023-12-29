import { Typography } from '@mochi-ui/core'
import { ArrowRightLine, DocumentOneSolid } from '@mochi-ui/icons'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import Transaction from '~cpn/Transaction'

export const TransactionSection = () => {
  return (
    <div className="flex flex-col rounded-lg border bg-background-surface border-divider">
      <div className="flex items-center p-4 space-x-4">
        <DocumentOneSolid className="w-6 h-6" />
        <Typography level="h8" className="flex-1">
          Transactions
        </Typography>
        <Link href={ROUTES.TRANSACTIONS}>
          <ArrowRightLine className="w-6 h-6" />
        </Link>
      </div>
      <Transaction filterType="all" filterPlatform="all" defaultPageSize={4} />
    </div>
  )
}
