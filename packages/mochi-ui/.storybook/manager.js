import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    colorPrimary: '#1B3FE4',
    colorSecondary: '#1B3FE4',
    textColor: '#393E40',

    // brandImage: './logo.svg',
    brandTitle: 'consolelabs UI documentation',
    brandUrl: 'https://www.consolelabs.com/',
    brandTarget: '_self',

    // Toolbar default and active colors
    barSelectedColor: '#1B3FE4',
  }),
})
