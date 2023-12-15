import { keyframes } from '@stitches/react'
import { DrawerProps } from './type'

export const leftAnchorShow = {
  '0%': { transform: 'translate(-100%, 0)' },
  '100%': { transform: 'translate(0, 0)' },
}

export const rightAnchorShow = {
  '0%': { transform: 'translate(100%, 0)' },
  '100%': { transform: 'translate(0, 0)' },
}

export const topAnchorShow = {
  '0%': { transform: 'translate(0, -100%)' },
  '100%': { transform: 'translate(0, 0)' },
}

export const bottomAnchorShow = {
  '0%': { transform: 'translate(0, 100%)' },
  '100%': { transform: 'translate(0, 0)' },
}

export const getTransitionByAnchor = (anchor: DrawerProps['anchor']) => {
  switch (anchor) {
    case 'right':
      return keyframes(rightAnchorShow)
    case 'top':
      return keyframes(topAnchorShow)
    case 'bottom':
      return keyframes(bottomAnchorShow)
    case 'left':
    default:
      return keyframes(leftAnchorShow)
  }
}
