import clsx from 'clsx'
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'

interface TimerProps {
  time?: number
  start: boolean
  onEnd?: () => void
  className?: string
}

const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

const size = 24

const r = size / 2.5
const c = 2 * Math.PI * r

function count(
  p: MutableRefObject<number>,
  max: number,
  element: SVGCircleElement | null,
  onEnd: () => void,
) {
  if ((p.current ?? 0) <= 0) {
    onEnd?.()
    return
  }
  p.current -= 100

  if (element) {
    element.style.strokeDashoffset = String(
      c * ((100 - map(p.current, max, 0, 0, 100)) / 100),
    )
  }
}

export default function Timer(props: TimerProps) {
  const ref = useRef<SVGCircleElement>(null)
  const p = useRef(props.time ?? 5000)

  const onEnd = useCallback(() => {
    props.onEnd?.()
  }, [props])

  useEffect(() => {
    let id: any
    if (props.start && !id) {
      id = setInterval(() => {
        count(p, props.time ?? 5000, ref.current, onEnd)
      }, 100)
    }

    return () => {
      clearInterval(id)
      p.current = props.time ?? 5000
    }
  }, [onEnd, props.start, props.time])

  return (
    <svg
      className={clsx('-rotate-90', props.className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth={4}
      />
      <circle
        ref={ref}
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="#60e6a8"
        strokeLinecap="round"
        strokeWidth={4}
        strokeDasharray={c}
      />
    </svg>
  )
}
