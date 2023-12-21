import * as RadixAvatar from '@radix-ui/react-avatar'
import {
  HTMLAttributes,
  ImgHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'
import {
  avatar,
  AvatarStylesProps,
  AvatarSmallImgStyleProps,
  AvatarStatusStyleProps,
} from '@mochi-ui/theme'
import { boringAvatar } from './util'

const { avatarCva, avatarImgClsx, avatarSmallImgCva, avatarStatusWrapperCva } =
  avatar

type AvatarProps = PropsWithChildren<AvatarStylesProps> & {
  src: string
  fallback?: string
  className?: string
  onLoadingStatusChange?: RadixAvatar.AvatarImageProps['onLoadingStatusChange']
  delayMs?: RadixAvatar.AvatarFallbackProps['delayMs']
} & HTMLAttributes<HTMLDivElement>

export default function Avatar({
  size,
  src,
  fallback = '',
  onLoadingStatusChange,
  delayMs,
  className,
  children,
  ...props
}: AvatarProps) {
  const fallbackUrl = boringAvatar(fallback)

  return (
    <RadixAvatar.Root className={avatarCva({ size, className })} {...props}>
      <RadixAvatar.Image
        className={avatarImgClsx}
        onLoadingStatusChange={onLoadingStatusChange}
        src={src}
      />
      {children}
      <RadixAvatar.Fallback delayMs={delayMs}>
        <img alt="fallback" src={fallbackUrl} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export type AvatarSmallImageProps = AvatarSmallImgStyleProps & {
  src?: string
  className?: string
} & ImgHTMLAttributes<HTMLImageElement>

export const AvatarSmallImage = (props: AvatarSmallImageProps) => {
  const { src, position = 'bottom-right', className, alt, ...restProps } = props
  return (
    <img
      className={avatarSmallImgCva({ position, className })}
      src={src}
      alt={alt}
      {...restProps}
    />
  )
}

export type AvatarStatusProps = AvatarStatusStyleProps & {
  className?: string
  children?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const AvatarStatus = (props: AvatarStatusProps) => {
  const {
    position = 'bottom-right',
    color = 'success',
    className,
    children,
    ...restProps
  } = props
  return (
    <div
      className={avatarStatusWrapperCva({ color, className, position })}
      {...restProps}
    >
      {children || (
        <svg height="100%" width="100%">
          <circle r="50%" cx="50%" cy="50%" fill="currentColor" />
        </svg>
      )}
    </div>
  )
}

export { type AvatarProps }
