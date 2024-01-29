export const gray = {
  0: '#ffffff',
  50: '#FCFCFC',
  100: '#faf9f7',
  150: '#f4f3f2',
  200: '#eeedec',
  300: '#e5e4e3',
  400: '#d4d3d0',
  500: '#adacaa',
  600: '#848281',
  700: '#4c4d4d',
  800: '#343433',
  900: '#1a1a19',
  1000: '#000000',
}

export const neutral = {
  0: '#ffffff',
  50: '#F9FAFB',
  100: '#F2F4F7',
  150: '#f4f3f2', // NOTE: Missing in design system on figma.
  200: '#EAECF0',
  300: '#D6DADD',
  400: '#AAAEB3',
  500: '#787E85',
  600: '#5D6267',
  700: '#4C5054',
  800: '#333639',
  900: '#232426',
  1000: '#000000', // NOTE: Missing in design system on figma.
}

export const blue = {
  50: '#EFF8FF',
  100: '#D1E9FF',
  200: '#B2DDFF',
  300: '#84CAFF',
  400: '#53B1FD',
  500: '#2E90FA',
  600: '#1570EF',
  700: '#175CD3',
  800: '#1849A9',
  900: '#194185',
  1000: '#004085', // NOTE: Missing in design system on figma.
}

export const purple = {
  50: '#F4F3FF', // NOTE: Missing in design system on figma.
  100: '#EBE9FE',
  200: '#D9D6FE',
  300: '#BDB4FE',
  400: '#9B8AFB',
  500: '#7A5AF8',
  600: '#6938EF',
  700: '#5925DC',
  800: '#4A1FB8',
  900: '#3E1C96',
  1000: '#451d95', // NOTE: Missing in design system on figma.
}

export const green = {
  50: '#ECFDF3', // Missing in Design System
  100: '#D1FADF',
  200: '#A6F4C5',
  300: '#6CE9A6',
  400: '#32D583',
  500: '#12B76A',
  600: '#039855',
  700: '#027A48',
  800: '#05603A',
  900: '#054F31',
  1000: '#064c2f', // Missing in Design System
}

export const yellow = {
  50: '#FFFAEB', // Missing in Design System
  100: '#FEF0C7',
  200: '#FEDF89',
  300: '#FEC84B',
  400: '#FDB022',
  500: '#F79009',
  600: '#DC6803',
  700: '#B54708',
  800: '#93370D',
  900: '#7A2E0E',
  1000: '#663a0f', // Missing in Design System
}

export const red = {
  50: '#FEF3F2', // Missing in Design System
  100: '#FEE4E2',
  200: '#FECDCA',
  300: '#FDA29B',
  400: '#F97066',
  500: '#F04438',
  600: '#D92D20',
  700: '#B42318',
  800: '#912018',
  900: '#7A271A',
  1000: '#86131d', // Missing in Design System
}

export const commonColors = {
  current: 'currentColor',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  gray,
  blue,
  purple,
  green,
  yellow,
  red,
  primary: blue,
  secondary: purple,
  success: green,
  warning: yellow,
  danger: red,
  neutral,
}

export type CommonColors = typeof commonColors
