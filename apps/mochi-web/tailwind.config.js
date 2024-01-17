// eslint-disable-next-line import/no-import-module-exports
import { mochiui, semanticColors } from '@mochi-ui/theme'
import tailwindAnimate from 'tailwindcss-animate'

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './**/*.{html,ts,tsx}',
    '!node_modules',
    './node_modules/@mochi-ui/theme/src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', defaultTheme.fontFamily.mono],
      },
      colors: {
        feed: {
          bg: {
            DEFAULT: '#141518',
            hover: '#1a1b1f',
          },
          border: {
            DEFAULT: '#343433',
          },
        },
        footer: {
          title: '#474645',
          body: '#A8A6A4',
        },
        home: {
          gray: {
            p: '#70707B',
            600: '#F2F2F2',
            700: '#7A7E85',
          },
        },
        dashboard: {
          green: {
            1: '#3BA55C',
          },
          gray: {
            1: '#F5F5F5',
            2: '#9399A1',
            3: '#E4E4E4',
            4: '#979CA3',
            5: '#F8F8F8',
            6: '#DFE0E0',
            7: '#EBEBEB',
            8: '#7A7E85',
            9: '#F4F4F7',
          },
          red: {
            1: '#FD5E59',
          },
        },
        foreground: {
          DEFAULT: '#111827',
          secondary: '#4B5563',
        },
        discord: {
          DEFAULT: '#6875ED',
        },
        telegram: {
          DEFAULT: '#26A8EA',
        },
        mochi: {
          DEFAULT: '#E88B88',
          50: '#FBE9E8',
          100: '#F9DEDD',
          200: '#F4C9C8',
          300: '#F0B5B3',
          400: '#ECA09D',
          500: '#E88B88',
          600: '#E47673',
          700: '#E0615D',
          800: '#DC4D48',
          900: '#D73833',
          gray: '#F6F5F5',
        },
        rarity: {
          common: '#98A3B6',
          uncommon: '#24D3EE',
          rare: ' #7AA5F4',
          legendary: '#f59e0b',
          mythic: '#FFA3A9',
          epic: '#FFA3A9',
        },
        white: {
          DEFAULT: '#fafafd',
          pure: '#FFFFFF',
        },
      },
      blur: {
        '4xl': '128px',
      },
      boxShadow: {
        full: '0px 4px 16px rgba(0, 0, 0, 0.15)',
        card: '0px 0.883215px 2.64964px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        move: {
          '0%, 100%': {
            top: '-28px',
          },
        },
        shake: {
          '0%': {
            transform: 'translateX(0rem)',
          },
          '25%': {
            transform: 'translateX(-1rem)',
          },
          '75%': {
            transform: 'translateX(1rem)',
          },
          '100%': {
            transform: 'translateX(0rem)',
          },
        },
        'new-tx-fade-out': {
          '0%': {
            backgroundColor: semanticColors.light.success.outline.DEFAULT,
          },
          '100%': {
            backgroundColor: 'transparent',
          },
        },
      },
      transitionTimingFunction: {
        rubber: 'cubic-bezier(0.68,-0.55,0.27,1.55)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        move: 'move 5s infinite 1s',
        shake: 'shake .2s linear infinite',
        'new-tx-fade-out': 'new-tx-fade-out 3s ease-in-out forwards',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
    },
  },
  plugins: [mochiui({ addCommonColors: true }), tailwindAnimate],
}
