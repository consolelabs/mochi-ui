/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'
import { api } from '~constants/mochi'
import useSWR from 'swr'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Combobox } from '@headlessui/react'
import { Profile } from '@consolelabs/mochi-rest'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TextFieldInput, TextFieldRoot } from '@mochi-ui/core'
import { ProfileGuardSuccessLine, Spinner } from '@mochi-ui/icons'
import { useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import { BottomSheet } from '~cpn/BottomSheet'
/* import { ChainPicker } from '../ChainPicker' */
import { Platform } from '../PlatformPicker/type'
import { RecipientList } from './RecipientList'
import { PlatformPicker, Platforms } from '../PlatformPicker'
import { SelectedRecipient } from './SelectedRecipient'
import { MAX_RECIPIENTS } from '../Tip/store'
import { ActionGroup, ResultGroup } from './RecipientItem'

const SEARCH_DEBOUNCE_TIME = 250

interface RecipientProps {
  authorized: boolean
  unauthorizedContent: React.ReactNode
  selectedRecipients?: Array<Profile & (ResultGroup | ActionGroup)>
  onUpdateRecipient?: (item: Profile[]) => void
  onRemoveRecipient?: (item: Profile) => void
}

function getFilterRecipientFunc(searchTerm: string) {
  return function filterRecipient(item: Profile) {
    return item.associated_accounts?.[0].platform_metadata?.username
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  }
}

export const Recipient: React.FC<RecipientProps> = ({
  authorized,
  unauthorizedContent,
  selectedRecipients,
  onUpdateRecipient,
  onRemoveRecipient,
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const {
    isOpen: isOpenRecipients,
    onOpen: openRecipients,
    onClose: closeRecipients,
  } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platforms[0],
  )
  const isOnChain = selectedPlatform?.platform === 'on-chain'

  const { data: recipients = [], isLoading } = useSWR<
    Array<Profile & (ResultGroup | ActionGroup)>,
    any,
    [string, boolean, boolean, string, string | undefined]
  >(
    [
      'recent-recipients',
      authorized,
      isOpenRecipients,
      debouncedSearchTerm,
      selectedPlatform?.platform,
    ],
    async ([_, isOpenRecipients, authorized, username, platform]) => {
      if (!authorized || !isOpenRecipients) return []
      const { data, ok } = await api.profile.users.search({
        username,
        platform,
      })
      if (!ok) return []
      return data
    },
  )

  const isSearching = isLoading

  const filteredRecipients = useMemo(() => {
    const result = recipients
      .map((r) => {
        r.group = 'result'
        return r
      })
      .filter(getFilterRecipientFunc(debouncedSearchTerm))
    const exactResult = recipients.some(
      (r) =>
        r.associated_accounts?.[0].platform_metadata.username ===
        debouncedSearchTerm,
    )

    // show fallback option
    if (!exactResult && debouncedSearchTerm) {
      const id = `${debouncedSearchTerm}-${selectedPlatform?.platform}`
      // if there are no exact result, we need to show an option for user to still select it
      result.push({
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
        avatar: '',
        type: 'user',
        pnl: '',
        group: 'result',
        create_new: true,
      })
    }

    // show option to quickly switch platform
    if (
      debouncedSearchTerm &&
      ['discord', 'dsc', 'telegram', 'tlg', 'x', 'git', 'mail'].some((prefix) =>
        debouncedSearchTerm.startsWith(prefix),
      )
    ) {
      const id = `suggestion-${debouncedSearchTerm}`
      let platformSuggestion = {
        text: '',
        id: '',
      }

      if (
        selectedPlatform.id !== '1' &&
        ['discord', 'dsc'].some((prefix) =>
          debouncedSearchTerm.startsWith(prefix),
        )
      )
        platformSuggestion = {
          text: 'Discord',
          id: '1',
        }
      if (
        selectedPlatform.id !== '2' &&
        ['telegram', 'tlg'].some((prefix) =>
          debouncedSearchTerm.startsWith(prefix),
        )
      )
        platformSuggestion = {
          text: 'Telegram',
          id: '2',
        }
      if (
        selectedPlatform.id !== '3' &&
        ['mail'].some((prefix) => debouncedSearchTerm.startsWith(prefix))
      )
        platformSuggestion = {
          text: 'Gmail',
          id: '3',
        }
      if (
        selectedPlatform.id !== '4' &&
        ['x'].some((prefix) => debouncedSearchTerm.startsWith(prefix))
      )
        platformSuggestion = {
          text: 'X',
          id: '4',
        }
      if (
        selectedPlatform.id !== '5' &&
        ['git'].some((prefix) => debouncedSearchTerm.startsWith(prefix))
      )
        platformSuggestion = {
          text: 'Github',
          id: '5',
        }

      if (platformSuggestion.text) {
        result.unshift({
          id,
          associated_accounts: [
            {
              pnl: '',
              id,
              platform_metadata: {
                username: `Change platform to ${platformSuggestion.text}`,
              },
              platform_identifier: '',
              platform: (selectedPlatform?.platform as any) ?? '',
              created_at: '',
              updated_at: '',
              profile_id: '',
              total_amount: '',
            },
          ],
          profile_name: `Change platform to ${platformSuggestion.text}`,
          application: null,
          avatar: '',
          type: 'user',
          pnl: '',
          group: 'action',
          change_platform: platformSuggestion.id,
        })
      }
    }

    return result
  }, [
    debouncedSearchTerm,
    recipients,
    selectedPlatform.id,
    selectedPlatform?.platform,
  ])

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  /* function onChainSearch(e: React.ChangeEvent<HTMLInputElement>) { */
  /*   setSearchTerm(e.target.value) */
  /*   // TODO: handle search onchain recipients */
  /* } */

  useEffect(() => {
    if (isOpenRecipients) {
      // hack
      setTimeout(() => {
        ref.current?.focus({ preventScroll: true })
      }, 0)
      return
    }
    setSearchTerm('')
  }, [isOpenRecipients])

  return (
    <Combobox
      multiple
      value={selectedRecipients ?? []}
      onChange={(recipients) => {
        setSearchTerm('')
        const last = recipients[recipients.length - 1]
        if (last.group === 'action') {
          setSelectedPlatform(
            Platforms.find((p) => p.id === last.change_platform) ??
              Platforms[0],
          )
          return
        }
        onUpdateRecipient?.(
          recipients.filter(
            (r, _idx, arr) => arr.filter((a) => a.id === r.id).length === 1,
          ),
        )
        closeRecipients()
      }}
    >
      <div className="flex flex-col gap-y-3 p-2 rounded-xl bg bg-neutral-150">
        <div className="flex justify-between items-center px-4 h-[34px]">
          <label
            htmlFor="recipients"
            className="text-sm font-semibold text-neutral-600"
          >
            Recipients
          </label>
          <span className="text-sm font-semibold text-neutral-600">
            {selectedRecipients?.length ?? 0}/{MAX_RECIPIENTS}
          </span>
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
          <ScrollArea.Root className="relative">
            <div className="absolute top-0 left-0 z-10 -ml-2 w-10 h-full bg-gradient-to-r pointer-events-none from-neutral-150 from-20%" />
            <ScrollArea.Viewport className="relative">
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
            </ScrollArea.Viewport>
            <div className="absolute top-0 right-0 z-10 -mr-2 w-10 h-full bg-gradient-to-l pointer-events-none from-neutral-150 from-20%" />
            <ScrollArea.Scrollbar orientation="horizontal">
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
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
      >
        {authorized ? (
          <>
            <TextFieldRoot className="flex-shrink-0 mt-2">
              <Combobox.Input
                ref={ref}
                as={TextFieldInput}
                className="w-full text-sm overflow-none"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </TextFieldRoot>
            {/* {isOnChain && ( */}
            {/*   <InputField */}
            {/*     className="w-full text-sm" */}
            {/*     inputWrapperClassName="rounded-lg" */}
            {/*     autoFocus */}
            {/*     placeholder="Search address" */}
            {/*     startAdornment={<ChainPicker className="ml-3" />} */}
            {/*     onChange={onChainSearch} */}
            {/*   /> */}
            {/* )} */}
            <Combobox.Options static className="flex mt-2 w-full min-h-0">
              <RecipientList
                loading={isSearching}
                data={filteredRecipients}
                selectedRecipients={selectedRecipients}
              />
            </Combobox.Options>
          </>
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
    </Combobox>
  )
}
