import { useMemo } from 'react'
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
  size?: 'lg' | 'sm' | 'md'
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

  const titleSize = useMemo(() => {
    if (size === 'lg') return 'h4'
    if (size === 'md') return 'h5'
    return 'h9'
  }, [size])

  const subtitleSize = useMemo(() => {
    if (size === 'lg') return 'p5'
    return 'p6'
  }, [size])

  return (
    <div
      className={clsx('gap-x-2 grid font-medium text-left', className, {
        'grid-cols-[24px_minmax(0,1fr)]': !isLongNumber,
        'grid-cols-[32px_minmax(0,1fr)]': size === 'lg' && !isLongNumber,
        'grid-rows-[minmax(0,1fr)_min-content]': !isLongNumber,
        'grid-rows-[32px_minmax(0,1fr)_min-content] gap-y-1.5 grid-cols-1':
          size === 'lg' && isLongNumber,
        'grid-rows-[24px_minmax(0,1fr)_min-content] gap-y-1.5 grid-cols-1':
          isLongNumber,
      })}
    >
      {isMoniker ? (
        <div className="my-auto flex justify-center items-center w-7 h-7 rounded-full border border-[#E5E4E3]">
          <span className="text-sm">{MonikerIcons.get(tokenIcon)}</span>
        </div>
      ) : (
        <Image
          width={size === 'lg' ? 32 : 24}
          height={size === 'lg' ? 32 : 24}
          className={clsx('shrink-0 aspect-square rounded-full', {
            /* 'my-1': size === 'md' && alignment === 'center' && !isLongNumber, */
            'row-start-1 row-span-2 my-auto':
              alignment === 'left' && !isLongNumber,
            'mx-auto': isLongNumber,
          })}
          src={tokenIcon || coinIcon.src}
          alt=""
        />
      )}
      <div
        className={clsx('flex gap-x-1 items-center', {
          'flex-col items-center': isLongNumber,
        })}
      >
        <Typography
          level={titleSize}
          className="!leading-[1] font-mono"
          fontWeight="md"
        >
          {value}
        </Typography>
        <Typography
          level={titleSize}
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
              level={subtitleSize}
              color="textSecondary"
              fontWeight="md"
              className="font-mono"
            >
              and other tokens
            </Typography>
          )}
          <Typography
            level={subtitleSize}
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
