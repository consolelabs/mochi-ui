import { Typography } from '@mochi-ui/core'
import clsx from 'clsx'
import Image from 'next/image'
import { coinIcon } from '~utils/image'
import { MonikerIcons } from './MochiWidget/TokenPicker/utils'

interface AmountProps {
  value: string
  valueUsd?: string
  tokenIcon: string
  unit: string
  approxMoniker?: string
  className?: string
  size?: 'sm' | 'md'
  isMultipleTokens?: boolean
  isMoniker?: boolean
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
  isMoniker,
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
      {isMoniker ? (
        <div className="my-auto flex justify-center items-center w-7 h-7 rounded-full border border-[#E5E4E3]">
          <span className="text-sm">{MonikerIcons.get(tokenIcon)}</span>
        </div>
      ) : (
        <Image
          width={size === 'md' ? 28 : 24}
          height={size === 'md' ? 28 : 24}
          className={clsx('rounded-full', {
            'my-1': size === 'md' && alignment === 'center' && !isLongNumber,
            'row-start-1 row-span-2 my-auto':
              alignment === 'left' && !isLongNumber,
            'mx-auto': isLongNumber,
          })}
          src={tokenIcon || coinIcon.src}
          alt=""
        />
      )}
      <div
        className={clsx('flex gap-x-1', {
          'flex-col items-center': isLongNumber,
        })}
      >
        <Typography
          level={size === 'md' ? 'h4' : 'h9'}
          className="!leading-[1] font-mono"
          fontWeight="md"
        >
          {value}
        </Typography>
        <Typography
          level={size === 'md' ? 'h4' : 'h9'}
          className="!leading-[1] font-mono"
          fontWeight="md"
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
              fontWeight="md"
              className="font-mono"
            >
              and other tokens
            </Typography>
          )}
          <Typography
            level={size === 'md' ? 'p5' : 'p6'}
            fontWeight="md"
            color="textTertiary"
            className="font-mono"
          >
            {approxMoniker} {valueUsd?.startsWith('<') ? '' : <>&asymp;</>}{' '}
            {valueUsd}
          </Typography>
        </div>
      )}
    </div>
  )
}
