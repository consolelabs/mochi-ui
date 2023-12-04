import { mochiui } from '@mochi-ui/theme'

module.exports = {
  content: [
    '../components/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [mochiui()],
}
