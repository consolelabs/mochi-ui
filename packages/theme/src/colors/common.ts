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
  50: '#F9FAFB',
  100: '#F2F4F7',
  200: '#EAECF0',
  300: '#D6DADD',
  400: '#AAAEB3',
  500: '#787E85',
  600: '#5D6267',
  700: '#4C5054',
  800: '#333639',
  900: '#17181D',
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
}

export const purple = {
  50: '#f8f5ff',
  100: '#f8f5ff',
  200: '#efe7fe',
  300: '#e4d7fe',
  400: '#ccb4fd',
  500: '#af89fa',
  600: '#9e70fa',
  700: '#8a54f7',
  800: '#6d35de',
  900: '#5221b5',
  1000: '#451d95',
}

export const green = {
  50: '#ECFDF3',
  100: '#D1FADF',
  200: '#A6F4C5',
  300: '#6CE9A6',
  400: '#32D583',
  500: '#12B76A',
  600: '#039855',
  700: '#027A48',
  800: '#05603A',
  900: '#054F31',
}

export const yellow = {
  50: '#FFFAEB',
  100: '#FEF0C7',
  200: '#FEDF89',
  300: '#FEC84B',
  400: '#FDB022',
  500: '#F79009',
  600: '#DC6803',
  700: '#B54708',
  800: '#93370D',
  900: '#7A2E0E',
}

export const red = {
  50: '#FEF3F2',
  100: '#FEE4E2',
  200: '#FECDCA',
  300: '#FDA29B',
  400: '#F97066',
  500: '#F04438',
  600: '#D92D20',
  700: '#B42318',
  800: '#912018',
  900: '#7A271A',
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
