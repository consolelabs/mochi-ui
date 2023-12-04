import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DiscordColored,
  TelegramColored,
  Discord,
  Telegram,
  SlackColored,
  Slack,
} from '@mochi-ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '../src/select'

const items = [
  {
    label: 'Discord',
    subtitle: 'Chat and voice communication platform',
    value: '1',
    key: 'Discord',
    icon: <DiscordColored />,
    rightIcon: <Discord />,
  },
  {
    label: 'Telegram',
    subtitle: 'Instant messaging app',
    value: '2',
    key: 'Telegram',
    icon: <TelegramColored />,
    rightIcon: <Telegram />,
  },
  {
    label: 'Slack',
    subtitle: 'Collaboration hub for work',
    value: '3',
    key: 'Slack',
    icon: <SlackColored />,
    rightIcon: <Slack />,
  },
]

describe('Select', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, value }) => (
            <SelectItem key={key} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('calls onChange when an item is selected', async () => {
    const handleChange = jest.fn()
    const { getByTestId, getAllByRole } = render(
      <Select onChange={handleChange}>
        <SelectTrigger data-testid="trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, value }) => (
            <SelectItem key={key} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    )
    const selectTrigger = getByTestId('trigger')
    await act(async () => {
      await userEvent.click(selectTrigger)
    })

    await act(async () => {
      await userEvent.click(getAllByRole('option')[0])
    })
    expect(handleChange).toHaveBeenCalledWith(items[0].value)
  })

  it('updates the SelectValue component when an item is selected', async () => {
    const { getAllByRole, getByRole } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, value }) => (
            <SelectItem key={key} value={value} role="option">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    )
    const selectTrigger = getByRole('combobox')
    await act(async () => {
      await userEvent.click(selectTrigger)
    })

    await act(async () => {
      await userEvent.click(getAllByRole('option')[0])
    })
    expect(selectTrigger).toHaveTextContent(items[0].label)
  })

  it('renders SelectGroup component', async () => {
    const { getByText, getByRole } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          <SelectGroup>
            <SelectLabel>Socials</SelectLabel>
            {items.map(({ key, label, ...props }) => (
              <SelectItem key={key} leftIcon={props.icon} value={props.value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>,
    )
    const selectTrigger = getByRole('combobox')

    await act(async () => {
      await userEvent.click(selectTrigger)
    })

    expect(getByText('Socials')).toBeInTheDocument()
  })

  it('renders SelectSeparator component', async () => {
    const { getByRole } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          <SelectSeparator />
        </SelectContent>
      </Select>,
    )
    const selectTrigger = getByRole('combobox')

    await act(async () => {
      await userEvent.click(selectTrigger)
    })
    expect(getByRole('presentation')).toBeInTheDocument()
  })
})
