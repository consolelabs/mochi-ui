import { ActivityType } from '@consolelabs/mochi-rest'
import { Avatar, Badge, BadgeIcon, Typography } from '@mochi-ui/core'
import { utils } from '@consolelabs/mochi-formatter'
import Amount from '~cpn/Amount'
import Row, { CommonProps } from './Row'

const TransferRow = (props: CommonProps) => {
  return (
    <Row action="transfer" {...props}>
      <Typography className="flex gap-x-2 items-center text-left shrink-0">
        {props.type === ActivityType.ACTIVITY_PAY_SEND ? 'Send' : 'Receive'}{' '}
        <Amount
          size="base"
          value={props.amount ?? '0'}
          unit={props.token?.symbol ?? '???'}
          tokenIcon={props.token?.icon ?? ''}
          platformIcon={props.token?.chainIcon ?? ''}
          inline
        />{' '}
        {props.type === ActivityType.ACTIVITY_PAY_SEND ? 'to' : 'from'}{' '}
        <Badge className="inline-flex border border-divider !bg-background-level1">
          <BadgeIcon className="-ml-0.5">
            <Avatar src={props.to.avatar} size="xxs" />
          </BadgeIcon>
          <Typography level="p6">
            {utils.string.formatAddressUsername(props.to.address)}
          </Typography>
        </Badge>
      </Typography>
    </Row>
  )
}

export default TransferRow
