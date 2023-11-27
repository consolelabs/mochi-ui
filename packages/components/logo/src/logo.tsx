import { logo } from '@consolelabs/theme'
import * as SVGElement from './svg-element'

type LogoProps = {
  className?: string
  size?: 'base' | 'xl'
}

const { logoCva, logoWithTextWrapperCva, logoTextClsx } = logo

export const Logo = (props: LogoProps) => {
  const { size = 'base', className } = props

  return <SVGElement.SVGLogo className={logoCva({ size, className })} />
}

type LogoWithTextProps = {
  logoProps?: LogoProps
  scheme?: 'light' | 'dark' | 'mochi'
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const SVGText = ({
  scheme,
  className,
}: {
  scheme: LogoWithTextProps['scheme']
  className?: string
}) => {
  switch (scheme) {
    case 'dark':
      return <SVGElement.SVGLogoTextDark className={className} />
    case 'light':
      return <SVGElement.SVGLogoTextLight className={className} />
    case 'mochi':
    default:
      return <SVGElement.SVGLogoTextMochi className={className} />
  }
}

export const LogoWithText = (props: LogoWithTextProps) => {
  const {
    className,
    scheme = 'mochi',
    orientation = 'horizontal',
    logoProps = {},
  } = props

  return (
    <div className={logoWithTextWrapperCva({ orientation, className })}>
      <Logo {...logoProps} />
      <SVGText scheme={scheme} className={logoTextClsx()} />
    </div>
  )
}
