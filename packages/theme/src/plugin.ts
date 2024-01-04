import plugin from 'tailwindcss/plugin.js'
import Color from 'color'
import get from 'lodash.get'
import omit from 'lodash.omit'
import forEach from 'lodash.foreach'
import deepMerge from 'deepmerge'
import { commonColors, semanticColors } from './colors'
import { flattenThemeObject } from './util'
import { ConfigTheme, MochiUIPluginConfig } from './types'

const parsedColorsCache: Record<string, number[]> = {}

export const isBaseTheme = (theme: string) =>
  theme === 'light' || theme === 'dark'

export const mochiui = (config: MochiUIPluginConfig) => {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    defaultExtendTheme = 'light',
    prefix = 'mochi',
    addCommonColors = false,
  } = config

  const userLightColors = get(themeObject, 'light.colors', {})
  const userDarkColors = get(themeObject, 'dark.colors', {})

  // get other themes from the config different from light and dark
  let otherThemes = omit(themeObject, ['light', 'dark']) || {}

  forEach(otherThemes, ({ extend, colors }, themeName) => {
    const baseTheme =
      extend && isBaseTheme(extend) ? extend : defaultExtendTheme

    if (colors && typeof colors === 'object') {
      otherThemes[themeName].colors = deepMerge(
        // @ts-ignore
        semanticColors[baseTheme],
        colors,
      )
    }
  })

  const light: ConfigTheme = {
    // @ts-ignore
    colors: deepMerge(semanticColors.light, userLightColors),
  }

  const dark = {
    colors: deepMerge(semanticColors.dark, userDarkColors),
  }

  const themes = {
    light,
    dark,
    ...otherThemes,
  }

  const resolved: {
    variants: { name: string; definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<
      string,
      ({
        opacityValue,
        opacityVariable,
      }: {
        opacityValue: string
        opacityVariable: string
      }) => string
    >
  } = {
    variants: [],
    utilities: {},
    colors: {},
  }

  for (const [themeName, { colors }] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`

    // use light as default theme
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`
    }

    resolved.utilities[cssSelector] = themeName
      ? {
          'color-scheme': themeName,
        }
      : {}

    const flatColors = flattenThemeObject(colors) as Record<string, string>

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return

      try {
        const parsedColor =
          parsedColorsCache[colorValue] ||
          Color(colorValue).hsl().round().array()

        parsedColorsCache[colorValue] = parsedColor

        const [h, s, l, defaultAlphaValue] = parsedColor
        const colorVariable = `--${prefix}-${colorName}`
        const opacityVariable = `--${prefix}-${colorName}-opacity`
        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![colorVariable] = `${h} ${s}% ${l}%`
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === 'number') {
          resolved.utilities[cssSelector]![opacityVariable] =
            defaultAlphaValue.toFixed(2)
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!Number.isNaN(+opacityValue)) {
            return `hsl(var(${colorVariable}) / ${opacityValue})`
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the opacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${colorVariable}) / var(${opacityVariable}, var(${opacityVariable})))`
          }
          return `hsl(var(${colorVariable}) / var(${opacityVariable}, 1))`
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message)
      }
    }
  }

  return plugin(
    ({ addVariant, addUtilities }) => {
      // add the css variables to "@layer utilities"
      addUtilities({ ...resolved?.utilities })

      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition)
      })
    },
    {
      theme: {
        extend: {
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved?.colors,
          },
          fontSize: {
            xxs: '11px',
            xxxs: '10px',
            '3.5xl': '32px',
            '4.5xl': '40px',
          },
          boxShadow: {
            small:
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            input: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            demp: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'input-focused':
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            button: '0px 0px 8px 0px rgba(0, 0, 0, 0.04)',
            'button-focused-primary':
              '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'button-focused-gray':
              '0px 0px 0px 4px #F4F3F2, 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
            'button-focused-destructive':
              '0px 0px 0px 4px rgba(224, 45, 60, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          },
          width: {
            18: '4.5rem',
          },
          keyframes: {
            'slide-left': {
              '0%': { transform: 'translate(-100%, 0)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-right': {
              '0%': { transform: 'translate(100%, 0)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-top': {
              '0%': { transform: 'translate(0, -100%)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
            'slide-bottom': {
              '0%': { transform: 'translate(0, 100%)', opacity: '0.5' },
              '100%': { transform: 'translate(0, 0)', opacity: '1' },
            },
          },
          animation: {
            'slide-from-left': 'slide-left 0.2s ease-in-out',
            'slide-from-right': 'slide-right 0.2s ease-in-out',
            'slide-from-top': 'slide-top 0.2s ease-in-out',
            'slide-from-bottom': 'slide-bottom 0.2s ease-in-out',
          },
          screens: {
            xxs: '375px',
            xs: '425px',
          },
        },
      },
    },
  )
}
