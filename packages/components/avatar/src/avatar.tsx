import * as RadixAvatar from '@radix-ui/react-avatar'
import { useId } from 'react'
import { avatar, AvatarStylesProps } from '@mochi-ui/theme'
import { boringAvatar } from './util'

const { avatarCva } = avatar

interface AvatarProps extends AvatarStylesProps {
  src: string
  smallSrc?: string
  fallback?: string
}

export default function Avatar({
  size,
  src,
  smallSrc,
  fallback = '',
}: AvatarProps) {
  const id = useId()
  const fallbackUrl = boringAvatar(fallback)

  if (smallSrc) {
    return (
      <div className={avatarCva({ size })}>
        <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
          <mask id={`circle-mask-${id}`}>
            <circle cx="50%" cy="50%" fill="white" r="50%" />
            <circle cx="80%" cy="80%" fill="black" r="24%" />
          </mask>
          <image
            height="100%"
            mask={`url(#circle-mask-${id})`}
            onError={(e) => {
              ;(e.target as SVGImageElement).setAttribute(
                'xlink:href',
                fallbackUrl,
              )
            }}
            width="100%"
            xlinkHref={src}
            className="overflow-hidden"
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
    <RadixAvatar.Root
      className={avatarCva({ size, className: 'overflow-hidden' })}
    >
      <RadixAvatar.Image src={src} />
      <RadixAvatar.Fallback>
        <img alt="fallback" src={fallbackUrl} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export { type AvatarProps }
