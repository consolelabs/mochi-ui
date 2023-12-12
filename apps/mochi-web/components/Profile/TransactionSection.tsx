import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { ArrowRightLine, DocumentOneSolid } from '@mochi-ui/icons'
import { Typography } from '@mochi-ui/core'

export const TransactionSection = () => {
  return (
    <div>
      <Link href={ROUTES.TRANSACTIONS}>
        <div className="flex items-center p-4 space-x-4 border rounded-lg border-divider bg-background-surface">
          <DocumentOneSolid className="w-6 h-6" />
          <Typography level="h8" className="flex-1">
            Transactions
          </Typography>
          <ArrowRightLine className="w-6 h-6" />
        </div>
      </Link>
    </div>
  )
}
