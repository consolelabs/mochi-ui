import { useState } from 'react'
import type { Meta } from '@storybook/react'
import * as lines from '../../../icons/src/components/line'
import * as outlined from '../../../icons/src/components/outlined'
import * as pictograms from '../../../icons/src/components/pictogram'
import * as socials from '../../../icons/src/components/social'
import * as solids from '../../../icons/src/components/solid'
import * as web3s from '../../../icons/src/components/web3'
import * as wallets from '../../../icons/src/components/wallet'
import { Tooltip } from '../../tooltip/src'
import { TextFieldRoot, TextFieldInput } from '../../input'

const meta: Meta = {
  title: 'Media & Icons/Icons',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type RenderProps = {
  search: string
}

function Layout({ children }: { children: (p: RenderProps) => JSX.Element }) {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col gap-y-10">
      <TextFieldRoot>
        <TextFieldInput
          value={search}
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Search icons..."
        />
      </TextFieldRoot>
      <div className="grid grid-cols-7 gap-3 md:grid-cols-10 auto-row-auto">
        {children({ search })}
      </div>
    </div>
  )
}

export function AllIcons() {
  const allIcons = [
    ...Object.entries(lines),
    ...Object.entries(outlined),
    ...Object.entries(pictograms),
    ...Object.entries(socials),
    ...Object.entries(solids),
    ...Object.entries(web3s),
    ...Object.entries(wallets),
  ]
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {allIcons
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}

export function LineIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(lines)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}

export function OutlinedIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(outlined)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}

export function SocialIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(socials)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}
export function SolidIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(solids)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}
export function PictogramIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(pictograms)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}

export function Web3Icons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(web3s)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}

export function WalletIcons() {
  return (
    <Layout>
      {({ search }) => {
        return (
          <>
            {Object.entries(wallets)
              .filter((i) => i[0].toLowerCase().includes(search))
              .sort((a, b) => {
                if (a[0] > b[0]) return 1
                if (a[0] < b[0]) return -1
                return 0
              })
              .map((e) => {
                const [name, Icon] = e
                return (
                  <Tooltip arrow="top-center" content={name} key={name}>
                    <Icon className="w-10 h-10 text-text-primary" />
                  </Tooltip>
                )
              })}
          </>
        )
      }}
    </Layout>
  )
}
