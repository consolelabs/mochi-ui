import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'
import { input } from './styles'

type Props = JSX.IntrinsicElements['input'] &
  Parameters<typeof input>[0] & { value?: File[] }

export const FileInput = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      name,
      appearance,
      value,
      placeholder = 'Upload a file',
      onChange,
      onBlur,
    } = props

    return (
      <div
        className={input({
          appearance,
          className: 'relative flex gap-2 items-center bg-white-pure',
        })}
      >
        <button
          type="button"
          className="py-0.5 px-2 font-medium rounded-lg bg-dashboard-gray-6"
        >
          Upload
        </button>
        <div className={clsx('flex-1', { 'text-[#3886FC] pr-10': !!value })}>
          {value?.[0]?.name || placeholder}
        </div>
        <input
          ref={ref}
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        {value && (
          <button
            type="button"
            className="flex absolute top-0 right-0 justify-center items-center mt-2.5 mr-3 w-5 h-5 rounded-full bg-dashboard-gray-6"
            onClick={(e) => {
              e.preventDefault()
              onChange && onChange({ target: { files: undefined } } as any)
            }}
          >
            <Icon className="w-4 h-4" icon="heroicons:x-mark" />
          </button>
        )}
      </div>
    )
  },
)
