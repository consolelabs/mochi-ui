// eslint-disable-next-line import/no-import-module-exports
import { mochi } from '@consolelabs/theme'

module.exports = {
  content: [
    './**/*.{html,ts,tsx}',
    './node_modules/@consolelabs/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [mochi()],
}
