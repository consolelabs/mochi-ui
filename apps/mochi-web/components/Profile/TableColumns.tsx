import { truncate } from '@dwarvesf/react-utils'
import { Button, ColumnProps, Typography } from '@mochi-ui/core'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { utils } from 'ethers'
import { TokenAvatar } from '~cpn/TokenAvatar'

export const Amount: ColumnProps<ModelPayRequest>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <TokenAvatar
      src={props.row.original.token?.icon || ''}
      name={props.row.original.token?.symbol || ''}
    />
    <Typography level="p5">
      {mochiUtils.formatTokenDigit(
        utils.formatUnits(
          props.row.original.amount || 0,
          props.row.original.token?.decimal,
        ),
      )}{' '}
      {props.row.original.token?.symbol}
    </Typography>
  </div>
)

export const PaymeUrl: ColumnProps<ModelPayRequest>['cell'] = (props) => {
  const link = `mochi.gg/receive/${props.row.original.code}`

  return (
    <Button variant="link" className="!font-normal pl-0 pr-0">
      <a href={`https://${link}`} target="_blank">
        {truncate(link, 21)}
      </a>
    </Button>
  )
}

export const PaylinkUrl: ColumnProps<ModelPayRequest>['cell'] = (props) => {
  const link = `mochi.gg/pay/${props.row.original.code}`

  return (
    <Button variant="link" className="!font-normal pl-0 pr-0">
      <a href={`https://${link}`} target="_blank">
        {truncate(link, 21)}
      </a>
    </Button>
  )
}
