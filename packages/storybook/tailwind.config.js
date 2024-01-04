import { mochiui } from '@mochi-ui/theme'
import tailwindAnimate from 'tailwindcss-animate'

module.exports = {
  content: [
    '../web3/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../components/*/stories/**/*.stories.{js,jsx,ts,tsx}',
    '../theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    mochiui({
      themes: {
        retro: {
          colors: {
            primary: {
              solid: {
                DEFAULT: 'yellow',
                fg: 'black',
              },
            },
          },
        },
      },
    }),
  ],
}
