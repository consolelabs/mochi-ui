import { mochiui } from '../plugin'
import { MochiUIPluginConfig } from '../types'

describe('Plugin', () => {
  it('should allow users to configure themes, breakpoints and spacings', () => {
    const config: MochiUIPluginConfig = {
      prefix: 'custom',
      defaultTheme: 'light',
      themes: {
        dark: {
          colors: {
            primary: {
              solid: {
                DEFAULT: 'blue',
              },
            },
          },
        },
        retro: {
          extend: 'light',
          colors: {
            primary: {
              solid: {
                DEFAULT: 'yellow',
              },
            },
          },
        },
      },
      container: {
        landing: {
          maxWidth: '1280px',

          paddingLeft: '1rem',
          paddingRight: '1rem',

          md: {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
        },
      },
      screens: {
        xs: '500px',
      },
    }

    mochiui(config)
  })
})
