import { useLayoutEffect } from 'react'

export default function useLockScreenScroll(): void {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect((): (() => void) => {
    // Get original body overflow
    const wrapper = document.getElementById('__next') as HTMLElement
    const originalStyle: string = window.getComputedStyle(wrapper).overflow
    // Prevent scrolling on mount
    wrapper.style.overflow = 'hidden'
    // Re-enable scrolling when component unmounts
    return () => {
      wrapper.style.overflow = originalStyle
    }
  }, []) // Empty array ensures effect is only run on mount and unmount
}
