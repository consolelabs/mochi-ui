import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface AnimateChangeInHeightProps {
  children: React.ReactNode
  className?: string
  style?: object
}

export const AnimateHeight: React.FC<AnimateChangeInHeightProps> = ({
  children,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height
        setHeight(observedHeight)
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <m.div
      className={clsx(className, 'overflow-hidden')}
      style={{ height, ...style }}
      animate={{ height }}
    >
      <div ref={containerRef}>{children}</div>
    </m.div>
  )
}
