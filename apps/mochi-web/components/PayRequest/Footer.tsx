import { Typography } from '@mochi-ui/core'
import DashLine from '~cpn/DashLine'

export default function Footer({ date }: { date: string }) {
  return (
    <div className="flex flex-col pt-3">
      <DashLine />
      <div className="flex justify-between pt-3 text-xs font-light">
        <Typography level="p7" fontWeight="sm" color="textSecondary">
          Mochi &copy; {new Date().getUTCFullYear()}
        </Typography>
        <Typography level="p7" fontWeight="sm" color="textSecondary">
          {date}
        </Typography>
      </div>
    </div>
  )
}
