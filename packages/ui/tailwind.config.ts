// tailwind config is required for editor support
import type { Config } from 'tailwindcss'
import { consolelabs } from 'tailwind-config/plugin'

const config: Pick<Config, 'prefix' | 'presets' | 'theme' | 'plugins'> = {
  theme: {},
  plugins: [consolelabs()],
}

export default config
