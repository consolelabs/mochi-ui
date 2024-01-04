import { Typography } from '@mochi-ui/core'
import clsx from 'clsx'
import Image from 'next/image'
import { coinIcon } from '~utils/image'

interface AmountProps {
  value: string
  valueUsd?: string
  tokenIcon: string
  unit: string
  approxMoniker?: string
  className?: string
  size?: 'sm' | 'md'
}

export default function Amount({
  value,
  valueUsd,
  tokenIcon,
  unit,
  approxMoniker,
  className = '',
  size = 'md',
}: AmountProps) {
  const isLongNumber = value.length >= 12

  return (
    <div
      className={clsx('flex items-center', className, {
        'flex-col': !!valueUsd,
      })}
    >
      <div className="flex justify-center items-center font-medium">
        <div
          className={clsx('flex items-center', {
            'flex-col': isLongNumber,
          })}
        >
          <Image
            width={size === 'md' ? 28 : 24}
            height={size === 'md' ? 28 : 24}
            className="mr-1.5"
            src={tokenIcon || coinIcon.src}
            alt=""
          />
          <Typography
            level={size === 'md' ? 'h4' : 'h9'}
            className="!leading-[1]"
            fontWeight={size === 'md' ? 'md' : 'sm'}
          >
            {value}
          </Typography>
          <div
            className={clsx('flex ml-1', {
              'items-center': isLongNumber,
              'items-baseline': !isLongNumber,
            })}
          >
            <Typography
              level={size === 'md' ? 'h4' : 'h9'}
              className="!leading-[1]"
              fontWeight={size === 'md' ? 'md' : 'sm'}
            >
              {unit}
            </Typography>
          </div>
        </div>
      </div>
      {valueUsd && (
        <Typography level={size === 'md' ? 'p5' : 'p6'} color="textSecondary">
          {approxMoniker} {valueUsd.startsWith('<') ? '' : <>&asymp;</>}{' '}
          {valueUsd}
        </Typography>
      )}
    </div>
  )
}
