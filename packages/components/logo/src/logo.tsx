import { logo } from '@consolelabs/theme'
import { SVGLogo, SVGLogoText } from './svg-element'

type LogoProps = {
  className?: string
  size?: 'xs' | 'base' | 'xl'
}

const { logoCva, logoWithTextWrapperCva, logoTextClsx } = logo

export const Logo = (props: LogoProps) => {
  const { size = 'base', className } = props

  return <SVGLogo className={logoCva({ size, className })} />
}

type LogoWithTextProps = {
  scheme?: 'light' | 'dark' | 'mochi'
  className?: string
  textClassName?: string
  orientation?: 'horizontal' | 'vertical'
  logoProps?: LogoProps
}

export const LogoWithText = (props: LogoWithTextProps) => {
  const {
    scheme = 'mochi',
    className,
    textClassName,
    orientation = 'horizontal',
    logoProps = {},
  } = props

  return (
    <div className={logoWithTextWrapperCva({ orientation, className })}>
      <Logo {...logoProps} />
      <SVGLogoText
        scheme={scheme}
        className={logoTextClsx({ className: textClassName })}
      />
    </div>
  )
}
