import { forwardRef } from 'react'
import { footer } from '@mochi-ui/theme'
import { Typography } from '@mochi-ui/typography'

interface FooterNavBlock {
  title?: string
  links: {
    href: string
    text: string
    newTab?: boolean
    as?: 'a' | any
  }[]
}

interface FooterSocial {
  title: string
  href: string
  Icon: (props: any) => JSX.Element
}

interface FooterProps {
  className?: string
  logo: React.ReactNode
  copyrightText: React.ReactNode
  nav: FooterNavBlock[]
  social: FooterSocial[]
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, logo, copyrightText, nav, social }, ref) => {
    return (
      <footer ref={ref} className={footer.footerClsx({ className })}>
        <div className={footer.wrapperClsx}>
          <div className={footer.wrapperInnerClsx}>
            {logo}
            {nav.length ? (
              <div className={footer.navClsx}>
                {nav.map((block, index) => {
                  return (
                    <div className={footer.navBlockClsx} key={index}>
                      <h6 className={footer.navTitleClsx}>{block.title}</h6>
                      {block.links.map(({ href, text, as, newTab }, index) => {
                        const Component = as || 'a'
                        return (
                          <Component
                            key={`${index} ${href}`}
                            href={href}
                            className={footer.navLinkClsx}
                            target={newTab ? 'blank' : undefined}
                          >
                            {text}
                          </Component>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ) : null}
            <div className={footer.infoClsx}>
              {typeof copyrightText === 'string' ? (
                <Typography
                  level="p5"
                  color="textSecondary"
                  className={footer.copyrightClsx}
                >
                  {copyrightText}
                </Typography>
              ) : (
                copyrightText
              )}
              <div className={footer.socialClsx}>
                {social.map(({ href, title, Icon }) => (
                  <a
                    key={href}
                    target="_blank"
                    rel="noreferrer"
                    title={title}
                    href={href}
                    className={footer.socialLinkClsx}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  },
)

Footer.displayName = 'Footer'

export { Footer, type FooterProps }
