import { CSSRuleObject } from 'tailwindcss/types/config'
import { ThemeColors } from './colors/types'

export type DefaultThemeType = 'light' | 'dark'

export type LayoutType = 'landing' | 'dashboard'

export type ScreenSizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export type ConfigTheme = {
  extend?: 'light' | 'dark'
  colors?: Partial<ThemeColors>
}

export type ConfigThemes = Record<string, ConfigTheme>

type ConfigLayout = CSSRuleObject & {
  [key in ScreenSizes]?: CSSRuleObject
}

type ContainerConfigType = {
  [key in LayoutType]?: ConfigLayout
}

export type MochiUIPluginConfig = {
  /**
   * The prefix for the css variables.
   * @default "mochi"
   */
  prefix?: string
  /**
   * If true, the common nextui colors (e.g. "blue", "green", "purple") will not be extended on the theme.
   * @default false
   */
  addCommonColors?: boolean
  /**
   * The theme definitions.
   */
  themes?: ConfigThemes
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultThemeType
  /**
   * The default theme to extend.
   * @default "light"
   */
  defaultExtendTheme?: DefaultThemeType
  /**
   * The container configuration for each layout type.
   */
  container?: ContainerConfigType
}
