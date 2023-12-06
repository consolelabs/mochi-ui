import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { contentEditable } from '@mochi-ui/theme'

const { contentEditableClsx } = contentEditable

function normalizeHtml(str: string): string {
  return (
    str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>')
  )
}

function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('')
  el.appendChild(target)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection()
    if (sel !== null) {
      const range = document.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (el instanceof HTMLElement) el.focus()
  }
}

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
  target: { value: string }
}
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
type DivProps = Modify<
  JSX.IntrinsicElements['div'],
  { onChange?: (event: ContentEditableEvent) => void }
>

interface ContentEditableProps extends DivProps {
  value?: string
  tagName?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const ContentEditable = forwardRef<HTMLElement, ContentEditableProps>(
  (
    {
      value = '',
      tagName = 'div',
      placeholder,
      className,
      disabled,
      children,
      onBlur,
      onKeyUp,
      onKeyDown,
      onChange,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLElement>(null)
    const lastHtml = useRef<string>(value)

    useImperativeHandle(ref, () => innerRef.current!)

    const emitChange = (originalEvt: React.SyntheticEvent<any>) => {
      if (!innerRef.current) return

      const html = innerRef.current.innerHTML
      if (onChange && html !== lastHtml.current) {
        // Clone event with Object.assign to avoid
        // "Cannot assign to read only property 'target' of object"
        const evt = Object.assign({}, originalEvt, {
          target: {
            value: html,
          },
        })
        onChange(evt)
      }
      lastHtml.current = html
    }

    useEffect(() => {
      if (!innerRef.current) return
      if (normalizeHtml(innerRef.current.innerHTML) !== normalizeHtml(value)) {
        innerRef.current.innerHTML = value
      }
      lastHtml.current = value
      replaceCaret(innerRef.current)
    }, [value, tagName, placeholder, className, disabled])

    return createElement(
      tagName,
      {
        ...props,
        ref: innerRef,
        onInput: emitChange,
        onBlur: onBlur || emitChange,
        onKeyUp: onKeyUp || emitChange,
        onKeyDown: onKeyDown || emitChange,
        contentEditable: !disabled,
        dangerouslySetInnerHTML: { __html: value },
        placeholder,
        className: contentEditableClsx({ className }),
      },
      children,
    )
  },
)

ContentEditable.displayName = 'ContentEditable'

export { ContentEditable, type ContentEditableProps }
