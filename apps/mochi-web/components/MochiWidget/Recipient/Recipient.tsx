import clsx from 'clsx'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Combobox } from '@headlessui/react'
import { Profile } from '@consolelabs/mochi-rest'
import { useEffect, useMemo, useState } from 'react'
import {
  InputField,
  Popover,
  PopoverContent,
  PopoverAnchor,
} from '@consolelabs/core'
import { IconSpinner } from '@consolelabs/icons'
import { useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import { API, GET_PATHS } from '~constants/api'
import { ChainPicker } from '../ChainPicker'
import { Platform } from '../PlatformPicker/type'
import { RecipientList } from './RecipientList'
import { PlatformPicker } from '../PlatformPicker'
import { SelectedRecipient } from './SelectedRecipient'
import { MAX_RECIPIENTS } from '../Tip/store'

const SEARCH_DEBOUNCE_TIME = 250

interface RecipientProps {
  authorized: boolean
  unauthorizedContent?: React.ReactNode
  selectedRecipients?: Array<Profile & { create_new?: boolean }>
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
  const {
    isOpen: isOpenRecipients,
    onOpen: openRecipients,
    onClose: closeRecipients,
  } = useDisclosure()
  const {
    isOpen: isSearching,
    onOpen: setIsSearching,
    onClose: setIsNotSearching,
  } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>()
  const [recipients, setRecipients] = useState<
    Array<Profile & { create_new?: boolean }>
  >([])
  const isOnChain = selectedPlatform?.platform === 'on-chain'
  const filteredRecipients = useMemo(() => {
    const result = recipients.filter(
      getFilterRecipientFunc(debouncedSearchTerm),
    )
    const exactResult = recipients.some(
      (r) =>
        r.associated_accounts?.[0].platform_metadata.username ===
        debouncedSearchTerm,
    )
    if (!exactResult && debouncedSearchTerm) {
      // if there are no exact result, we need to show an option for user to still select it
      result.push({
        id: '',
        associated_accounts: [
          {
            pnl: '',
            id: '',
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
        create_new: true,
      })
    }
    return result
  }, [debouncedSearchTerm, recipients, selectedPlatform?.platform])

  useEffect(() => {
    if (authorized && isOpenRecipients) {
      setIsSearching()
      API.MOCHI_PROFILE.query({
        ...(debouncedSearchTerm && { username: debouncedSearchTerm }),
        ...(selectedPlatform?.platform && {
          platform: selectedPlatform.platform,
        }),
      })
        .get(GET_PATHS.PROFILE_SEARCH)
        .json((r) => r.data)
        .then((data: Profile[]) => {
          setRecipients(data || [])
        })
        .finally(() => setIsNotSearching())
    }
  }, [
    authorized,
    debouncedSearchTerm,
    isOpenRecipients,
    selectedPlatform?.platform,
    setIsNotSearching,
    setIsSearching,
  ])

  function onOpenChange(isOpen: boolean) {
    if (isOpen) {
      openRecipients()
    } else {
      closeRecipients()
    }
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  function onChainSearch() {
    // TODO: handle search onchain recipients
  }

  function handleInteractOutside(event: CustomEvent) {
    // Prevent recipients list from closing when interacting with platform picker and input
    const target = event.target as HTMLElement
    const platformPickerTrigger = document.getElementById(
      'platform-picker-trigger',
    )
    const platformPickerContent = document.getElementById(
      'platform-picker-content',
    )
    if (
      target.id === 'recipients' ||
      platformPickerTrigger?.contains(target) ||
      platformPickerContent?.contains(target)
    ) {
      event.preventDefault()
    }
  }

  return (
    <Combobox
      multiple
      value={selectedRecipients ?? []}
      onChange={(recipients) => {
        setSearchTerm('')
        closeRecipients()
        onUpdateRecipient?.(
          recipients.filter(
            (r, _idx, arr) => arr.filter((a) => a.id === r.id).length === 1,
          ),
        )
      }}
    >
      <Popover open={isOpenRecipients} onOpenChange={onOpenChange}>
        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
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

          <PopoverAnchor>
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
              <span className="h-[34px] text-lg text-[#848281] pt-0.5">@</span>
              <Combobox.Input
                id="recipients"
                className="flex-1 h-full bg-transparent outline-none min-w-[100px]"
                placeholder={isOnChain ? 'Enter address' : 'Enter username'}
                value={searchTerm}
                onChange={onSearchChange}
                onFocus={openRecipients}
                onBlur={(e: any) => e.preventDefault()}
                autoComplete="off"
              />
              <IconSpinner
                width={18}
                height={18}
                className={clsx({
                  'opacity-0': !isSearching,
                  'opacity-100': isSearching,
                })}
              />
              <PlatformPicker
                triggerId="platform-picker-trigger"
                contentId="platform-picker-content"
                onSelect={setSelectedPlatform}
              />
            </div>
          </PopoverAnchor>
          {!!selectedRecipients?.length && (
            <ScrollArea.Viewport>
              <div
                style={{ maxHeight: 84 }}
                className="grid grid-cols-4 gap-y-7 place-content-between pb-2"
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
          )}
        </div>
        <PopoverContent
          align="start"
          avoidCollisions={false}
          sideOffset={0}
          onInteractOutside={handleInteractOutside}
          onOpenAutoFocus={(e) => e.preventDefault()}
          asChild
        >
          {authorized ? (
            <div
              style={{ borderRadius: '0 0 8px 8px' }}
              className="flex flex-col gap-y-2 items-center py-3 px-3 shadow-md w-[398px] bg-white-pure"
            >
              {isOnChain && (
                <InputField
                  className="w-full text-sm"
                  inputWrapperClassName="rounded-lg"
                  autoFocus
                  placeholder="Search address"
                  startAdornment={<ChainPicker className="ml-3" />}
                  onChange={onChainSearch}
                />
              )}
              <Combobox.Options static className="w-full">
                <RecipientList
                  loading={isSearching}
                  data={filteredRecipients}
                  selectedRecipients={selectedRecipients}
                />
              </Combobox.Options>
            </div>
          ) : (
            unauthorizedContent
          )}
        </PopoverContent>
      </Popover>
    </Combobox>
  )
}
