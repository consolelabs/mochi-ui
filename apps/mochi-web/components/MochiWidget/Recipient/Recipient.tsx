import { useAuthStore } from '~store'
import { useShallow } from 'zustand/react/shallow'
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

interface RecipientProps {
  onLoginRequest?: () => void
  selectedRecipients?: Profile[]
  onSelectRecipient?: (item: Profile) => void
  onRemoveRecipient?: (item: Profile) => void
}

export const Recipient: React.FC<RecipientProps> = ({
  onLoginRequest,
  selectedRecipients,
  onSelectRecipient,
  onRemoveRecipient,
}) => {
  const accessToken = useAuthStore(useShallow((s) => s.token))
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
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>()
  const [recipients, setRecipients] = useState<Profile[]>([])
  const isOnChain = selectedPlatform?.platform === 'on-chain'
  const filteredRecipients = useMemo(
    () =>
      recipients.filter(
        (item) =>
          item.associated_accounts?.[0].platform_metadata?.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, recipients],
  )

  useEffect(
    () => {
      // TODO: remove condition for recent recipients
      if (debouncedSearchTerm) {
        setIsSearching()
        API.MOCHI_PROFILE.get(
          GET_PATHS.PROFILE_SEARCH(searchTerm, selectedPlatform?.platform),
        )
          .json((r) => r.data)
          .then((data: Profile[]) => {
            setRecipients(data || [])
          })
          .finally(() => setIsNotSearching())
      } else {
        setRecipients([])
        setIsNotSearching()
      }
    },
    [debouncedSearchTerm, selectedPlatform], // Only call effect if debounced search term changes
  )

  function handleFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    } else if (!isOpenRecipients) {
      // open the recipient list
      openRecipients()
    }
  }

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
            className="flex gap-x-2 items-center py-2.5 px-4 rounded-lg bg-white-pure border border-white-pure"
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
            <input
              id="recipients"
              className="flex-1 min-w-[100px] h-full bg-transparent outline-none"
              placeholder={isOnChain ? 'Enter address' : 'Enter username'}
              value={searchTerm}
              onFocus={handleFocusInput}
              onChange={onSearchChange}
            />
            {isSearching && <IconSpinner width={18} height={18} />}
            <PlatformPicker
              triggerId="platform-picker-trigger"
              contentId="platform-picker-content"
              onSelect={setSelectedPlatform}
            />
          </div>
        </PopoverAnchor>
        {!!selectedRecipients?.length && (
          <div className="grid grid-cols-4 gap-7 py-2 px-4">
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
        )}
      </div>
      <PopoverContent
        align="start"
        sideOffset={0}
        onInteractOutside={handleInteractOutside}
        onOpenAutoFocus={(e) => e.preventDefault()}
        asChild
      >
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
          <RecipientList
            data={filteredRecipients}
            selectedRecipients={selectedRecipients}
            onSelect={onSelectRecipient}
            onRemove={onRemoveRecipient}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
