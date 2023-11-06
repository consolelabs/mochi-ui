import { mochi } from '@consolelabs/theme'

module.exports = {
  content: [
    '../components/*/src/**/*.{js,jsx,ts,tsx}',
    '../components/*/src/**/*.stories.{js,jsx,ts,tsx}',
    '../theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [mochi()],
}
