type ColorsVariant = {
  solid: {
    DEFAULT: string
    fg: string
    hover: string
    active: string
    disable: string
    focus: string
  }
  outline: {
    DEFAULT: string
    fg: string
    border: string
    hover: string
    active: string
    'disable-fg': string
  }
  plain: {
    fg: string
    hover: string
    active: string
    'disable-fg': string
    'hover-fg': string
  }
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type ThemeColors = {
  primary: RecursivePartial<ColorsVariant>
  secondary: RecursivePartial<ColorsVariant>
  white: RecursivePartial<ColorsVariant>
  success: RecursivePartial<ColorsVariant>
  warning: RecursivePartial<ColorsVariant>
  danger: RecursivePartial<ColorsVariant>
  neutral: RecursivePartial<ColorsVariant>
  text: {
    primary: string
    secondary: string
    disabled: string
    icon: string
    contrast: string
  }
  background: {
    body: string
    level1: string
    level2: string
    level3: string
    surface: string
    popup: string
    tooltip: string
    backdrop: string
  }
  divider: string
}

export type SemanticBaseColors = {
  light: ThemeColors
  dark: ThemeColors
}
