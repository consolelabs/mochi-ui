import { Icon } from '@iconify/react'
import Button, { button } from '~cpn/base/button'
import { label as labelStyles } from '~components/Dashboard/Form/styles'
import { FileInput, Input } from '~components/Dashboard/Input'
import { Menu } from '~components/Dashboard/Menu'
import { RadioGroup } from '~components/Dashboard/Radio'
import { Select } from '~components/Dashboard/Select'
import { Switch } from '~components/Dashboard/Switch'
import { useForm } from 'react-hook-form'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { SEO } from '~app/layout/seo'
import { INVITE_LINK } from '~envs'
import { Tabs } from '~components/Dashboard/Tabs'
import { Transition } from '@headlessui/react'
import { Table } from '~components/Dashboard/Table'
import Field from '~components/Dashboard/Form/Field'
import { useCallback, useMemo, useState } from 'react'
import { UseSortByState } from 'react-table'
import Avatar from '~cpn/base/avatar'

export default function Default() {
  const mounted = useHasMounted()
  const { control } = useForm()
  const [componentPage, _setComponentPage] = useState<React.ReactNode>()
  const [componentId, setComponentId] = useState<string>()

  // For Table with manual sort
  const [sortBy, setSortBy] = useState<UseSortByState<any>['sortBy']>([])
  const tableWithManualSortData = useMemo(() => {
    const data = [
      { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
      { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
      { a: 'Lorem Ipsum', b: 9101, c: '#', d: '' },
    ]

    const sortByB = sortBy.find((s) => s.id === 'b')
    if (sortByB) {
      return data.sort((a: any, b: any) => {
        return sortByB.desc
          ? b[sortByB.id] - a[sortByB.id]
          : a[sortByB.id] - b[sortByB.id]
      })
    }

    return data
  }, [sortBy])

  const setComponentPage = useCallback(
    (id: string, node: React.ReactNode) => () => {
      setComponentId(id)
      _setComponentPage(node)
    },
    [],
  )

  if (!mounted) return null

  return (
    <div className="overflow-hidden mx-auto max-w-7xl">
      <SEO title="Components" description="" />
      <div className="flex min-h-screen">
        <div className="inset-3 flex-shrink-0 py-8 px-6 bg-white border-r w-[250px] border-dashboard-gray-3">
          <Menu
            activeId={componentId}
            items={[
              [
                'Basic',
                [
                  {
                    id: 'cutout-avatar',
                    text: 'Cutout Avatar',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'cutout-avatar',
                      <div className="flex gap-2">
                        <Avatar
                          src="https://www.worldcryptoindex.com/wp-content/uploads/2018/01/usdt-logo-300.png"
                          cutoutSrc="https://www.citypng.com/public/uploads/small/11662225468b17snizehiwsims2wniy30tpginmlvry1aapdvfw0j90c79z8tyqgagylhqmvj6krludjrmmmccyr6zgglbziqjtywcdhy7ykebm.png"
                          className="w-36 h-36"
                          size="xl"
                        />
                        <Avatar
                          src="https://www.worldcryptoindex.com/wp-content/uploads/2018/01/usdt-logo-300.png"
                          cutoutSrc="https://www.citypng.com/public/uploads/small/11662225468b17snizehiwsims2wniy30tpginmlvry1aapdvfw0j90c79z8tyqgagylhqmvj6krludjrmmmccyr6zgglbziqjtywcdhy7ykebm.png"
                          size="lg"
                        />
                        <Avatar
                          src="https://www.worldcryptoindex.com/wp-content/uploads/2018/01/usdt-logo-300.png"
                          cutoutSrc="https://www.citypng.com/public/uploads/small/11662225468b17snizehiwsims2wniy30tpginmlvry1aapdvfw0j90c79z8tyqgagylhqmvj6krludjrmmmccyr6zgglbziqjtywcdhy7ykebm.png"
                        />
                        <Avatar
                          src="https://www.worldcryptoindex.com/wp-content/uploads/2018/01/usdt-logo-300.png"
                          cutoutSrc="https://www.citypng.com/public/uploads/small/11662225468b17snizehiwsims2wniy30tpginmlvry1aapdvfw0j90c79z8tyqgagylhqmvj6krludjrmmmccyr6zgglbziqjtywcdhy7ykebm.png"
                          size="sm"
                        />
                        <Avatar
                          src="https://www.worldcryptoindex.com/wp-content/uploads/2018/01/usdt-logo-300.png"
                          cutoutSrc="https://www.citypng.com/public/uploads/small/11662225468b17snizehiwsims2wniy30tpginmlvry1aapdvfw0j90c79z8tyqgagylhqmvj6krludjrmmmccyr6zgglbziqjtywcdhy7ykebm.png"
                          size="xs"
                        />
                      </div>,
                    ),
                  },
                  {
                    id: 'button',
                    text: 'Button',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'button',
                      <div className="flex flex-col gap-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Button appearance="primary">Primary</Button>
                          <Button appearance="secondary">Secondary</Button>
                          <Button appearance="mochi">Mochi</Button>
                          <Button appearance="text">Text</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Button appearance="primary">Base</Button>
                          <Button appearance="primary" size="sm">
                            Small
                          </Button>
                        </div>
                      </div>,
                    ),
                  },
                ],
              ],
              [
                'Form',
                [
                  {
                    id: 'input',
                    text: 'Input',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'input',

                      <div className="flex flex-col space-y-4">
                        <Field
                          name="input-default"
                          label="Default"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Input />
                        </Field>
                        <Field
                          name="input-prefix"
                          label="Prefix"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Input prefix="mochi.gg/" />
                        </Field>
                        <Field
                          name="input-suffix"
                          label="Suffix"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Input
                            suffix="times"
                            suffixProps={{ appearance: 'bgless' }}
                          />
                        </Field>
                        <Field
                          name="file-input-default"
                          label="Default"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          {({ field, fieldState }) => {
                            return (
                              <FileInput
                                {...field}
                                {...fieldState}
                                onChange={(e) => field.onChange(e.target.files)}
                              />
                            )
                          }}
                        </Field>
                      </div>,
                    ),
                  },
                  {
                    id: 'select',
                    text: 'Select',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'select',
                      <div className="flex flex-col space-y-4">
                        <Field
                          name="select-default"
                          label="Default"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Select
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                            ]}
                          />
                        </Field>
                        <Field
                          name="select-custom"
                          label="Custom Option Render"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Select
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                            ]}
                            renderOption={(option) => {
                              return (
                                <div className="flex gap-2 items-center">
                                  <Icon
                                    icon="ic:baseline-discord"
                                    className="w-4 h-4"
                                  />
                                  <span>{option.label}</span>
                                </div>
                              )
                            }}
                          />
                        </Field>
                        <Field
                          name="select-searchable"
                          label="Searchable"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Select
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                            ]}
                            searchable
                          />
                        </Field>
                        <Field
                          name="select-multiple"
                          label="Multiple"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <Select
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                            ]}
                            searchable
                            multiple
                          />
                        </Field>
                      </div>,
                    ),
                  },
                  {
                    id: 'radio-button',
                    text: 'Radio Button',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'radio-button',

                      <div className="flex flex-col space-y-4">
                        <Field
                          name="radio-group-default"
                          label="Default"
                          control={control}
                          rules={{
                            required: 'Required',
                          }}
                        >
                          <RadioGroup
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                            ]}
                          />
                        </Field>
                      </div>,
                    ),
                  },
                  {
                    id: 'switch',
                    text: 'Switch',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'switch',

                      <div className="flex flex-col space-y-4">
                        <Field
                          name="switch-default"
                          label="Default"
                          control={control}
                        >
                          {({ field, fieldState }) => {
                            return (
                              <Switch
                                {...fieldState}
                                {...field}
                                checked={field.value}
                              />
                            )
                          }}
                        </Field>
                        <Field
                          name="switch-with-label"
                          label="With Label"
                          control={control}
                        >
                          {({ field, fieldState }) => {
                            return (
                              <Switch
                                {...field}
                                {...fieldState}
                                label="With Label"
                                checked={field.value}
                              />
                            )
                          }}
                        </Field>
                      </div>,
                    ),
                  },
                ],
              ],
              [
                'Advanced',
                [
                  {
                    id: 'menu',
                    text: 'Menu',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'menu',

                      <div className="flex flex-col space-y-4">
                        <div>
                          <label className={labelStyles()}>Default</label>
                          <div className="flex flex-col gap-y-4 py-4 max-w-xs rounded-lg bg-white-pure">
                            <a
                              href={INVITE_LINK}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                boxShadow:
                                  '0px 4px 16px rgba(249, 164, 180, 0.8)',
                              }}
                              className={button({
                                appearance: 'mochi',
                                size: 'sm',
                                className: 'whitespace-nowrap mx-3',
                              })}
                            >
                              <Icon icon="mingcute:discord-fill" width={16} />
                              Add Bot
                            </a>
                            <Menu
                              activeId="invite-friends"
                              activeIdx={0}
                              items={[
                                [
                                  'Account',
                                  [
                                    {
                                      id: 'profile',
                                      icon: (
                                        <Icon
                                          icon="mingcute:user-3-fill"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'My Profile',
                                      onClick: () => {},
                                    },
                                    {
                                      id: 'server-management',
                                      icon: (
                                        <Icon
                                          icon="majesticons:settings-cog"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'Server Management',
                                      onClick: () => {},
                                    },
                                    {
                                      id: 'settings',
                                      icon: (
                                        <Icon
                                          icon="majesticons:settings-cog"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'Settings',
                                      onClick: () => {},
                                    },
                                  ],
                                ],
                                [
                                  'Social',
                                  [
                                    {
                                      id: 'invite-friends',
                                      icon: (
                                        <Icon
                                          icon="mingcute:user-add-fill"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'Invite Friends',
                                      onClick: () => {},
                                      subItems: [
                                        {
                                          text: 'Lorem',
                                        },
                                        {
                                          text: 'Ipsum',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'feedback',
                                      icon: (
                                        <Icon
                                          icon="ph:star-fill"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'Feedback',
                                      onClick: () => {},
                                    },
                                  ],
                                ],
                                [
                                  '',
                                  [
                                    {
                                      id: 'logout',
                                      icon: (
                                        <Icon
                                          icon="majesticons:logout"
                                          className="w-5 h-5"
                                        />
                                      ),
                                      text: 'Logout',
                                      onClick: () => {},
                                    },
                                  ],
                                ],
                              ]}
                            />
                          </div>
                        </div>
                      </div>,
                    ),
                  },
                  {
                    id: 'tabs',
                    text: 'Tabs',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'tabs',

                      <div className="flex flex-col space-y-4">
                        <label className={labelStyles()}>Default</label>
                        <Tabs
                          headings={[
                            { label: 'Setup' },
                            { label: 'Participate' },
                            { label: 'Rewards' },
                          ]}
                        >
                          <Tabs.Panel>
                            {({ selected }) => {
                              return (
                                <Transition
                                  appear
                                  show={selected}
                                  enter="transition-all duration-100 ease-in-out"
                                  enterFrom="-translate-x-2 opacity-0"
                                  enterTo="translate-x-0 opacity-100"
                                  leave="transition-all duration-100 ease-in-out"
                                  leaveFrom="translate-x-0 opacity-100"
                                  leaveTo="translate-x-2 opacity-0"
                                >
                                  Setup panel
                                </Transition>
                              )
                            }}
                          </Tabs.Panel>
                          <Tabs.Panel>
                            {({ selected }) => {
                              return (
                                <Transition
                                  appear
                                  show={selected}
                                  enter="transition-all duration-100 ease-in-out"
                                  enterFrom="-translate-x-2 opacity-0"
                                  enterTo="translate-x-0 opacity-100"
                                  leave="transition-all duration-100 ease-in-out"
                                  leaveFrom="translate-x-0 opacity-100"
                                  leaveTo="translate-x-2 opacity-0"
                                >
                                  Participate panel
                                </Transition>
                              )
                            }}
                          </Tabs.Panel>
                          <Tabs.Panel>
                            {({ selected }) => {
                              return (
                                <Transition
                                  appear
                                  show={selected}
                                  enter="transition-all duration-100 ease-in-out"
                                  enterFrom="-translate-x-2 opacity-0"
                                  enterTo="translate-x-0 opacity-100"
                                  leave="transition-all duration-100 ease-in-out"
                                  leaveFrom="translate-x-0 opacity-100"
                                  leaveTo="translate-x-2 opacity-0"
                                >
                                  Rewards panel
                                </Transition>
                              )
                            }}
                          </Tabs.Panel>
                        </Tabs>
                      </div>,
                    ),
                  },
                  {
                    id: 'table',
                    text: 'Tables',
                    icon: (
                      <Icon
                        icon="jam:chevron-circle-right-f"
                        className="w-5 h-5"
                      />
                    ),
                    onClick: setComponentPage(
                      'table',
                      <div className="flex flex-col gap-y-20">
                        <div>
                          <div className={labelStyles()}>Default</div>
                          <Table
                            data={[
                              { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                              { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
                            ]}
                            columns={[
                              {
                                Header: 'Column A',
                                accessor: 'a',
                                width: 400,
                                tdClassName: 'font-bold',
                              },
                              {
                                accessor: 'b',
                                Header: 'Column B',
                                defaultCanSort: true,
                              },
                              { accessor: 'c', Header: 'Column C' },
                              {
                                Header: 'Column D',
                                accessor: 'd',
                                thClassName: 'text-right',
                                tdClassName: 'flex justify-end',
                                Cell: () => <Switch />,
                              },
                            ]}
                            theadClassName="text-[11px] uppercase text-dashboard-gray-2 font-bold mb-2"
                            trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                          />
                        </div>
                        <div>
                          <div className={labelStyles()}>
                            Buttons Appear On Hover
                          </div>
                          <div className="p-4 bg-white-pure">
                            <div className="flex items-center px-4 mb-4">
                              <Icon
                                className="w-6 h-6"
                                icon="heroicons:magnifying-glass-20-solid"
                              />
                              <Input
                                className="!border-none"
                                placeholder="Search..."
                                allowClear
                              />
                            </div>
                            <Table
                              data={[
                                {
                                  a: 'Lorem Ipsum',
                                  b: 1234,
                                  c: '#',
                                  d: 'Actions',
                                },
                                {
                                  a: 'Lorem Ipsum',
                                  b: 5678,
                                  c: '#',
                                  d: 'Actions',
                                },
                              ]}
                              columns={[
                                {
                                  accessor: 'a',
                                  Header: 'Column A',
                                  width: 400,
                                  tdClassName: 'font-bold',
                                },
                                { accessor: 'b', Header: 'Column B' },
                                { accessor: 'c', Header: 'Column C' },
                                {
                                  accessor: 'd',
                                  Header: 'Column D',
                                  thClassName: 'text-right',
                                  tdClassName: 'flex justify-end h-full',
                                  Cell: ({ cell: { value } }: any) => (
                                    <div className="flex gap-2 items-center h-full transition translate-x-1/2 group-hover:translate-x-0">
                                      <span className="w-1/2">{value}</span>
                                      <button
                                        type="button"
                                        className="flex gap-2 items-center p-2 w-1/2 h-full bg-black/10"
                                      >
                                        <Icon
                                          className="flex-shrink-0 w-4 h-4"
                                          icon="heroicons:star"
                                        />
                                        <span className="font-bold leading-tight text-[8px]">
                                          Add To Wishlist
                                        </span>
                                      </button>
                                    </div>
                                  ),
                                },
                              ]}
                              theadClassName="hidden"
                              trBodyClassName="pl-4 h-[52px] hover:bg-dashboard-gray-1 rounded-lg text-sm mb-2 transition items-center overflow-hidden group"
                            />
                          </div>
                        </div>
                        <div>
                          <div className={labelStyles()}>Table Groups</div>
                          <div className="overflow-auto">
                            <div className="inline-block px-8 mb-2 min-w-full text-xs font-bold uppercase thead text-dashboard-gray-2">
                              <div className="flex trHead">
                                <div
                                  className="th"
                                  style={{ flex: '1 1 400px', minWidth: 150 }}
                                >
                                  Column A
                                </div>
                                <div
                                  className="th"
                                  style={{ flex: '1 1 150px', minWidth: 150 }}
                                >
                                  Column B
                                </div>
                                <div
                                  className="th"
                                  style={{ flex: '1 1 150px', minWidth: 150 }}
                                >
                                  Column C
                                </div>
                                <div
                                  className="text-right th"
                                  style={{ flex: '1 1 150px', minWidth: 150 }}
                                >
                                  Column D
                                </div>
                              </div>
                            </div>
                            <div className="inline-block p-4 mb-4 min-w-full rounded-lg bg-dashboard-gray-1">
                              <div className="mb-4 text-xl font-bold">
                                Group 1
                              </div>
                              <Table
                                data={[
                                  { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                                  { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
                                ]}
                                columns={[
                                  {
                                    accessor: 'a',
                                    Header: 'Column A',
                                    width: 400,
                                    tdClassName: 'font-bold',
                                  },
                                  {
                                    accessor: 'b',
                                    Header: 'Column B',
                                  },
                                  { accessor: 'c', Header: 'Column C' },
                                  {
                                    accessor: 'd',
                                    Header: 'Column D',
                                    thClassName: 'text-right',
                                    tdClassName: 'flex justify-end',
                                    Cell: () => <Switch />,
                                  },
                                ]}
                                tableClassName="!overflow-visible"
                                theadClassName="hidden"
                                trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                              />
                            </div>
                            <div className="inline-block p-4 min-w-full rounded-lg bg-dashboard-gray-1">
                              <div className="mb-4 text-xl font-bold">
                                Group 2
                              </div>
                              <Table
                                data={[
                                  { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                                  { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
                                ]}
                                columns={[
                                  {
                                    accessor: 'a',
                                    Header: 'Column A',
                                    width: 400,
                                    tdClassName: 'font-bold',
                                  },
                                  { accessor: 'b', Header: 'Column B' },
                                  { accessor: 'c', Header: 'Column C' },
                                  {
                                    accessor: 'd',
                                    Header: 'Column D',
                                    thClassName: 'text-right',
                                    tdClassName: 'flex justify-end',
                                    Cell: () => <Switch />,
                                  },
                                ]}
                                tableClassName="!overflow-visible"
                                theadClassName="hidden"
                                trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className={labelStyles()}>With Manual Sort</div>
                          <Table
                            data={tableWithManualSortData}
                            columns={[
                              {
                                Header: 'Column A',
                                accessor: 'a',
                                width: 400,
                                tdClassName: 'font-bold',
                              },
                              {
                                accessor: 'b',
                                Header: 'Column B',
                                defaultCanSort: true,
                              },
                              { accessor: 'c', Header: 'Column C' },
                              {
                                Header: 'Column D',
                                accessor: 'd',
                                thClassName: 'text-right',
                                tdClassName: 'flex justify-end',
                                Cell: () => <Switch />,
                              },
                            ]}
                            manualSortBy
                            theadClassName="text-xs uppercase text-dashboard-gray-2 font-bold mb-2"
                            trBodyClassName="p-4 bg-white-pure rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                            onChange={({ sortBy }) => {
                              setSortBy(sortBy)
                            }}
                          />
                        </div>
                      </div>,
                    ),
                  },
                ],
              ],
            ]}
          />
        </div>
        <div className="overflow-auto flex-1 py-8 px-14 bg-dashboard-gray-1">
          {componentPage ?? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <Icon
                icon="jam:arrow-circle-left-f"
                className="w-10 h-10 text-foreground-secondary"
              />
              <p className="mt-3 text-4xl text-center text-foreground-secondary">
                Select
                <br />
                any component
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
