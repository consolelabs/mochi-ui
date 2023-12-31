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
  isMultipleTokens?: boolean
  alignment?: 'left' | 'center'
}

export default function Amount({
  value,
  valueUsd,
  tokenIcon,
  unit,
  approxMoniker,
  className = '',
  size = 'md',
  isMultipleTokens = false,
  alignment = 'center',
}: AmountProps) {
  const isLongNumber = value.length >= 12

  return (
    <div
      className={clsx('gap-x-1.5 grid font-medium text-left', className, {
        'grid-cols-[28px_minmax(0,1fr)]': size === 'md' && !isLongNumber,
        'grid-cols-[24px_minmax(0,1fr)]': size === 'sm' && !isLongNumber,
        'grid-rows-2': !isLongNumber,
        'grid-rows-[28px_minmax(0,1fr)_min-content] gap-y-1.5 grid-cols-1':
          isLongNumber,
      })}
    >
      <Image
        width={size === 'md' ? 28 : 24}
        height={size === 'md' ? 28 : 24}
        className={clsx({
          'my-1': size === 'md' && alignment === 'center' && !isLongNumber,
          'row-start-1 row-span-2 my-auto':
            alignment === 'left' && !isLongNumber,
          'mx-auto': isLongNumber,
        })}
        src={tokenIcon || coinIcon.src}
        alt=""
      />
      <div
        className={clsx('flex gap-x-1', {
          'flex-col items-center': isLongNumber,
        })}
      >
        <Typography
          level={size === 'md' ? 'h4' : 'h9'}
          className="!leading-[1]"
          fontWeight={size === 'md' ? 'md' : 'sm'}
        >
          {value}
        </Typography>
        <Typography
          level={size === 'md' ? 'h4' : 'h9'}
          className="!leading-[1]"
          fontWeight={size === 'md' ? 'md' : 'sm'}
        >
          {unit}
        </Typography>
      </div>
      {(valueUsd || isMultipleTokens) && (
        <div
          className={clsx({
            'col-start-1 col-span-2 text-center':
              alignment === 'center' && !isLongNumber,
            'col-start-2 col-span-1': alignment === 'left' && !isLongNumber,
            'text-center': isLongNumber,
          })}
        >
          {isMultipleTokens && (
            <Typography
              level={size === 'md' ? 'p5' : 'p6'}
              color="textSecondary"
              fontWeight="sm"
            >
              and other tokens
            </Typography>
          )}
          <Typography
            level={size === 'md' ? 'p5' : 'p6'}
            fontWeight="sm"
            color="textSecondary"
          >
            {approxMoniker} {valueUsd?.startsWith('<') ? '' : <>&asymp;</>}{' '}
            {valueUsd}
          </Typography>
        </div>
      )}
    </div>
  )
}
