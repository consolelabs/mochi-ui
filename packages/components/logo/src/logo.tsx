import { logo } from '@consolelabs/theme'
import { SVGLogo, SVGText } from './svg-element'

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
  className?: string
  textClassName?: string
  orientation?: 'horizontal' | 'vertical'
  logoProps?: LogoProps
  isDotMochiColor?: boolean
}

export const LogoWithText = (props: LogoWithTextProps) => {
  const {
    className,
    textClassName,
    orientation = 'horizontal',
    logoProps = {},
    isDotMochiColor = true,
  } = props

  return (
    <div className={logoWithTextWrapperCva({ orientation, className })}>
      <Logo {...logoProps} />
      <SVGText
        className={logoTextClsx({ className: textClassName })}
        isDotMochiColor={isDotMochiColor}
      />
    </div>
  )
}
