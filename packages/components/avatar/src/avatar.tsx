import * as RadixAvatar from '@radix-ui/react-avatar'
import { SVGProps, useId, useMemo } from 'react'
import { avatar, AvatarStylesProps } from '@mochi-ui/theme'
import { Skeleton } from '@mochi-ui/skeleton'
import { isSSR } from '@dwarvesf/react-utils'
import { boringAvatar } from './util'

const { avatarCva, avatarImgClsx, avatarFallbackCls, avatarImgSvgCls } = avatar

interface AvatarProps extends AvatarStylesProps {
  src: string
  smallSrc?: string | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  fallback?: string
  className?: string
  onLoadingStatusChange?: RadixAvatar.AvatarImageProps['onLoadingStatusChange']
  isLoading?: boolean
}

const AvatarContent = (
  props: Pick<AvatarProps, 'smallSrc' | 'size' | 'src' | 'fallback'>,
) => {
  const { smallSrc, size, src, fallback } = props
  let renderSmallSrc
  if (typeof smallSrc === 'string') {
    renderSmallSrc =
      size === 'xs' ? (
        <image
          width="38.28125%"
          height="38.28125%"
          x="55.859375%"
          y="55.859375%"
          xlinkHref={smallSrc || fallback}
        />
      ) : (
        <image
          height="33%"
          width="33%"
          x="63%"
          xlinkHref={smallSrc || fallback}
          y="63%"
        />
      )
  } else {
    const Icon = smallSrc as (props: SVGProps<SVGSVGElement>) => JSX.Element
    renderSmallSrc =
      size === 'xs' ? (
        <Icon
          width="38.28125%"
          height="38.28125%"
          x="55.859375%"
          y="55.859375%"
        />
      ) : (
        <Icon height="33%" width="33%" x="63%" y="63%" />
      )
  }
  const id = useId()

  return size === 'xs' ? (
    <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
      <mask id={`circle-mask-${id}`}>
        <circle cx="50%" cy="50%" fill="white" r="50%" />
        <circle cx="75%" cy="75%" fill="black" r="21.875%" />
      </mask>
      <image
        width="75%"
        height="75%"
        x="12.5%"
        y="12.5%"
        mask={`url(#circle-mask-${id})`}
        xlinkHref={src || fallback}
        className={avatarImgSvgCls}
      />
      {renderSmallSrc}
    </svg>
  ) : (
    <svg height="100%" role="none" viewBox="0 0 100 100" width="100%">
      <mask id={`circle-mask-${id}`}>
        <circle cx="50%" cy="50%" fill="white" r="50%" />
        <circle cx="80%" cy="80%" fill="black" r="20%" />
      </mask>

      <image
        height="100%"
        mask={`url(#circle-mask-${id})`}
        width="100%"
        xlinkHref={src || fallback}
        className={avatarImgSvgCls}
      />
      {renderSmallSrc}
    </svg>
  )
}

export default function Avatar({
  size,
  src,
  smallSrc,
  fallback = '',
  onLoadingStatusChange,
  className,
  isLoading = false,
}: AvatarProps) {
  const fallbackUrl = boringAvatar(fallback)

  const isCached = useMemo(() => {
    if (isSSR()) return true
    const image = new window.Image()
    image.src = src || fallbackUrl
    return image.complete
  }, [src, fallbackUrl])

  return (
    <RadixAvatar.Root
      className={avatarCva({ size, className, hasSmallSrc: !!smallSrc })}
    >
      <RadixAvatar.Image
        // NOTE:if loading => show skeleton
        src={isLoading ? '' : src || fallbackUrl}
        className={avatarImgClsx({ smallSrc: Boolean(smallSrc), isCached })}
        asChild={!!smallSrc}
        onLoadingStatusChange={onLoadingStatusChange}
      >
        {smallSrc ? (
          <AvatarContent {...{ smallSrc, size, src }} fallback={fallbackUrl} />
        ) : null}
      </RadixAvatar.Image>
      <RadixAvatar.Fallback>
        <Skeleton className={avatarFallbackCls} />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

export { type AvatarProps }
