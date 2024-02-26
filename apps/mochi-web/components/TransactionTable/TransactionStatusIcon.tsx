import { Tooltip } from '@mochi-ui/core'
import {
  InfoCircleOutlined,
  CheckCircleHalfColoredLine,
  ClockCircleArrowColoredLine,
} from '@mochi-ui/icons'
import { useMemo } from 'react'
import { Tx } from './types'

export type TransactionStatusIconProps = {
  tx: Tx
  size?: number
}

export const TransactionStatusIcon = (props: TransactionStatusIconProps) => {
  const { tx, size = 16 } = props

  const iconRender = useMemo(() => {
    switch (tx.status) {
      case 'submitted':
      case 'pending': {
        return <ClockCircleArrowColoredLine width={size} height={size} />
      }
      case 'failed':
      case 'expired': {
        return (
          <InfoCircleOutlined
            width={size}
            height={size}
            className="text-danger-solid"
          />
        )
      }
      case 'success': {
        return <CheckCircleHalfColoredLine width={size} height={size} />
      }
      default: {
        return null
      }
    }
  }, [tx.status, size])

  return (
    <Tooltip content={<div className="capitalize">{tx.status}</div>}>
      {iconRender}
    </Tooltip>
  )
}
