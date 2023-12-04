import { typography, TypographyStyleProps } from '@mochi-ui/theme'

export type TypographyProps = TypographyStyleProps & {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
}

const levelMapping = (level: TypographyProps['level']) => {
  switch (level) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'h5':
      return 'h5'
    case 'h6':
    case 'h7':
    case 'h8':
    case 'h9':
      return 'h6'
    case 'p1':
    case 'p2':
    case 'p3':
    case 'p4':
    case 'p5':
      return 'p'
    case 'p6':
    case 'p7':
      return 'span'
    default:
      return 'p'
  }
}

export default function Typography({
  children,
  level: levelProp,
  component: componentProp,
  color,
  noWrap,
  fontWeight,
  className,
}: TypographyProps) {
  const { typographyVariants } = typography
  const level = levelProp || 'p4'
  const Component = componentProp || levelMapping(level)

  return (
    <Component
      className={typographyVariants({
        className,
        level,
        color,
        noWrap,
        fontWeight,
      })}
    >
      {children}
    </Component>
  )
}
