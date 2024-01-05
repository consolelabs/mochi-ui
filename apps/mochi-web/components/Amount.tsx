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
}: AmountProps) {
  const isLongNumber = value.length >= 9

  return (
    <div
      className={clsx('flex items-start font-medium text-left', className, {
        'flex-col': isLongNumber || isMultipleTokens,
      })}
    >
      <Image
        width={size === 'md' ? 28 : 24}
        height={size === 'md' ? 28 : 24}
        className={clsx('mr-1.5', {
          'my-1': size === 'md',
        })}
        src={tokenIcon || coinIcon.src}
        alt=""
      />
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex">
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
        {(valueUsd || isMultipleTokens) && (
          <>
            {isMultipleTokens && (
              <Typography
                level={size === 'md' ? 'p5' : 'p6'}
                color="textSecondary"
              >
                and other tokens
              </Typography>
            )}
            <Typography
              level={size === 'md' ? 'p5' : 'p6'}
              color="textSecondary"
            >
              {approxMoniker} {valueUsd?.startsWith('<') ? '' : <>&asymp;</>}{' '}
              {valueUsd}
            </Typography>
          </>
        )}
      </div>
    </div>
  )
}