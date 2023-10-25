import { Icon } from '@iconify/react'
import { ForwardedRef, forwardRef, ReactNode, useState } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import cc from 'clsx'

const input = cva(
  [
    'text-sm px-3 py-2 rounded-lg caret-mochi transition-all duration-200 w-full leading-relaxed',
    'border hover:border-mochi focus:border-mochi !outline-none',
  ],
  {
    variants: {
      appearance: {
        default: ['border-black/10'],
        invalid: ['border-mochi-900'],
      },
    },
    defaultVariants: {
      appearance: 'default',
    },
  },
)

const affixPrefix = cva(
  [
    'text-sm absolute h-[calc(100%-2px)] px-3 py-2 text-dashboard-gray-2 top-[1px] leading-relaxed',
  ],
  {
    variants: {
      type: {
        prefix: ['left-0 rounded-l-lg'],
        suffix: ['right-0 rounded-r-lg'],
      },
      appearance: {
        default: ['bg-black/5'],
        bgless: ['bg'],
      },
    },
    defaultVariants: {
      appearance: 'default',
    },
  },
)

type Props = VariantProps<typeof input> &
  Omit<JSX.IntrinsicElements['input'], 'prefix' | 'suffix'> & {
    suffix?: ReactNode
    prefix?: ReactNode
    suffixProps?: VariantProps<typeof affixPrefix>
    prefixProps?: Parameters<typeof affixPrefix>
    allowClear?: boolean
  }

const Input = forwardRef(
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
            className={affixPrefix({ ...prefixProps, type: 'prefix' })}
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
            className={affixPrefix({ ...suffixProps, type: 'suffix' })}
          >
            {suffix}
          </span>
        )}
        {allowClear && value ? (
          <button
            type="button"
            className={cc(
              'flex absolute right-0 top-1/2 justify-center items-center w-5 h-5 rounded-full -translate-y-1/2 bg-dashboard-gray-6',
              {
                'mr-3': !suffix,
                'mr-5': suffix,
              },
            )}
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

export default Input
