import { useClipboard, useDisclosure } from '@dwarvesf/react-hooks'
import { Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Fragment, ReactElement, useCallback, useRef, useState } from 'react'
import Alert from '~cpn/base/alert'
import AuthenticatedLayout from '~components/auth-layout'
import Button from '~cpn/base/button'
import Avatar from '~cpn/base/avatar'
import { API } from '~constants/api'
import { NextPageWithLayout } from '~pages/_app'
import { boringAvatar } from '~utils/string'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'

type Props = {
  id: string
  name: string
  key: string
  avatar: string
  balances: any[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.params ?? {}
  if (!id)
    return {
      notFound: true,
    }

  const a = await API.MOCHI_PROFILE.get(`/applications/${id}`).json((r) => r)

  if (!a)
    return {
      notFound: true,
    }

  /* const { me } = useProfileStore.getState() */
  /* if (me?.id !== a.owner_profile_id) { */
  /*   return { */
  /*     notFound: true, */
  /*   } */
  /* } */

  const balances = await API.MOCHI_PAY.post(
    {
      profile_ids: ['43685'],
      /* profile_ids: [a.application_profile_id], */
    },
    `/mochi-wallet/balances/multiple`,
  ).json((r) => r.data)

  return {
    props: {
      id: id as string,
      name: a.name,
      key: '',
      avatar: a.avatar || boringAvatar(a.id),
      balances,
    },
  }
}

function Home({ id, key, name, avatar, balances }: Props) {
  const inputImage = useRef<HTMLInputElement>(null)
  const [newKey, setNewKey] = useState('')
  const { onCopy, hasCopied } = useClipboard(newKey)
  const {
    isOpen: isUpdated,
    onOpen: setUpdated,
    onClose: setUnupdated,
  } = useDisclosure()

  const {
    isOpen: hasNewChange,
    onOpen: setHasNewChange,
    onClose: setNoNewChange,
  } = useDisclosure()

  const [app, setApp] = useState<{ name: string; avatar: string }>({
    name,
    avatar,
  })

  const reset = useCallback(() => {
    setApp({
      name,
      avatar,
    })
    setNoNewChange()
  }, [avatar, name, setNoNewChange])

  const [imageErr, setImageErr] = useState('')

  return (
    <div className="flex flex-col gap-y-5 mx-auto max-w-3xl">
      <Link
        href="/profile"
        className="flex items-center text-sm hover:underline"
      >
        <Icon icon="ic:round-chevron-left" className="w-5 h-5" />
        Back
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setUnupdated()
          const body = new FormData(e.target as HTMLFormElement)
          const promises = []
          promises.push(
            API.MOCHI_PROFILE.put({ name: app.name }, `/applications/${id}`),
          )
          if ((inputImage.current?.files?.length ?? 0) > 0) {
            promises.push(
              API.MOCHI_PROFILE.url(`/applications/${id}/avatar`)
                .body(body)
                .put(),
            )
          }

          Promise.allSettled(promises).then((res) => {
            if (res.every((r) => r.status === 'fulfilled')) {
              setUpdated()
              setNoNewChange()
              setImageErr('')
            }
          })
        }}
        className="flex gap-x-5"
      >
        <div className="flex flex-col">
          <div className="flex relative flex-col p-3 w-32 rounded-lg border border-gray-300">
            <div className="overflow-hidden relative rounded-full group">
              <img
                className="object-cover rounded-full aspect-square"
                src={app.avatar}
                alt=""
              />
              <div className="flex absolute top-0 left-0 justify-center items-center w-full h-full text-sm leading-4 text-white rounded-full opacity-0 transition group-hover:opacity-100 bg-gray-900/50">
                Select
                <br />
                image
              </div>
              <input
                name="image"
                ref={inputImage}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-[0px]"
                type="file"
                onChange={(e) => {
                  setHasNewChange()
                  const file = e.target.files?.item(0)
                  if (!file) return
                  if (file.size > 1000000) {
                    setImageErr(`Image size mustn't exceed 1Mib`)
                  }
                  const fr = new FileReader()
                  fr.onload = () => {
                    setApp((a) => ({
                      ...a,
                      avatar: fr.result as string,
                    }))
                  }
                  fr.readAsDataURL(file)
                }}
              />
            </div>
            <div className="absolute top-2 right-2 p-1.5 bg-white rounded-full border border-gray-200">
              <Icon icon="mdi:image-add" className="w-5 h-5" />
            </div>
            {imageErr && (
              <span className="mt-2 text-xs text-red-500">{imageErr}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-y-5">
          <div className="flex flex-col gap-y-5 py-3 px-4 pb-4 bg-white rounded-lg border border-gray-200 shadow">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center">
                <Icon icon="mdi:robot" className="mr-1 w-4 h-4" />
                <span className="text-lg font-medium">App details</span>
              </div>
              <span className="text-sm text-gray-500">
                General information about your creation, such as name, icon app,
                and amazing things to build it.
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-y-5">
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-medium text-gray-500">
                  APP NAME
                </span>
                <input
                  autoComplete="off"
                  value={app.name}
                  onChange={(e) => {
                    setHasNewChange()
                    setApp((a) => ({
                      ...a,
                      name: e.target.value,
                    }))
                  }}
                  required
                  className="py-2 px-4 rounded-lg border border-gray-200 outline-none"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-medium text-gray-500">KEY</span>
                <div className="overflow-hidden relative rounded-lg border border-gray-200">
                  <input
                    value={newKey || key || '*'.repeat(100)}
                    disabled
                    className="py-2 px-4 w-full outline-none bg-white-pure"
                  />
                  <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l to-transparent pointer-events-none from-white-pure">
                    &nbsp;
                  </div>
                  <div className="flex absolute right-2 top-1/2 gap-x-2 -translate-y-1/2">
                    {newKey && (
                      <Button
                        type="button"
                        onClick={onCopy}
                        appearance="text"
                        size="xs"
                        className="bg-white-pure"
                      >
                        {hasCopied ? 'Copied' : 'Copy'}
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        API.MOCHI_PROFILE.put(
                          { app_name: name },
                          `/applications/${id}/reset-key`,
                        ).json((r) => {
                          setNewKey(r.private_key)
                        })
                      }}
                      type="button"
                      appearance="text"
                      size="xs"
                      className="bg-white-pure"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              {newKey ? (
                <Alert title="New key generated" appearance="success">
                  <span className="text-sm">
                    The key has been reset, please make sure to remember new key
                    as it will not be shown again
                  </span>
                </Alert>
              ) : (
                <Alert title="API key" appearance="warn">
                  <span className="text-sm">
                    For security purposes the api key is only shown once (when
                    you create an app or reset current key). If you lose or
                    forget or your key got leaked, you will need to generate a
                    new one.
                  </span>
                </Alert>
              )}
              {isUpdated && (
                <Alert title="Success" appearance="success">
                  <span className="text-sm">
                    All information of the app was updated
                  </span>
                </Alert>
              )}
              <Transition
                show={hasNewChange}
                as={Fragment}
                enter="transition duration-300 ease-rubber"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition duration-700 ease-rubber"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <div className="flex fixed bottom-0 left-1/2 pb-4 w-full max-w-3xl -translate-x-1/2">
                  <div className="flex gap-x-2 justify-between items-center py-3 px-4 w-full bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-white">
                      You have unsaved changes
                    </span>
                    <div className="flex">
                      <Button
                        type="button"
                        onClick={reset}
                        appearance="text"
                        size="xs"
                        className="text-white border-none hover:underline"
                      >
                        Reset
                      </Button>
                      <Button appearance="primary" size="xs">
                        Save changes
                      </Button>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 py-3 px-4 bg-white rounded-lg border border-gray-200 shadow">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center">
                <Icon icon="mdi:bitcoin" className="mr-1 w-4 h-4" />
                <span className="text-lg font-medium">App balances</span>
              </div>
              <span className="text-sm text-gray-500">
                All tokens that this app are currently holding.
              </span>
            </div>
            <div className="grid grid-cols-4 auto-rows-auto items-center">
              <span className="py-1 pl-2 text-xs font-medium text-gray-400 bg-gray-200 rounded-l">
                Token
              </span>
              <span className="py-1 pl-2 text-xs font-medium text-center text-gray-400 bg-gray-200">
                Price
              </span>
              <span className="py-1 pl-2 text-xs font-medium text-center text-gray-400 bg-gray-200">
                Amount
              </span>
              <span className="py-1 pr-2 text-xs font-medium text-right text-gray-400 bg-gray-200 rounded-r">
                USD value
              </span>
              {balances.map((bal) => {
                const formatted = utils.formatUnits(
                  bal.amount,
                  bal.token.decimal,
                )
                const usdWorth = Number(formatted) * bal.token.price

                return (
                  <>
                    <div className="flex gap-x-2 items-center py-2 pl-2">
                      {bal.token.native ? (
                        <img
                          src={bal.token.icon || boringAvatar(bal.token.symbol)}
                          alt=""
                          className="w-7 h-7"
                        />
                      ) : (
                        <div className="w-7 h-7">
                          <Avatar
                            src={bal.token.icon}
                            cutoutSrc={bal.token.chain.icon}
                            srcFallbackText={bal.token.symbol}
                            srcFallbackVariant="ring"
                            size="parent"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium">
                        {bal.token.symbol}
                      </span>
                    </div>
                    <span className="py-2 text-sm font-medium text-center">
                      {mochiUtils.formatUsdDigit(bal.token.price)}
                    </span>
                    <span className="py-2 text-sm font-medium text-center">
                      {mochiUtils.formatTokenDigit(formatted)}
                    </span>
                    <span className="py-2 pr-2 text-sm font-medium text-right">
                      {mochiUtils.formatUsdDigit(usdWorth)}
                    </span>
                  </>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-5 py-3 px-4 bg-white rounded-lg border border-red-200 shadow">
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center">
                <Icon
                  icon="jam:triangle-danger-f"
                  className="mr-1 w-4 h-4 text-red-400"
                />
                <span className="text-lg font-medium text-red-400">
                  Danger zone
                </span>
              </div>
              <span className="text-sm text-gray-500">
                This section contains all irreversible actions, proceed with
                caution.
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                appearance="text"
                size="sm"
                type="button"
                className="text-red-400 border-red-200"
              >
                Delete app
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const App: NextPageWithLayout<Props> = (props) => {
  return <Home {...props} />
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default App
