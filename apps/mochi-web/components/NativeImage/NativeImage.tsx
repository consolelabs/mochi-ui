import { ComponentProps, forwardRef } from 'react'

export interface NativeImageOptions {
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
}

interface NativeImageProps extends ComponentProps<'img'>, NativeImageOptions {}

/**
 * A component to render an image with native HTML attributes
 * Suitable for render images to string in server-side or in markdown
 */
export const NativeImage = forwardRef(
  (props: NativeImageProps, ref: React.Ref<any>) => {
    const { htmlWidth, htmlHeight, alt, ...rest } = props
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        width={htmlWidth}
        height={htmlHeight}
        ref={ref}
        alt={alt}
        {...rest}
      />
    )
  },
)

NativeImage.displayName = 'NativeImage'
