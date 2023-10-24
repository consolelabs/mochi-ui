import React from 'react'
import { boringAvatar } from '~utils/string'
import cc from 'clsx'
import { cva, VariantProps } from 'class-variance-authority'

const style = cva([], {
  variants: {
    size: {
      xs: ['w-9', 'h-9'],
      sm: ['w-14', 'h-14'],
      base: ['w-20', 'h-20'],
      lg: ['w-28', 'h-28'],
      xl: ['w-36', 'h-36'],
      parent: ['w-full', 'h-full'],
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type Props = VariantProps<typeof style> & {
  src: string
  srcFallbackText?: string
  srcFallbackVariant?: 'beam' | 'ring'
  cutoutSrc?: string
  className?: string
}

export default function Avatar({
  size,
  srcFallbackText,
  srcFallbackVariant = 'beam',
  src,
  cutoutSrc,
  className,
}: Props) {
  const id = String(Date.now())

  if (!cutoutSrc)
    return (
      <img
        src={src}
        alt=""
        onError={(e) => {
          if (e.isTrusted) {
            ;(e.target as HTMLImageElement).setAttribute(
              'src',
              boringAvatar(srcFallbackText, srcFallbackVariant),
            )
          }
        }}
        className={size ? style({ size }) : cc(className, 'flex')}
      />
    )

  return (
    <div className={size ? style({ size }) : cc(className, 'flex')}>
      <svg role="none" width="100%" height="100%" viewBox="0 0 100 100">
        <mask id={`circle-mask-${id}`}>
          <circle fill="white" cx="50%" cy="50%" r="50%"></circle>
          <circle fill="black" cx="80%" cy="80%" r="24%"></circle>
        </mask>
        <image
          height="100%"
          width="100%"
          xlinkHref={src}
          mask={`url(#circle-mask-${id})`}
          onError={(e) => {
            if (e.isTrusted) {
              ;(e.target as SVGImageElement).setAttribute(
                'xlink:href',
                boringAvatar(srcFallbackText, srcFallbackVariant),
              )
            }
          }}
        ></image>
        <image
          height="40%"
          width="40%"
          x="60%"
          y="60%"
          xlinkHref={cutoutSrc}
        ></image>
      </svg>
    </div>
  )
}
