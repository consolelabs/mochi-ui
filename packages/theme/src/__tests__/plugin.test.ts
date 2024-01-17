import { mochiui } from '../plugin'
import { MochiUIPluginConfig } from '../types'

describe('Plugin', () => {
  it('case', () => {
    const config: MochiUIPluginConfig = {
      prefix: 'custom',
      defaultTheme: 'light',
      themes: {
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
          paddingLeft: '16px',
          paddingRight: '16px',
          md: {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    }

    mochiui(config)
  })
})
