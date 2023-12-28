import { mochiui } from '@mochi-ui/theme'

module.exports = {
  content: [
    '../web3/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [mochiui()],
}
