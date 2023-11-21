import { typography, TypographyStyleProps } from '@consolelabs/theme'

export type TypographyProps = TypographyStyleProps & {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
}

const defaultLevelMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'title-lg': 'p',
  'title-md': 'p',
  'title-sm': 'p',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'span',
  inherit: 'p',
} as const

export default function Typography({
  children,
  level: levelProp,
  component: componentProp,
  color,
  noWrap,
  className,
}: TypographyProps) {
  const { typographyVariants } = typography
  const level = levelProp || 'body-md'
  const Component = componentProp || defaultLevelMapping[level]

  return (
    <Component
      className={typographyVariants({
        className,
        level,
        color,
        noWrap,
      })}
    >
      {children}
    </Component>
  )
}
