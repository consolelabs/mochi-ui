import { Typography } from '@mochi-ui/core'
import Amount from '~cpn/Amount'
import { coinIcon } from '~utils/image'
import Row, { CommonProps } from './Row'

const SwapRow = (props: CommonProps) => {
  return (
    <Row action="swap" {...props}>
      <Typography
        level="p5"
        className="flex gap-x-2 items-center text-left shrink-0"
      >
        Swap{' '}
        <Amount
          size="base"
          value="10"
          unit="USDT"
          tokenIcon={coinIcon.src}
          inline
        />{' '}
        to{' '}
        <Amount
          size="base"
          value="3"
          unit="SOL"
          tokenIcon={coinIcon.src}
          inline
        />
      </Typography>
    </Row>
  )
}

export default SwapRow
