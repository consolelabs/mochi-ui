import plugin from 'tailwindcss/plugin.js'
import Color from 'color'
import get from 'lodash.get'
import omit from 'lodash.omit'
import forEach from 'lodash.foreach'
import deepMerge from 'deepmerge'
import { CSSRuleObject } from 'tailwindcss/types/config'
import { commonColors, semanticColors } from './colors'
import { flattenThemeObject } from './util'
import { ConfigTheme, MochiUIPluginConfig } from './types'

const parsedColorsCache: Record<string, number[]> = {}

export const isBaseTheme = (theme: string) =>
  theme === 'light' || theme === 'dark'

export const isScreenSizeKey = (key: string) =>
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(key)

export const mapCSSRulesWithBreakpoints = (rules: CSSRuleObject) =>
  Object.keys(rules).reduce((acc, key) => {
    Object.assign(
      acc,
      isScreenSizeKey(key)
        ? {
            [`@screen ${key}`]: rules[key],
          }
        : {
            [key]: rules[key],
          },
    )
    return acc
  }, {} as CSSRuleObject)

export const mochiui = (config: MochiUIPluginConfig = {}) => {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    defaultExtendTheme = 'light',
    prefix = 'mochi',
    addCommonColors = true,
    container: {
      landing: landingContainerConfig = {},
      dashboard: dashboardContainerConfig = {},
    } = {},
    screens = {},
  } = config

  const userLightColors = get(themeObject, 'light.colors', {})
  const userDarkColors = get(themeObject, 'dark.colors', {})

  // get other themes from the config different from light and dark
  const otherThemes = omit(themeObject, ['light', 'dark']) || {}

  forEach(otherThemes, ({ extend, colors }, themeName) => {
    const baseTheme =
      extend && isBaseTheme(extend) ? extend : defaultExtendTheme

    if (colors && typeof colors === 'object') {
      otherThemes[themeName].colors = deepMerge(
        semanticColors[baseTheme],
        colors,
      )
    }
  })

  const light: ConfigTheme = {
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
          parsedColorsCache[colorValue] || Color(colorValue).hsl().array()

        parsedColorsCache[colorValue] = parsedColor

        const [h, s, l, defaultAlphaValue] = parsedColor
        // const colorVariable = `--${prefix}-${colorName}`
        // const opacityVariable = `--${prefix}-${colorName}-opacity`
        const mochiColorVariable = `--${prefix}-${colorName}`
        const mochiOpacityVariable = `--${prefix}-${colorName}-opacity`
        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![mochiColorVariable] =
          `${h} ${s}% ${l}%`
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === 'number') {
          resolved.utilities[cssSelector]![mochiOpacityVariable] =
            defaultAlphaValue.toFixed(2)
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!Number.isNaN(+opacityValue)) {
            return `hsl(var(${mochiColorVariable}) / ${opacityValue})`
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the opacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${mochiColorVariable}) / var(${mochiOpacityVariable}, var(${opacityVariable})))`
          }
          return `hsl(var(${mochiColorVariable}) / var(${mochiOpacityVariable}, 1))`
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message)
      }
    }
  }

  const {
    maxWidth: landingMaxWidth,
    paddingLeft: landingPaddingLeft,
    paddingRight: landingPaddingRight,
    ...landingRestConfig
  } = landingContainerConfig

  const {
    maxWidth: dashboardMaxWidth,
    paddingLeft: dashboardPaddingLeft,
    paddingRight: dashboardPaddingRight,
    ...dashboardRestConfig
  } = dashboardContainerConfig

  return plugin(
    ({ addVariant, addUtilities }) => {
      // add the css variables to "@layer utilities"
      addUtilities({
        ...resolved?.utilities,
        '.landing-container': deepMerge(
          {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: landingMaxWidth ?? '100%',
            paddingLeft: landingPaddingLeft ?? '1.25rem',
            paddingRight: landingPaddingRight ?? '1.25rem',
            // iterate landingRestConfig and apply to '@screen <size>' if the key is of type ScreenSizes
            ...mapCSSRulesWithBreakpoints(landingRestConfig),
          },
          {
            '@screen md': {
              maxWidth:
                landingRestConfig?.md?.maxWidth ?? landingMaxWidth ?? '1280px',
              paddingLeft:
                landingRestConfig?.md?.paddingLeft ??
                landingPaddingLeft ??
                '5rem',
              paddingRight:
                landingRestConfig?.md?.paddingRight ??
                landingPaddingRight ??
                '5rem',
            },
          },
        ),
        '.dashboard-container': deepMerge(
          {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: dashboardMaxWidth ?? '100%',
            paddingLeft: dashboardPaddingLeft ?? '1rem',
            paddingRight: dashboardPaddingRight ?? '1rem',
            ...mapCSSRulesWithBreakpoints(dashboardRestConfig),
          },
          {
            '@screen md': {
              maxWidth:
                dashboardRestConfig?.md?.maxWidth ??
                dashboardMaxWidth ??
                '1108px',
              paddingLeft:
                dashboardRestConfig?.md?.paddingLeft ??
                dashboardPaddingLeft ??
                '1.5rem',
              paddingRight:
                dashboardRestConfig?.md?.paddingRight ??
                dashboardPaddingRight ??
                '1.5rem',
            },
          },
        ),
      })

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
            'fade-in': {
              '0%': { opacity: '0.3' },
              '100%': { opacity: '1' },
            },
            'accordion-open': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-close': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
            'show-changelog-alert': {
              from: { height: '0' },
              to: { height: '3.5rem' },
            },
          },
          animation: {
            'slide-from-left': 'slide-left 0.2s ease-in-out',
            'slide-from-right': 'slide-right 0.2s ease-in-out',
            'slide-from-top': 'slide-top 0.2s ease-in-out',
            'slide-from-bottom': 'slide-bottom 0.2s ease-in-out',
            'fade-in': 'fade-in 0.5s ease-in-out',
            'accordion-open': 'accordion-open 0.2s ease-out',
            'accordion-close': 'accordion-close 0.2s ease-out',
            'show-changelog-alert': 'show-changelog-alert 0.2s ease-out',
          },
          screens: {
            '4xl': screens?.['4xl'] || '1728px',
            '3xl': screens?.['3xl'] || '1536px',
            '2xl': screens?.['2xl'] || '1440px',
            xl: screens?.xl || '1280px',
            lg: screens?.lg || '1024px',
            md: screens?.md || '768px',
            sm: screens?.sm || '425px',
            xs: screens?.xs || '375px',
          },
        },
      },
    },
  )
}
