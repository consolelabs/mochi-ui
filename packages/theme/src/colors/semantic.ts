import { commonColors, gray } from './common'

const primary = commonColors.blue
const secondary = commonColors.purple
const success = commonColors.green
const warning = commonColors.yellow
const danger = commonColors.red

export const semanticColors = {
  light: {
    primary: {
      solid: {
        DEFAULT: primary['700'], // for background
        fg: commonColors.white, // for foreground
        hover: primary['800'],
        active: primary['800'],
        disable: primary['400'],
        focus: primary['400'],
      },
      outline: {
        DEFAULT: primary['100'],
        fg: primary['700'],
        border: primary['300'],
        hover: primary['200'],
        active: primary['200'],
        'disable-fg': primary['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: primary['700'],
        hover: primary['100'],
        active: primary['800'],
        'disable-fg': gray['400'],
      },
    },
    secondary: {
      solid: {
        DEFAULT: secondary['700'], // for background
        fg: commonColors.white, // for foreground
        hover: secondary['800'],
        active: secondary['800'],
        disable: secondary['400'],
        focus: secondary['400'],
      },
      outline: {
        DEFAULT: secondary['100'],
        fg: secondary['700'],
        border: secondary['300'],
        hover: secondary['200'],
        active: secondary['200'],
        'disable-fg': secondary['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: secondary['700'],
        hover: secondary['100'],
        active: secondary['800'],
        'disable-fg': gray['400'],
      },
    },
    success: {
      solid: {
        DEFAULT: success['700'], // for background
        fg: commonColors.white, // for foreground
        hover: success['800'],
        active: success['800'],
        disable: success['400'],
        focus: success['400'],
      },
      outline: {
        DEFAULT: success['100'],
        fg: success['700'],
        border: success['300'],
        hover: success['200'],
        active: success['200'],
        'disable-fg': success['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: success['700'],
        hover: success['100'],
        active: success['800'],
        'disable-fg': gray['400'],
      },
    },
    warning: {
      solid: {
        DEFAULT: warning['700'], // for background
        fg: commonColors.white, // for foreground
        hover: warning['800'],
        active: warning['800'],
        disable: warning['400'],
        focus: warning['400'],
      },
      outline: {
        DEFAULT: warning['100'],
        fg: warning['700'],
        border: warning['300'],
        hover: warning['200'],
        active: warning['200'],
        'disable-fg': warning['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: warning['700'],
        hover: warning['100'],
        active: warning['800'],
        'disable-fg': gray['400'],
      },
    },
    danger: {
      solid: {
        DEFAULT: danger['700'], // for background
        fg: commonColors.white, // for foreground
        hover: danger['800'],
        active: danger['800'],
        disable: danger['400'],
        focus: danger['400'],
      },
      outline: {
        DEFAULT: danger['100'],
        fg: danger['700'],
        border: danger['300'],
        hover: danger['200'],
        active: danger['200'],
        'disable-fg': danger['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: danger['700'],
        hover: danger['100'],
        active: danger['800'],
        'disable-fg': gray['400'],
      },
    },
    text: {
      primary: commonColors.gray['800'],
      secondary: commonColors.gray['500'],
      tertiary: commonColors.gray['300'],
      icon: commonColors.gray['800'],
    },
    background: {
      body: commonColors.white,
      surface: commonColors.white, // card, sheet, drawer
      popup: commonColors.white, // dropdown, menu
      tooltip: commonColors.white, // slider tooltip
      backdrop: '#00000066',
    },
    divider: commonColors.gray['400'],
  },
  dark: {
    primary: {
      solid: {
        DEFAULT: primary['700'], // for background
        fg: commonColors.white, // for foreground
        hover: primary['800'],
        active: primary['800'],
        disable: primary['400'],
        focus: primary['400'],
      },
      outline: {
        DEFAULT: primary['100'],
        fg: primary['700'],
        border: primary['300'],
        hover: primary['200'],
        active: primary['200'],
        'disable-fg': primary['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: primary['700'],
        hover: primary['100'],
        active: primary['800'],
        'disable-fg': gray['400'],
      },
    },
    secondary: {
      solid: {
        DEFAULT: secondary['700'], // for background
        fg: commonColors.white, // for foreground
        hover: secondary['800'],
        active: secondary['800'],
        disable: secondary['400'],
        focus: secondary['400'],
      },
      outline: {
        DEFAULT: secondary['100'],
        fg: secondary['700'],
        border: secondary['300'],
        hover: secondary['200'],
        active: secondary['200'],
        'disable-fg': secondary['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: secondary['700'],
        hover: secondary['100'],
        active: secondary['800'],
        'disable-fg': gray['400'],
      },
    },
    success: {
      solid: {
        DEFAULT: success['700'], // for background
        fg: commonColors.white, // for foreground
        hover: success['800'],
        active: success['800'],
        disable: success['400'],
        focus: success['400'],
      },
      outline: {
        DEFAULT: success['100'],
        fg: success['700'],
        border: success['300'],
        hover: success['200'],
        active: success['200'],
        'disable-fg': success['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: success['700'],
        hover: success['100'],
        active: success['800'],
        'disable-fg': gray['400'],
      },
    },
    warning: {
      solid: {
        DEFAULT: warning['700'], // for background
        fg: commonColors.white, // for foreground
        hover: warning['800'],
        active: warning['800'],
        disable: warning['400'],
        focus: warning['400'],
      },
      outline: {
        DEFAULT: warning['100'],
        fg: warning['700'],
        border: warning['300'],
        hover: warning['200'],
        active: warning['200'],
        'disable-fg': warning['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: warning['700'],
        hover: warning['100'],
        active: warning['800'],
        'disable-fg': gray['400'],
      },
    },
    danger: {
      solid: {
        DEFAULT: danger['700'], // for background
        fg: commonColors.white, // for foreground
        hover: danger['800'],
        active: danger['800'],
        disable: danger['400'],
        focus: danger['400'],
      },
      outline: {
        DEFAULT: danger['100'],
        fg: danger['700'],
        border: danger['300'],
        hover: danger['200'],
        active: danger['200'],
        'disable-fg': danger['400'],
      },
      plain: {
        DEFAULT: commonColors.white,
        fg: danger['700'],
        hover: danger['100'],
        active: danger['800'],
        'disable-fg': gray['400'],
      },
    },
    text: {
      primary: commonColors.gray['800'],
      secondary: commonColors.gray['500'],
      tertiary: commonColors.gray['300'],
      icon: commonColors.gray['800'],
    },
    background: {
      body: commonColors.white,
      surface: commonColors.white, // card, sheet, drawer
      popup: commonColors.white, // dropdown, menu
      tooltip: commonColors.white, // slider tooltip
      backdrop: '#00000066',
    },
    divider: commonColors.gray['400'],
  },
}
