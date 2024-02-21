import { Avatar, Badge, BadgeIcon, Typography } from '@mochi-ui/core'
import Amount from '~cpn/Amount'
import { utils } from '@consolelabs/mochi-formatter'
import { coinIcon } from '~utils/image'
import Row from './Row'

const PayMeRow = (props: any) => {
  return (
    <Row action="payme" {...props}>
      <Typography
        level="p5"
        className="flex flex-wrap gap-x-2 items-center text-left break-all"
      >
        Request to be paid{' '}
        <Amount
          size="base"
          value="0.1"
          unit="ETH"
          tokenIcon={coinIcon.src}
          inline
        />
        to{' '}
        <Badge className="inline-flex border border-divider !bg-background-level1">
          <BadgeIcon className="-ml-0.5">
            <Avatar src="/logo.png" size="xxs" />
          </BadgeIcon>
          <Typography level="p6">
            {utils.string.formatAddressUsername('nikki')}
          </Typography>
        </Badge>
      </Typography>
    </Row>
  )
}

export default PayMeRow
