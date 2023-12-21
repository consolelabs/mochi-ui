import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  DiscordColored,
  Github,
  GoogleColored,
  MailLine,
  TelegramColored,
  X,
  Google,
  Discord,
  Telegram,
} from '@mochi-ui/icons'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../src/select'

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

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
    label: 'Gmail',
    subtitle: 'Email service by Google',
    value: '3',
    key: 'Gmail',
    icon: <GoogleColored />,
    rightIcon: <Google />,
  },
  {
    label: 'GitHub',
    subtitle: 'Web-based platform for version control and collaboration',
    value: '4',
    key: 'GitHub',
    icon: <Github />,
    rightIcon: <Github />,
  },
  {
    label: 'Email',
    subtitle: 'Send and receive electronic mail',
    value: '5',
    key: 'Email',
    icon: <MailLine />,
    rightIcon: <MailLine />,
  },
  {
    label: 'X',
    subtitle: 'A variable or unknown value',
    value: '6',
    key: 'X',
    icon: <X />,
    rightIcon: <X />,
  },
]

export const Default: StoryObj = {
  render() {
    return (
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
      </Select>
    )
  },
}

export const TriggerColor: StoryObj = {
  render() {
    return (
      <div className="flex gap-4">
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
        </Select>

        <Select>
          <SelectTrigger color="primary">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const TriggerPadding: StoryObj = {
  render() {
    return (
      <div className="flex gap-4 items-center">
        <Select>
          <SelectTrigger color="primary">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger color="primary" hasPadding={false}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const WithCustomTriggerLabel: StoryObj = {
  render() {
    /* eslint-disable react-hooks/rules-of-hooks -- for demonstration */
    const [value, setValue] = useState(items[0].value)
    const selectedValue = items.find((i) => i.value === value)
    return (
      <Select onChange={setValue} value={value}>
        <SelectTrigger leftIcon={selectedValue?.icon}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, ...props }) => (
            <SelectItem key={key} leftIcon={props.icon} value={props.value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const WithLabel: StoryObj = {
  render() {
    /* eslint-disable react-hooks/rules-of-hooks -- for demonstration */
    const [value, setValue] = useState(items[0].value)
    /* eslint-disable react-hooks/rules-of-hooks -- for demonstration */
    const selectedValue = items.find((i) => i.value === value)
    return (
      <Select onChange={setValue} value={value}>
        <SelectTrigger leftIcon={selectedValue?.icon}>
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
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>2nd Socials Group</SelectLabel>
            {items.map(({ key, label, ...props }) => (
              <SelectItem
                key={key}
                leftIcon={props.icon}
                value={`${props.value}2`}
              >
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
}

export const WithItemIndicator: StoryObj = {
  render() {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, value }) => (
            <SelectItem key={key} useIndicator value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const WithSubtittle: StoryObj = {
  render() {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, rightIcon, subtitle, value, icon }) => (
            <SelectItem
              key={key}
              leftIcon={icon}
              rightIcon={rightIcon}
              subTitle={subtitle}
              useIndicator
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const DisabledTrigger: StoryObj = {
  render() {
    return (
      <Select>
        <SelectTrigger disabled>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, rightIcon, subtitle, value, icon }) => (
            <SelectItem
              key={key}
              leftIcon={icon}
              rightIcon={rightIcon}
              subTitle={subtitle}
              useIndicator
              value={value}
              disabled
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const Disabled: StoryObj = {
  render() {
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, rightIcon, subtitle, value, icon }) => (
            <SelectItem
              key={key}
              leftIcon={icon}
              rightIcon={rightIcon}
              subTitle={subtitle}
              useIndicator
              value={value}
              disabled
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const Error: StoryObj = {
  render() {
    return (
      <Select>
        <SelectTrigger isError>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="min-w-[200px]">
          {items.map(({ key, label, value }) => (
            <SelectItem key={key} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

export const FormAppearance: StoryObj = {
  render() {
    return (
      <div className="w-[340px] flex flex-col items-stretch gap-4">
        <Select>
          <SelectTrigger appearance="form">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger appearance="form" disabled>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger appearance="form" isError>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="1">
          <SelectTrigger appearance="form">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {items.map(({ key, label, value }) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  },
}
