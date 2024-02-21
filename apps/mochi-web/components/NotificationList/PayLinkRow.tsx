import { Typography } from '@mochi-ui/core'
import Amount from '~cpn/Amount'
import { coinIcon } from '~utils/image'
import Row from './Row'

const PayLinkRow = (props: any) => {
  return (
    <Row action="paylink" {...props}>
      <Typography
        level="p5"
        className="flex flex-wrap gap-x-2 items-center text-left break-all"
      >
        Create the pay link{' '}
        <Amount
          size="base"
          value="1"
          unit="BTC"
          tokenIcon={coinIcon.src}
          inline
        />{' '}
      </Typography>
    </Row>
  )
}

export default PayLinkRow
