import * as RadixAvatar from '@radix-ui/react-avatar'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { useId } from 'react'
import { boringAvatar } from '../util'

const avatar = cva(['rounded-full'], {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-7 h-7',
      base: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
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
            // eslint-disable-next-line react/no-unknown-property
            onError={(e) => {
              ;(e.target as SVGImageElement).setAttribute(
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
