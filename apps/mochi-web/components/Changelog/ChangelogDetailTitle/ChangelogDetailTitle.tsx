import { Badge, Button, IconButton, Tooltip, Typography } from '@mochi-ui/core'
import { InboxSolid } from '@mochi-ui/icons'
import { format, isValid } from 'date-fns'
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
  const parsedDate = new Date(date)
  const displayDate = isValid(parsedDate) ? format(parsedDate, 'PPP') : ''
  return (
    <div className="flex md:flex-row flex-col gap-2 items-start justify-between w-full">
      <div className="flex flex-col gap-2">
        <Typography level="h3" className="text-[30px]" fontWeight="lg">
          {title}
        </Typography>
        <div className="flex gap-2 items-center">
          <Badge
            className="h-8 !px-4 !rounded-lg !text-base"
            appearance="primary"
          >
            v{version}
          </Badge>
          <Typography level="p4" color="textTertiary">
            {displayDate}
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 items-center min-h-[45px]">
        <Button asChild variant="outline" color="neutral" size="sm">
          <Link href={social} target="_blank">
            Follow @mochi_gg
          </Link>
        </Button>
        <Tooltip
          content="Subscribe"
          arrow="top-center"
          componentProps={{ trigger: { asChild: true } }}
        >
          <IconButton
            label="Subscribe"
            color="neutral"
            variant="outline"
            onClick={onFollow}
            className="!text-xl !p-1.5"
          >
            <InboxSolid />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}
