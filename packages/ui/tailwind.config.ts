// tailwind config is required for editor support
import type { Config } from 'tailwindcss'
import { mochi } from 'tailwind-config/plugin'

const config: Pick<Config, 'prefix' | 'presets' | 'theme' | 'plugins'> = {
  theme: {},
  plugins: [mochi()],
}

export default config
