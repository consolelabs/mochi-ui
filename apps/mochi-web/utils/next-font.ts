import localFont from 'next/font/local'

export const interFont = localFont({
  src: [
    {
      path: '../assets/Inter-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/Inter-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/Inter-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/Inter-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/Inter-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/Inter-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/Inter-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  preload: true,
  fallback: ['sans-serif', 'system-ui', 'arial'],
  display: 'swap',
})
