import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    colorPrimary: '#8B54F7',
    colorSecondary: '#017AFF',
    textColor: '#343433',
    brandImage: './logo-full.svg',
    brandTitle: 'Console Labs',
    brandUrl: 'https://www.console.so/',
    brandTarget: '_self',
    appBg: '#F0F7FF',

    // Toolbar default and active colors
    barSelectedColor: '#1B3FE4',
  }),
})
