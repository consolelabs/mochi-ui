import * as RadixAvatar from '@radix-ui/react-avatar'
import { PropsWithChildren, useId } from 'react'
import { avatar, AvatarStylesProps } from '@mochi-ui/theme'
import { boringAvatar, getRelativePosition } from './util'

const { avatarCva, avatarImgClsx, avatarSmallImg, avatarStatus } = avatar

type AvatarProps = PropsWithChildren<AvatarStylesProps> & {
  src: string
  fallback?: string
  className?: string
  onLoadingStatusChange?: RadixAvatar.AvatarImageProps['onLoadingStatusChange']
  delayMs?: RadixAvatar.AvatarFallbackProps['delayMs']
}

export default function Avatar({
  size,
  src,
  fallback = '',
  onLoadingStatusChange,
  delayMs,
  className,
  children,
}: AvatarProps) {
  const id = useId()
  const fallbackUrl = boringAvatar(fallback)

  return (
    <RadixAvatar.Root className={avatarCva({ size, className })}>
      <RadixAvatar.Image
        className={avatarImgClsx}
        asChild
        onLoadingStatusChange={onLoadingStatusChange}
        src={src}
      >
        <div>
          <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
            <image
              xlinkHref={src}
              height="100%"
              width="100%"
              className="overflow-hidden"
            />
            {children}
          </svg>
        </div>
      </RadixAvatar.Image>
      <RadixAvatar.Fallback delayMs={delayMs}>
        <img alt="fallback" src={fallbackUrl} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export interface AvatarSmallImageProps {
  src?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const AvatarSmallImage = (props: AvatarSmallImageProps) => {
  const { src, position = 'bottom-right' } = props
  const [x, y] = getRelativePosition(position)
  return (
    <image
      className={avatarSmallImg}
      height="25%"
      width="25%"
      x={x}
      y={y}
      xlinkHref={src}
    />
  )
}

export interface AvatarStatusProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'neutral'
  className?: string
}

export const AvatarStatus = (props: AvatarStatusProps) => {
  const { position = 'bottom-right', color = 'success', className } = props
  const [x, y] = getRelativePosition(position)
  return (
    <svg
      height="25%"
      width="25%"
      x={x}
      y={y}
      className={avatarStatus({ color, className })}
    >
      <circle rx="50%" cx="50%" cy="50%" fill="red" />
    </svg>
  )
}

export { type AvatarProps }
