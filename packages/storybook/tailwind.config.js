import { mochiui } from '@mochi-ui/theme'
import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    '../web3/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [mochiui(), tailwindAnimate],
}
