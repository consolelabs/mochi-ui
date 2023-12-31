/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'
import { api } from '~constants/mochi'
import useSWR from 'swr'
import { Combobox } from '@headlessui/react'
import { Profile } from '@consolelabs/mochi-rest'
import { useEffect, useMemo, useState } from 'react'
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  TextFieldDecorator,
  TextFieldInput,
  TextFieldRoot,
} from '@mochi-ui/core'
import { ProfileGuardSuccessLine, Spinner, UserSolid } from '@mochi-ui/icons'
import { useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import BottomSheetProvider, { BottomSheet } from '~cpn/BottomSheet'
import { ChainPicker } from '../ChainPicker'
import { Platform } from '../PlatformPicker/type'
import { RecipientList } from './RecipientList'
import { PlatformPicker, Platforms } from '../PlatformPicker'
import { SelectedRecipient } from './SelectedRecipient'
import { MAX_RECIPIENTS } from '../Tip/store'
import { ContactList } from './ContactList'
import {
  isDiscord,
  isEmail,
  isGithub,
  isReddit,
  isTelegram,
  isTwitter,
  isFacebook,
} from './platform-detector'

const SEARCH_DEBOUNCE_TIME = 250

const QUESTION_MARK_AVATAR =
  'https://media.discordapp.net/attachments/1055686478639923360/1190198846555435108/1cb240e408c0549e.png?ex=65a0ee0d&is=658e790d&hm=0d6b7905d27036e957fdeb8414254b792dfad2692cabd56ba3ed287978aa651c&=&format=webp&quality=lossless&width=320&height=320'

type FallbackGroup = {
  create_new?: boolean
}

interface RecipientProps {
  authorized: boolean
  unauthorizedContent: React.ReactNode
  selectedRecipients?: Array<Profile & FallbackGroup>
  onUpdateRecipient?: (item: Profile[]) => void
  onRemoveRecipient?: (item: Profile) => void
}

export const Recipient: React.FC<RecipientProps> = ({
  authorized,
  unauthorizedContent,
  selectedRecipients,
  onUpdateRecipient,
  onRemoveRecipient,
}) => {
  const {
    isOpen: isOpenRecipients,
    onOpen: openRecipients,
    onClose: closeRecipients,
  } = useDisclosure()
  const {
    isOpen: isOpenContacts,
    onOpen: openContacts,
    onClose: closeContacts,
  } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchContactTerm, setSearchContactTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platforms[0],
  )
  const isOnChain = selectedPlatform?.platform === 'on-chain'

  const [prefix, setPrefix] = useState<React.ReactNode>()

  const { data: recipients = [], isLoading } = useSWR<
    Array<Profile & FallbackGroup>,
    any,
    [string, boolean, boolean, string, string | undefined]
  >(
    [
      'recent-recipients',
      authorized,
      isOpenRecipients || isOpenContacts,
      debouncedSearchTerm,
      selectedPlatform?.platform,
    ],
    async ([_, isOpen, authorized, username, platform]) => {
      if (!authorized || !isOpen) return []
      const { data, ok } = await api.profile.users.search({
        username,
        platform,
      })
      if (!ok) return []
      return data.map((d) => ({ ...d, group: 'result' }))
    },
  )

  const isSearching = isLoading
  const showSkeleton = searchTerm !== debouncedSearchTerm

  const filteredRecipients = useMemo(() => {
    const exactResult = recipients.some(
      (r) =>
        r.associated_accounts?.[0].platform_metadata.username ===
          debouncedSearchTerm ||
        r.associated_accounts?.[0].platform_identifier === debouncedSearchTerm,
    )

    // show fallback option
    if (!exactResult && debouncedSearchTerm) {
      const id = `${debouncedSearchTerm}-${selectedPlatform?.platform}`
      // if there are no exact result, we need to show an option for user to still select it
      return [
        {
          id,
          associated_accounts: [
            {
              pnl: '',
              id,
              platform_metadata: { username: debouncedSearchTerm },
              platform_identifier: '',
              platform: (selectedPlatform?.platform as any) ?? '',
              created_at: '',
              updated_at: '',
              profile_id: '',
              total_amount: '',
            },
          ],
          profile_name: debouncedSearchTerm,
          application: null,
          avatar: QUESTION_MARK_AVATAR,
          type: 'user',
          pnl: '',
          group: 'result',
          create_new: true,
        } as any,
        ...recipients,
      ]
    }

    return recipients
  }, [debouncedSearchTerm, recipients, selectedPlatform?.platform])

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    const platform = [
      isDiscord(val),
      isTelegram(val),
      isEmail(val),
      isTwitter(val),
      isFacebook(val),
      isGithub(val),
      isReddit(val),
    ].find(Boolean)
    if (platform) {
      if (!platform.keepValue) {
        setSearchTerm('')
      }
      setPrefix(platform.prefix)
      setSelectedPlatform(platform.platform)
      if (!platform.keepValue) return
    }
    setSearchTerm(e.target.value)
  }

  function onSearchContactChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchContactTerm(e.target.value)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Backspace' || searchTerm) return
    setPrefix('')
  }

  /* function onChainSearch(e: React.ChangeEvent<HTMLInputElement>) { */
  /*   setSearchTerm(e.target.value) */
  /*   // TODO: handle search onchain recipients */
  /* } */

  useEffect(() => {
    if (!isOpenRecipients) {
      setSearchTerm('')
      setPrefix(null)
    }
  }, [isOpenRecipients])

  useEffect(() => {
    if (!isOpenContacts) {
      setSearchContactTerm('')
    }
  }, [isOpenContacts])

  return (
    <>
      <div className="flex flex-col gap-y-3 p-2 rounded-xl bg bg-neutral-150">
        <div className="flex justify-between items-center px-4 h-[34px]">
          <div className="flex gap-x-2 items-center">
            <label
              htmlFor="recipients"
              className="text-sm font-medium text-neutral-600"
            >
              Recipients
            </label>
            <span className="text-sm text-neutral-600">
              {selectedRecipients?.length ?? 0}/{MAX_RECIPIENTS}
            </span>
          </div>
          <button
            tabIndex={-1}
            type="button"
            onClick={openContacts}
            className="flex relative justify-center items-center -mr-2 w-5 h-5 rounded-full outline-none bg-neutral-500 text-white-pure"
          >
            <input
              tabIndex={-1}
              readOnly
              className="absolute top-0 left-0 w-full h-full bg-transparent border-0 cursor-pointer outline-none"
            />
            <UserSolid />
          </button>
        </div>

        <div
          className="flex gap-x-2 items-center py-2.5 px-4 rounded-lg border bg-white-pure border-white-pure"
          style={
            isOpenRecipients
              ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  border: '1px solid #017AFF',
                  boxShadow:
                    '0px 0px 0px 4px rgba(1, 122, 255, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
                }
              : {}
          }
        >
          <span className="pt-0.5 text-lg h-[34px] text-neutral-600">@</span>
          <input
            id="recipients"
            readOnly
            className="flex-1 h-full bg-transparent outline-none min-w-[100px]"
            placeholder={isOnChain ? 'Enter address' : 'Enter username'}
            onFocus={() => openRecipients()}
            autoComplete="off"
          />
          <Spinner
            width={18}
            height={18}
            className={clsx({
              'opacity-0': !isSearching,
              'opacity-100': isSearching,
            })}
          />
          <PlatformPicker
            authorized={authorized}
            onSelect={setSelectedPlatform}
            value={selectedPlatform}
            unauthorizedContent={unauthorizedContent}
          />
        </div>
        {selectedRecipients?.length ? (
          <ScrollArea className="relative">
            <div className="absolute top-0 left-0 z-10 -ml-2 w-8 h-full bg-gradient-to-r pointer-events-none from-neutral-150 from-20%" />
            <ScrollAreaViewport className="relative">
              <div
                style={{ height: 84 }}
                className="flex gap-x-7 px-5 pb-2 min-w-full"
              >
                {selectedRecipients?.map((item) => (
                  <SelectedRecipient
                    key={
                      (item.id || 'unknown') +
                      (item.associated_accounts?.[0].id || 'unknown')
                    }
                    profile={item}
                    onRemove={onRemoveRecipient}
                  />
                ))}
              </div>
            </ScrollAreaViewport>
            <div className="absolute top-0 right-0 z-10 -mr-2 w-8 h-full bg-gradient-to-l pointer-events-none from-neutral-150 from-20%" />
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        ) : (
          <div
            className="flex flex-col gap-y-2 justify-center items-center text-neutral-500"
            style={{ height: 84 }}
          >
            <ProfileGuardSuccessLine className="w-10 h-10" />
            <span className="text-xs font-normal">
              Select your recipients to send money
            </span>
          </div>
        )}
      </div>
      <BottomSheet
        isOpen={isOpenRecipients}
        onClose={closeRecipients}
        title="Select recipients"
        dynamic={!authorized}
        focusNthChild={selectedPlatform.platform === 'on-chain' ? 1 : 0}
      >
        {authorized ? (
          <Combobox
            multiple
            value={selectedRecipients ?? []}
            onChange={(recipients) => {
              setSearchTerm('')
              onUpdateRecipient?.(
                recipients.filter(
                  (r, _idx, arr) =>
                    arr.filter((a) => a.id === r.id).length === 1,
                ),
              )
              closeRecipients()
              closeContacts()
            }}
          >
            <BottomSheetProvider
              nested
              className="flex flex-col w-full h-full min-h-0"
            >
              <TextFieldRoot className="flex-shrink-0 mt-2">
                {selectedPlatform.platform === 'on-chain' ? (
                  <TextFieldDecorator>
                    <ChainPicker className="-ml-2" />
                  </TextFieldDecorator>
                ) : null}
                {prefix ? (
                  <TextFieldDecorator>
                    <div className="flex gap-x-1 items-center py-0.5 px-2 -ml-2 text-sm bg-gray-200 rounded text-neutral-800">
                      {prefix}
                    </div>
                  </TextFieldDecorator>
                ) : null}
                <Combobox.Input
                  as={TextFieldInput}
                  className="w-full text-sm overflow-none"
                  value={searchTerm}
                  onChange={onSearchChange}
                  onKeyDown={onKeyDown}
                  placeholder="Search"
                  autoComplete="off"
                />
              </TextFieldRoot>
              {selectedPlatform.platform !== 'on-chain' && (
                <span className="mt-1 text-xs text-neutral-500">
                  Type dsc: or tg: to quickly switch platform
                </span>
              )}
              <Combobox.Options static className="flex mt-2 w-full min-h-0">
                <RecipientList
                  loading={showSkeleton}
                  data={filteredRecipients}
                  selectedRecipients={selectedRecipients}
                />
              </Combobox.Options>
            </BottomSheetProvider>
          </Combobox>
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
      <BottomSheet
        isOpen={isOpenContacts}
        onClose={closeContacts}
        title="Contacts"
        dynamic={!authorized}
        focusNthChild={0}
      >
        {authorized ? (
          <Combobox
            multiple
            value={selectedRecipients ?? []}
            onChange={(recipients) => {
              setSearchContactTerm('')
              onUpdateRecipient?.(
                recipients.filter(
                  (r, _idx, arr) =>
                    arr.filter((a) => a.id === r.id).length === 1,
                ),
              )
              closeRecipients()
              closeContacts()
            }}
          >
            <TextFieldRoot className="flex-shrink-0 mt-2">
              {prefix ? (
                <TextFieldDecorator>
                  <div className="flex gap-x-1 items-center py-0.5 px-2 -ml-2 text-sm bg-gray-200 rounded text-neutral-800">
                    {prefix}
                  </div>
                </TextFieldDecorator>
              ) : null}
              <Combobox.Input
                as={TextFieldInput}
                className="w-full text-sm overflow-none"
                value={searchContactTerm}
                onChange={onSearchContactChange}
                placeholder="Search contacts"
                autoComplete="off"
              />
            </TextFieldRoot>
            <Combobox.Options
              static
              className="flex mt-2 w-full h-full min-h-0"
            >
              <ContactList
                loading={isSearching}
                recentRecipients={filteredRecipients}
                selectedRecipients={selectedRecipients}
                queryValue={searchContactTerm}
              />
            </Combobox.Options>
          </Combobox>
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
    </>
  )
}
