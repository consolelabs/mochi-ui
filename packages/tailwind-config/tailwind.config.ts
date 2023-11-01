import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: '#ffffff',
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
        },
        primary: {
          100: '#f0f7ff',
          200: '#dcecfe',
          300: '#beddfe',
          400: '#91c5fd',
          500: '#61abfa',
          600: '#3d97f7',
          700: '#017aff',
          800: '#0068d6',
          900: '#0054ad',
          1000: '#004085',
        },
        secondary: {
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
        },
        green: {
          100: '#edfdf6',
          200: '#d1fae9',
          300: '#a5f3d2',
          400: '#6ee7b5',
          500: '#36d392',
          600: '#0ea466',
          700: '#088752',
          800: '#037244',
          900: '#06603a',
          1000: '#064c2f',
        },
        yellow: {
          100: '#fff8eb',
          200: '#fff1d6',
          300: '#fee2a9',
          400: '#fdcf72',
          500: '#fbbb3c',
          600: '#db7712',
          700: '#b25e09',
          800: '#96530f',
          900: '#7f460d',
          1000: '#663a0f',
        },
        red: {
          100: '#fef1f2',
          200: '#fee1e3',
          300: '#fec8cc',
          400: '#fca6ad',
          500: '#f8727d',
          600: '#ef4352',
          700: '#e02d3c',
          800: '#ba2532',
          900: '#081b25',
          1000: '#86131d',
        },
      },
      fontSize: {
        xxs: '10px',
      },
      boxShadow: {
        input: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'input-focused':
          '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        button: '0px 0px 8px 0px rgba(0, 0, 0, 0.04)',
        'button-focused-primary':
          '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'button-focused-gray':
          '0px 0px 0px 4px #F4F3F2, 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        'button-focused-destructive':
          '0px 0px 0px 4px rgba(224, 45, 60, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
      width: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
export default config
