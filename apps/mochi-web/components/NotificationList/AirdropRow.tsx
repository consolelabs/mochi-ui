import { Avatar, Badge, BadgeIcon, Typography } from '@mochi-ui/core'
import { utils } from '@consolelabs/mochi-formatter'
import Amount from '~cpn/Amount'
import { coinIcon } from '~utils/image'
import Row from './Row'

const AirdropRow = (props: any) => {
  return (
    <Row action="airdrop" {...props}>
      <Typography
        level="p5"
        className="flex flex-wrap gap-x-2 items-center text-left break-all"
      >
        Receive{' '}
        <Amount
          size="base"
          value="3"
          unit="ICY"
          tokenIcon={coinIcon.src}
          inline
        />{' '}
        from{' '}
        <Badge className="inline-flex border border-divider !bg-background-level1">
          <BadgeIcon className="-ml-0.5">
            <Avatar src="/logo.png" size="xxs" />
          </BadgeIcon>
          <Typography level="p6">
            {utils.string.formatAddressUsername('Neko-san')}
          </Typography>
        </Badge>
      </Typography>
    </Row>
  )
}

export default AirdropRow
