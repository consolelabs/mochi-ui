import { Tooltip } from '@mochi-ui/core'
import {
  CheckCircleHalfLine,
  ClockCircleArrowLine,
  InfoCircleOutlined,
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
        return <ClockCircleArrowLine width={size} />
      }
      case 'failed':
      case 'expired': {
        return <InfoCircleOutlined width={size} className="text-danger-solid" />
      }
      case 'success': {
        return <CheckCircleHalfLine width={size} />
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
