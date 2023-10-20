import * as RadixAvatar from '@radix-ui/react-avatar'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { useId } from 'react'
import { boringAvatar } from '../util'

const avatar = cva(['ui-rounded-full'], {
  variants: {
    size: {
      xs: 'ui-w-4 ui-h-4',
      sm: 'ui-w-7 ui-h-7',
      base: 'ui-w-10 ui-h-10',
      lg: 'ui-w-14 ui-h-14',
      xl: 'ui-w-20 ui-h-20',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type Props = VariantProps<typeof avatar> & {
  src: string
  smallSrc?: string
  fallback?: string
}

export default function Avatar({ size, src, smallSrc, fallback = '' }: Props) {
  const id = useId()
  const fallbackUrl = boringAvatar(fallback)

  if (smallSrc) {
    return (
      <div className={avatar({ size })}>
        <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
          <mask id={`circle-mask-${id}`}>
            <circle cx="50%" cy="50%" fill="white" r="50%" />
            <circle cx="80%" cy="80%" fill="black" r="24%" />
          </mask>
          <image
            height="100%"
            mask={`url(#circle-mask-${id})`}
            onError={(e) => {
              ; (e.target as SVGImageElement).setAttribute(
                'xlink:href',
                fallbackUrl,
              )
            }}
            width="100%"
            xlinkHref={src}
          />
          <image
            height="40%"
            width="40%"
            x="60%"
            xlinkHref={smallSrc}
            y="60%"
          />
        </svg>
      </div>
    )
  }

  return (
    <RadixAvatar.Root className={avatar({ size })}>
      <RadixAvatar.Image src={src} />
      <RadixAvatar.Fallback>
        <img alt="fallback" src={fallbackUrl} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
