import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../heading'
import List from './list'

const meta: Meta<typeof List> = {
  title: 'ui/List',
  component: List,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

interface DataType {
  id: number
  name: string
  price: number
  balance: number
  icon: string
}
type Story = StoryObj<typeof List<DataType>>

const defaultData: DataType[] = [
  {
    id: 1,
    name: 'BTC',
    price: 28934.55,
    balance: 1,
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    id: 2,
    name: 'ETH',
    price: 2515.45,
    balance: 23,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    id: 3,
    name: 'USDT',
    price: 1.01,
    balance: 24000,
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  },
  {
    id: 4,
    name: 'BNB',
    price: 130.6,
    balance: 23,
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
  },
  {
    id: 5,
    name: 'FTM',
    price: 2.4,
    balance: 0,
    icon: 'https://cryptologos.cc/logos/fantom-ftm-logo.png',
  },
  {
    id: 6,
    name: 'ADA',
    price: 0.42,
    balance: 0,
    icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
  },
  {
    id: 7,
    name: 'MATIC',
    price: 12,
    balance: 0,
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  },
  {
    id: 8,
    name: 'AVAX',
    price: 0.55,
    balance: 0.1,
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
  },
  {
    id: 9,
    name: 'SOL',
    price: 30.3,
    balance: 0.1,
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
  {
    id: 10,
    name: 'DOT',
    price: 6.78,
    balance: 0.1,
    icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
  },
  {
    id: 11,
    name: 'LINK',
    price: 1.56,
    balance: 0.1,
    icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
  },
]

function renderItem(item: DataType) {
  return (
    <li
      className="ui-flex ui-flex-row ui-items-center ui-w-full ui-p-2 hover:ui-bg-[#FAF9F7] ui-rounded-lg ui-space-x-2"
      key={item.id}
    >
      <img
        alt={`${item.name} icon`}
        className="ui-w-6 ui-h-6 ui-rounded-full ui-object-contain"
        src={item.icon}
      />
      <div className="ui-flex ui-flex-col ui-flex-1">
        <Heading as="h3" className="ui-text-sm">
          {item.name}
        </Heading>
        <span className="ui-text-xs ui-text-[#848281]">
          {item.balance.toLocaleString('en-US')}
        </span>
      </div>
      <span className="ui-text-sm">${item.price.toLocaleString('en-US')}</span>
    </li>
  )
}

export const Default: Story = {
  args: {
    rootClassName:
      'ui-h-[300px] ui-w-[412px] ui-shadow-sm ui-p-2 ui-rounded-lg',
    data: defaultData,
    renderItem,
  },
}

export const ListEmpty: Story = {
  args: {
    rootClassName:
      'ui-h-[300px] ui-w-[412px] ui-shadow-sm ui-p-2 ui-rounded-lg',
    data: [],
    renderItem,
    ListEmpty: (
      <div className="ui-w-full ui-h-full ui-flex ui-items-center ui-justify-center">
        No data
      </div>
    ),
  },
}
