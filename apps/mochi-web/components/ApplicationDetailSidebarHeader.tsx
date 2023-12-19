import { useState } from 'react'
import {
  ChevronLeftLine,
  CloseLine,
  ChevronDownLine,
  ThreeDotLoading,
  Spinner,
  CheckLine,
} from '@mochi-ui/icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
  IconButton,
  Avatar,
  Typography,
  Button,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import { NativeImage } from './NativeImage'
import { useSidebarContext } from '../context/app/sidebar'
import { ViewApplication } from '../types/mochi-pay-schema'

const AppDropdownOption = ({
  data,
  onOptionSelect,
  isSelected = false,
}: {
  data: ViewApplication
  onOptionSelect: () => void
  isSelected?: boolean
}) => {
  const { push } = useRouter()

  const optionContent = (
    <div className="flex gap-3.5 justify-start items-center w-full">
      <Avatar src={data?.avatar || ''} />
      <div className="flex-1 max-w-[94px]">
        <Typography
          fontWeight="md"
          level="p5"
          color="textPrimary"
          className="text-left !tracking-normal truncate"
        >
          {data?.name || ''}
        </Typography>
      </div>
      {isSelected ? <CheckLine className="text-primary-plain-fg" /> : null}
    </div>
  )

  return isSelected ? (
    <div className="!px-2.5 !py-2 w-full">{optionContent}</div>
  ) : (
    <Button
      variant="ghost"
      color="neutral"
      className="w-full !justify-between !px-2.5 !py-2 !h-max"
      onClick={() => {
        push(ROUTES.APPLICATION_DETAIL.getPath(String(data?.id) || ''))
        onOptionSelect()
      }}
    >
      {optionContent}
    </Button>
  )
}

export const ApplicationDetailSidebarHeader = ({
  expanded,
}: {
  expanded?: boolean
}) => {
  const { selectedApp, isSelectedAppLoading, appList, isAppListLoading } =
    useSidebarContext()
  const { push, query } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return expanded ? (
    <div className="relative h-20 w-[240px] bg-neutral-solid-active">
      <NativeImage
        alt="header"
        className="object-cover absolute top-0 left-0 w-full h-full opacity-50"
        src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
      />
      <div className="flex absolute top-0 left-0 z-50 justify-center items-stretch w-full h-full">
        {!isSelectedAppLoading && selectedApp ? (
          <div className="flex items-center w-full">
            <IconButton
              variant="link"
              color="info"
              label="Back"
              onClick={() => push(ROUTES.APPLICATON_LIST)}
            >
              <ChevronLeftLine className="text-2xl shrink-0 text-text-contrast" />
            </IconButton>

            <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <DropdownMenuTrigger className="flex flex-1 gap-4 justify-between items-center pr-6">
                <div className="flex flex-1 gap-3 items-center">
                  <Avatar src={selectedApp?.avatar || ''} />
                  <h3 className="text-sm font-semibold text-left text-text-contrast max-w-[100px] truncate">
                    {selectedApp?.name || ''}
                  </h3>
                </div>
                {isOpen ? (
                  <CloseLine className="text-text-contrast" />
                ) : (
                  <ChevronDownLine className="text-text-contrast" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  wrapperClassName="z-[100]"
                  className="mt-7 -ml-6 !min-w-[216px] max-h-[320px] overflow-auto"
                >
                  <div className="flex flex-col gap-1 items-center w-full">
                    {!isAppListLoading && appList !== undefined ? (
                      appList.map((app) => (
                        <AppDropdownOption
                          data={app}
                          key={app.id}
                          isSelected={
                            !!query?.id &&
                            (query.id as string) === String(app.id)
                          }
                          onOptionSelect={() => setIsOpen(false)}
                        />
                      ))
                    ) : (
                      <Spinner className="text-2xl shrink-0 text-text-primary" />
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <ThreeDotLoading className="text-4xl text-text-contrast" />
          </div>
        )}
      </div>
    </div>
  ) : (
    <span />
  )
}
