import { mochi } from 'tailwind-config/plugin'

module.exports = {
  content: [
    '../components/*/src/**/*.{js,jsx,ts,tsx}',
    '../components/*/src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  plugins: [mochi()],
}
