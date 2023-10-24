module.exports = {
  content: ['./**/*.{html,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        text: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        /* heading: ['Poppins', 'sans-serif'], */
      },
      colors: {
        blue: {
          50: '#edfaff',
          100: '#d6f2ff',
          200: '#b5eaff',
          300: '#83dfff',
          400: '#48caff',
          500: '#1eabff',
          600: '#068dff',
          700: '#017aff',
          800: '#085dc5',
          900: '#0d509b',
          950: '#0e315d',
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
      },
      transitionTimingFunction: {
        rubber: 'cubic-bezier(0.68,-0.55,0.27,1.55)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        move: 'move 5s infinite 1s',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
}
