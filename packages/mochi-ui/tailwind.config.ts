// tailwind config is required for editor support
import type { Config } from 'tailwindcss'
import sharedConfig from 'tailwind-config/tailwind.config'

const config: Pick<Config, 'prefix' | 'presets' | 'theme'> = {
  prefix: 'mui-',
  presets: [sharedConfig],
  theme: {
    extend: {
      fontSize: {
        xxs: '10px',
      },
      boxShadow: {
        input: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'input-focused':
          '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
      width: {
        18: '4.5rem',
      },
    },
  },
}

export default config
