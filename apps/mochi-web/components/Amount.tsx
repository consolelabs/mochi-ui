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
  size?: 'sm' | 'base' | 'md' | 'lg'
  //      14      16      24     32
  isMultipleTokens?: boolean
  isMoniker?: boolean
  alignment?: 'left' | 'center'
  inline?: boolean
}

const titleSize: any = {
  sm: 'h9',
  base: 'h7',
  md: 'h5',
  lg: 'h4',
}

const subtitleSize: any = {
  sm: 'p6',
  base: 'p6',
  md: 'p6',
  lg: 'p5',
}

const iconSize: any = {
  sm: 16,
  base: 16,
  md: 24,
  lg: 32,
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
  inline = false,
}: AmountProps) {
  const isLongNumber = value.length >= 12

  return (
    <div
      style={{
        gridTemplateColumns: `${iconSize[size]}px minmax(0, 1fr)`,
        gridTemplateRows: !isLongNumber
          ? 'minmax(0, 1fr) min-content'
          : `${iconSize[size]}px minmax(0, 1fr) min-content`,
      }}
      className={clsx('shrink-0 gap-x-2 font-medium text-left', className, {
        grid: !inline,
        'inline-grid': inline,
        'gap-y-1.5 grid-cols-1': isLongNumber,
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
          level={titleSize[size]}
          className="!leading-[1] font-mono"
          fontWeight="md"
        >
          {value}
        </Typography>
        <Typography
          level={titleSize[size]}
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
              level={subtitleSize[size]}
              color="textSecondary"
              fontWeight="md"
              className="font-mono"
            >
              and other tokens
            </Typography>
          )}
          <Typography
            level={subtitleSize[size]}
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
