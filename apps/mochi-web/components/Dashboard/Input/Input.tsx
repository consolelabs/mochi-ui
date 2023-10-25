import { Icon } from '@iconify/react'
import { ForwardedRef, forwardRef, ReactNode, useState } from 'react'
import { affix, input } from './styles'

type Props = Omit<JSX.IntrinsicElements['input'], 'prefix' | 'suffix'> &
  Parameters<typeof input>[0] & {
    suffix?: ReactNode
    prefix?: ReactNode
    suffixProps?: Parameters<typeof affix>[0]
    prefixProps?: Parameters<typeof affix>[0]
    allowClear?: boolean
  }

export const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      value = '',
      suffix,
      prefix,
      className,
      appearance,
      suffixProps,
      prefixProps,
      allowClear = true,
      type,
      placeholder,
      onChange = () => {},
      onBlur,
    } = props

    const [prefixWidth, setPrefixWidth] = useState(0)
    const [suffixWidth, setSuffixWidth] = useState(0)

    return (
      <div className="overflow-hidden relative w-full">
        {prefix && (
          <span
            ref={(ref) => {
              if (ref) {
                setPrefixWidth(ref.clientWidth)
              }
            }}
            className={affix({ ...prefixProps, type: 'prefix' })}
          >
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={input({ className, appearance })}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            paddingLeft: prefixWidth + 12,
            paddingRight: suffixWidth + 12,
          }}
        />
        {suffix && (
          <span
            ref={(ref) => {
              if (ref) {
                setSuffixWidth(ref.clientWidth)
              }
            }}
            className={affix({ ...suffixProps, type: 'suffix' })}
          >
            {suffix}
          </span>
        )}
        {allowClear && value ? (
          <button
            type="button"
            className="flex absolute right-0 top-1/2 justify-center items-center mr-3 w-5 h-5 rounded-full -translate-y-1/2 bg-dashboard-gray-6"
            onClick={(e) => {
              e.preventDefault()
              onChange && onChange({ target: { value: '' } } as any)
            }}
          >
            <Icon className="w-4 h-4" icon="heroicons:x-mark" />
          </button>
        ) : (
          ''
        )}
      </div>
    )
  },
)
