import { useEffect, useMemo, useState } from 'react'
import {
  InputField,
  Popover,
  PopoverContent,
  PopoverAnchor,
  Heading,
  IconButton,
} from '@consolelabs/ui-components'
import { ViewProfile } from '~types/mochi-profile-schema'
import { IconClose, IconSpinner } from '@consolelabs/icons'
import { useDebounce } from '@dwarvesf/react-hooks'
import { API, GET_PATHS } from '~constants/api'
import { ChainPicker } from '../ChainPicker'
import { Platform } from '../PlatformPicker/type'
import { RecipientList } from './RecipientList'
import { DefaultAccounts } from './data'
import { PlatformPicker } from '../PlatformPicker'
import { SelectedRecipient } from './SelectedRecipient'

interface RecipientProps {
  accessToken: string | null
  onLoginRequest?: () => void
  selectedRecipients?: ViewProfile[]
  onSelectRecipient?: (item: ViewProfile) => void
  onRemoveRecipient?: (item: ViewProfile) => void
}

export const Recipient: React.FC<RecipientProps> = ({
  accessToken,
  onLoginRequest,
  selectedRecipients,
  onSelectRecipient,
  onRemoveRecipient,
}) => {
  const [isOpenRecipients, openRecipients] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>()
  const isOnChain = selectedPlatform?.platform === 'on-chain'
  const [recipients, setRecipients] = useState<ViewProfile[]>(DefaultAccounts)
  const filteredRecipients = useMemo(
    () =>
      recipients.filter((item) => {
        const isPlatformMatch =
          item.associated_accounts?.[0].platform?.toLowerCase() ===
          selectedPlatform?.platform.toLowerCase()

        const isSearchMatch =
          item.associated_accounts?.[0].platform_metadata?.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        return isPlatformMatch && isSearchMatch
      }),
    [searchTerm, selectedPlatform, recipients],
  )

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        API.MOCHI_PROFILE.get(GET_PATHS.PROFILE_SEARCH(searchTerm))
          .json((r) => r.data)
          .then((data: ViewProfile[]) => {
            setRecipients(data || [])
          })
          .finally(() => setIsSearching(false))
      } else {
        setRecipients(DefaultAccounts)
        setIsSearching(false)
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  )

  function handleFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    } else {
      // toggle the recipient list
      openRecipients((prev) => !prev)
    }
  }

  function onOpenChange(isOpen: boolean) {
    // Reset on close
    openRecipients(isOpen)
    setSearchTerm('')
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <Popover open={isOpenRecipients} onOpenChange={onOpenChange}>
      <PopoverAnchor>
        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
          <div className="flex justify-between items-center px-4 h-[34px]">
            <label
              htmlFor="recipients"
              className="text-sm font-semibold text-neutral-600"
            >
              Recipients
            </label>
            <span className="text-sm font-semibold text-neutral-600">0/20</span>
          </div>
          <div className="flex gap-x-2 items-center py-2.5 px-4 rounded-lg bg-white-pure">
            <span className="h-[34px] text-lg text-[#848281] pt-0.5">@</span>
            <input
              id="recipients"
              className="flex-1 h-full bg-transparent outline-none"
              placeholder={isOnChain ? 'Enter address' : 'Enter username'}
              onFocus={handleFocusInput}
            />
          </div>
          <div className="grid grid-cols-4 gap-7 px-4 py-2">
            {selectedRecipients?.map((item: ViewProfile) => (
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
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        className="flex flex-col w-[388px] gap-x-1 items-center py-3 px-3 rounded-lg shadow-md bg-white-pure"
      >
        <div className="flex flex-row w-full gap-1 pb-2 items-center">
          <Heading
            as="h4"
            className="flex-1 text-sm font-medium text-neutral-800"
          >
            Select platform
          </Heading>
          <PlatformPicker onSelect={setSelectedPlatform} />
          <IconButton
            style={{ width: 24, height: 24, padding: 4.5 }} // Override css cuz size "sm" doen't match design
            variant="outline"
            color="info"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <IconClose />
          </IconButton>
        </div>
        <InputField
          className="w-full text-sm"
          placeholder={isOnChain ? 'Search address' : 'Search username'}
          startAdornment={
            isOnChain ? (
              <ChainPicker className="ml-3" />
            ) : (
              <span className="pl-3 font-medium text-neutral-500">@</span>
            )
          }
          endAdornment={isSearching && <IconSpinner className="mr-3" />}
          onChange={onSearchChange}
        />
        <RecipientList data={filteredRecipients} onSelect={onSelectRecipient} />
      </PopoverContent>
    </Popover>
  )
}
