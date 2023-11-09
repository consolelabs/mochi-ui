import * as RadixSwitch from '@radix-ui/react-switch'
import { useId } from 'react'
import { switchInput, SwitchProps } from '@consolelabs/theme'

const {
  switchContainerCva,
  switchThumbCva,
  switchWrapperClsx,
  switchRootClsx,
  switchThumbClsx,
} = switchInput

export default function Switch(props: SwitchProps) {
  const { label, checked = false, disabled = false, size, onChange } = props
  const id = useId()

  return (
    <div className={switchWrapperClsx({})}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <RadixSwitch.Root
        checked={checked}
        className={switchRootClsx({
          className: switchContainerCva({ size }),
          disabled,
          checked,
        })}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
      >
        <RadixSwitch.Thumb
          className={switchThumbClsx({
            className: switchThumbCva({ size }),
            size,
            checked,
          })}
          style={{
            boxShadow:
              '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
          }}
        />
      </RadixSwitch.Root>
    </div>
  )
}
