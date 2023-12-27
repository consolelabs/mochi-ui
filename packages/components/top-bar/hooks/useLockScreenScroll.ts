import { useLayoutEffect } from 'react'

export function useLockScreenScroll(): void {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect((): (() => void) => {
    // Get original body overflow
    const wrapper = document?.body as HTMLElement
    let originalStyle = ''

    if (wrapper) {
      originalStyle = window?.getComputedStyle(wrapper)?.overflow || 'visible'
      // Prevent scrolling on mount
      wrapper.style.overflow = 'hidden'
      // Re-enable scrolling when component unmounts
    }

    return () => {
      if (wrapper) {
        wrapper.style.overflow = originalStyle
      }
    }
  }, []) // Empty array ensures effect is only run on mount and unmount
}
