import { select } from './styles'
import { Combobox, Transition } from '@headlessui/react'
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Input } from '../Input'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

type Option = {
  label: string
  value: string
}

type Props = Parameters<typeof select>[0] & {
  name?: string
  value?: string | string[]
  options: Option[]
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  onChange?: (value: string | string[]) => void
  renderOption?: (option: Option) => JSX.Element
}

export const Select = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      name,
      value: _value,
      options,
      multiple = false,
      searchable = false,
      placeholder = 'Select an option',
      className,
      onChange: _onChange,
      renderOption,
      appearance,
    } = props

    const [customOptions, setCustomOptions] = useState<Array<Option>>([])

    // eslint-disable-next-line
    const value = !_value ? (multiple ? [] : _value ?? '') : _value

    const [query, setQuery] = useState('')

    const onChange = useCallback(
      (v: Array<string> | string) => {
        if (Array.isArray(v)) {
          const customValue = v.find(
            (value) =>
              !options.concat(customOptions).some((o) => o.value === value),
          )
          if (customValue) {
            if (customOptions.some((co) => co.value === customValue)) {
              setCustomOptions((co) =>
                co.filter((c) => c.value !== customValue),
              )
            } else {
              setCustomOptions((co) =>
                co.concat([{ label: customValue, value: customValue }]),
              )
            }
          }
        }

        _onChange?.(v)
      },
      [_onChange, customOptions, options],
    )

    const selectedOption = useMemo(() => {
      if (multiple) {
        return options
          .concat(customOptions)
          .filter((option) => value?.includes(option.value))
      }

      return options
        .concat(customOptions)
        .find((option) => option.value === value)
    }, [options, value, multiple, customOptions])

    const selectedOptionLabel = useMemo(() => {
      if (
        !selectedOption ||
        (Array.isArray(selectedOption) && selectedOption.length === 0)
      ) {
        return placeholder
      }

      if (Array.isArray(selectedOption)) {
        return (
          <div className="flex flex-wrap gap-1 text-sm">
            {selectedOption.map((option) => {
              return (
                <span
                  className="py-0.5 px-2 rounded bg-dashboard-gray-6"
                  key={option.value}
                >
                  {renderOption ? renderOption(option) : option.label}
                </span>
              )
            })}
          </div>
        )
      }

      return renderOption ? renderOption(selectedOption) : selectedOption.label
    }, [selectedOption, placeholder, renderOption])

    const filteredOptions = useMemo(() => {
      if (!query) {
        return options.concat(customOptions)
      }

      try {
        const regexp = new RegExp(query, 'gi')
        return options.concat(customOptions).filter((option) => {
          return regexp.test(option.label)
        })
      } catch {
        return options.concat(customOptions)
      }
    }, [query, options, customOptions])

    return (
      <Combobox
        // @ts-ignore
        value={value}
        // @ts-ignore
        onChange={onChange}
        name={name}
        // @ts-ignore
        multiple={multiple}
        className="relative"
        as="div"
      >
        {({ open }) => {
          return (
            <>
              {searchable && (
                <Combobox.Input
                  ref={ref}
                  as={Input}
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  appearance={appearance}
                />
              )}
              <Combobox.Button
                type="button"
                className={select({
                  appearance,
                  className: clsx(
                    'flex justify-between items-center',
                    className,
                    {
                      'absolute top-0 left-0 h-full': searchable,
                      invisible: searchable && open,
                    },
                  ),
                })}
              >
                {selectedOptionLabel}
                <Icon className="w-4 h-4" icon="heroicons:chevron-down" />
                {(Array.isArray(value) ? value.length > 0 : !!value) && (
                  <div
                    className="flex absolute top-0 right-0 justify-center items-center mt-2.5 mr-3 w-5 h-5 rounded-full bg-dashboard-gray-6"
                    onClick={(e) => {
                      e.preventDefault()
                      onChange(multiple ? [] : '')
                      setCustomOptions([])
                    }}
                  >
                    <Icon className="w-4 h-4" icon="heroicons:x-mark" />
                  </div>
                )}
              </Combobox.Button>
              <Transition
                enter="transition duration-75 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-pure py-1 text-sm shadow-lg focus:outline-none border border-black/10 z-10">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                      return (
                        <Combobox.Option
                          key={option.value}
                          value={option.value}
                          as={Fragment}
                        >
                          {({ active, selected }) => {
                            return (
                              <li
                                className={clsx(
                                  `flex items-center gap-x-1 px-3 py-2 cursor-pointer hover:bg-mochi-50 transition`,
                                  {
                                    'bg-mochi-50': active && !renderOption,
                                  },
                                )}
                              >
                                {renderOption ? (
                                  renderOption(option)
                                ) : (
                                  <>
                                    {selected ? (
                                      <Icon
                                        icon="heroicons:check-20-solid"
                                        className="w-4 h-4"
                                      />
                                    ) : (
                                      <div className="w-4 h-4" />
                                    )}{' '}
                                    {option.label}
                                  </>
                                )}
                              </li>
                            )
                          }}
                        </Combobox.Option>
                      )
                    })
                  ) : searchable && query ? (
                    <Combobox.Option value={query} as={Fragment}>
                      {({ active }) => {
                        return (
                          <li
                            className={`px-3 py-2 cursor-pointer hover:bg-mochi-50 transition ${
                              active && 'bg-mochi-50'
                            }`}
                          >
                            No result, add{' '}
                            <code className="py-0.5 px-2 rounded bg-dashboard-gray-6">
                              {query}
                            </code>{' '}
                            as an option
                          </li>
                        )
                      }}
                    </Combobox.Option>
                  ) : (
                    <li className="px-3 py-2 cursor-pointer hover:bg-mochi-50 transition">
                      No result.
                    </li>
                  )}
                </Combobox.Options>
              </Transition>
            </>
          )
        }}
      </Combobox>
    )
  },
)
