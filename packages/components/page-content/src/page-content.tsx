import { pageContent } from '@mochi-ui/theme'
import { forwardRef, HTMLAttributes } from 'react'

const { pageContentWrapperClsx, pageContentClsx } = pageContent

type PageContentProps = HTMLAttributes<HTMLDivElement> & {
  tagName?: 'header' | 'footer' | 'main' | 'div'
  containerClassName?: string
}

const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  (props, ref) => {
    const {
      className,
      containerClassName,
      tagName: Tag = 'main',
      children,
      ...rest
    } = props

    return (
      <Tag
        className={pageContentWrapperClsx({ className })}
        ref={ref}
        {...rest}
      >
        <div className={pageContentClsx({ className: containerClassName })}>
          {children}
        </div>
      </Tag>
    )
  },
)

PageContent.displayName = 'PageContent'

export { PageContent, type PageContentProps }
