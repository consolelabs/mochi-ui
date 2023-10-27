import cc from 'clsx'
import { Switch as HS } from '@headlessui/react'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  label?: string
  checked?: boolean
  onChange?: (value: boolean) => void
}

const Switch = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { label, checked = false, onChange } = props

    return (
      <div className="flex gap-2 items-center text-sm">
        <HS
          ref={ref}
          checked={checked}
          onChange={onChange}
          className={cc('transition', 'w-12 h-6 rounded-full p-[3px]', {
            'bg-mochi': checked,
            'bg-dashboard-gray-3': !checked,
          })}
        >
          <div
            style={{
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            className={cc(
              'rounded-full aspect-square bg-white h-full transition',
              {
                'translate-x-0': !checked,
                'translate-x-6': checked,
              },
            )}
          />
        </HS>
        {label && (
          <div className="cursor-default" onClick={() => onChange?.(!checked)}>
            {label}
          </div>
        )}
      </div>
    )
  },
)

export default Switch
