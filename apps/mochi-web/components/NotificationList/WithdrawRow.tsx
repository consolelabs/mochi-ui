import { Avatar, Badge, BadgeIcon, Typography } from '@mochi-ui/core'
import { utils } from '@consolelabs/mochi-formatter'
import Amount from '~cpn/Amount'
import Row, { CommonProps } from './Row'

const WithdrawRow = (props: CommonProps) => {
  return (
    <Row action="withdraw" {...props}>
      <Typography className="flex gap-x-2 items-center w-full text-left shrink-0">
        Withdraw{' '}
        <Amount
          size="base"
          value={props.amount ?? '0'}
          unit={props.token?.symbol ?? '???'}
          tokenIcon={props.token?.icon ?? ''}
          inline
        />{' '}
        to{' '}
        <Badge className="inline-flex border border-divider !bg-background-level1">
          <BadgeIcon className="-ml-0.5">
            <Avatar src="/logo.png" size="xxs" />
          </BadgeIcon>
          <Typography level="p6">
            {utils.string.formatAddressUsername(props.from.address)}
          </Typography>
        </Badge>
      </Typography>
    </Row>
  )
}

export default WithdrawRow
