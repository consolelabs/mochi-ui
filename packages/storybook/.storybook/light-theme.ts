import { create, type ThemeVars } from '@storybook/theming'

export default create({
  base: 'light',

  colorPrimary: '#1570EF',
  textMutedColor: '#AAAEB3',
  textColor: '#333639',
  textInverseColor: '#F2F4F7',

  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: 'rgba(20, 21, 24, .1)',

  barTextColor: '#4C5054',
  barSelectedColor: '#1570EF',
  barBg: '#ffffff',
  barHoverColor: '#1570EF',

  inputBg: 'transparent',
  inputBorder: 'rgba(20, 21, 24, .1)',
  inputTextColor: '#333639',
})
