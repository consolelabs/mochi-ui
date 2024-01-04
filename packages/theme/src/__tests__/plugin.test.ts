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
                DEFAULT: 'yellow'
              }
            }
          },
        },
      },
    }

    mochiui(config)
  })
})
