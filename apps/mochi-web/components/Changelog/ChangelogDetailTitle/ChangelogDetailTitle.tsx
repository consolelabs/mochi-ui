import { Badge, Button, IconButton, Typography } from '@mochi-ui/core'
import { InboxSolid } from '@mochi-ui/icons'
import { format } from 'date-fns'
import Link from 'next/link'

interface ChangelogDetailTitleProps {
  title: string
  version: string
  date: string
  social: string
  onFollow: () => void
}

export const ChangelogDetailTitle = (props: ChangelogDetailTitleProps) => {
  const { title, version, date, social, onFollow } = props
  return (
    <div className="flex md:flex-row flex-col gap-2 items-start justify-between w-full">
      <div className="flex flex-col gap-2">
        <Typography level="h3">{title}</Typography>
        <div className="flex gap-2 items-center">
          <Badge
            className="h-8 !px-4 !rounded-lg !text-base"
            appearance="primary"
          >
            v{version}
          </Badge>
          <Typography level="p4" color="textTertiary">
            {format(new Date(date), 'PPP')}
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button asChild variant="outline" color="neutral" size="sm">
          <Link href={social} target="_blank">
            Follow @mochi_gg
          </Link>
        </Button>
        <IconButton
          label="Subscribe"
          color="neutral"
          variant="outline"
          size="md"
          onClick={onFollow}
        >
          <InboxSolid />
        </IconButton>
      </div>
    </div>
  )
}
