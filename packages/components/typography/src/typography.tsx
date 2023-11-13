import { typography, TypographyProps } from '@consolelabs/theme'

type Props = TypographyProps & {
  children?: React.ReactNode
  className?: string
  levelMapping?: Record<
    NonNullable<TypographyProps['level']>,
    keyof JSX.IntrinsicElements
  >
}

const defaultLevelMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
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
  levelMapping,
  color,
  variant,
  noWrap,
  className,
}: Props) {
  const { typographyVariants } = typography
  const level = levelProp || 'body-md'
  const Component = levelMapping?.[level] || defaultLevelMapping[level]

  return (
    <Component
      className={typographyVariants({
        className,
        level,
        color,
        variant,
        noWrap,
      })}
    >
      {children}
    </Component>
  )
}
