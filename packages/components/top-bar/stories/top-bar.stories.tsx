import { DiscordColored, TelegramColored, ChromeColored } from '@mochi-ui/icons'
import { Button } from '@mochi-ui/button'
import { LogoWithText } from '@mochi-ui/logo'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@mochi-ui/dropdown'
import { List } from '@mochi-ui/list'
import { Typography } from '@mochi-ui/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@mochi-ui/accordion'
import { DesktopNav, MobileNav, TopBar } from '../src'

const meta = {
  title: 'Layout/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  layout: 'fullscreen',
}

export default meta

const downloadContent = (
  <List
    data={[
      {
        label: 'Extension',
        iconLeft: <ChromeColored />,
        href: '#',
      },
      {
        label: 'Discord',
        iconLeft: <DiscordColored />,
        href: '#',
      },
      {
        label: 'Telegram',
        iconLeft: <TelegramColored />,
        href: '#',
      },
    ]}
    renderItem={(item, index) => {
      return (
        <Button
          variant="link"
          color="neutral"
          className="flex w-full !justify-start !text-base px-2 py-3 bg-background-surface !text-neutral-800 !font-normal hover:!text-black !h-max"
          key={index}
        >
          <a
            className="flex focus:outline-none items-center flex-1 gap-3.5"
            href={item?.href}
          >
            {item?.iconLeft && (
              <span className="text-xl">{item?.iconLeft}</span>
            )}
            <Typography level="p6" className="!text-sm font-medium">
              {item?.label}
            </Typography>
          </a>
        </Button>
      )
    }}
  />
)

const mobileNavItems = [
  <Button
    variant="link"
    color="neutral"
    className="flex w-full !justify-start !text-base px-2 py-3 bg-background-surface !text-neutral-800 !font-normal hover:!text-black !h-max"
    onClick={() => alert('API')}
    key="2"
  >
    <Typography level="p6" className="!text-base font-medium">
      API
    </Typography>
  </Button>,
  <Accordion
    type="multiple"
    className="!p-0 !text-neutral-900 rounded-none shadow-none"
    key="3"
  >
    <AccordionItem value="1">
      <AccordionTrigger
        wrapperClassName="!py-3 !px-4"
        className="text-base !text-neutral-900"
      >
        Download
      </AccordionTrigger>
      <AccordionContent className="mt-4 !px-1 !py-0 gap-1">
        {downloadContent}
      </AccordionContent>
    </AccordionItem>
  </Accordion>,
  <Button color="primary" className="w-full" key="4">
    Login
  </Button>,
]

const desktopNavItems = [
  <Button
    variant="link"
    className="flex focus:outline-none items-center flex-1 gap-3.5 !px-0"
    onClick={() => alert('API')}
    key="2"
  >
    <Typography level="p6" className="!text-sm font-medium">
      API
    </Typography>
  </Button>,
  <DropdownMenu key="3">
    <DropdownMenuTrigger asChild>
      <Button
        variant="link"
        color="neutral"
        className="h-full flex items-center !px-0"
        type="button"
      >
        <Typography level="p6" className="!text-sm font-medium">
          Download
        </Typography>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="max-w-[247px]">
      {downloadContent}
    </DropdownMenuContent>
  </DropdownMenu>,
  <div className="w-px h-full py-2.5 -mx-2">
    <div className="w-auto h-full bg-divider" />
  </div>,
  <Button color="primary" key="4">
    Login
  </Button>,
]

export function Default() {
  return (
    <div className="h-[600px] !overflow-auto border border-divider">
      <div className="h-[1000px]">
        <TopBar
          leftSlot={
            <LogoWithText
              logoProps={{ size: 'xs' }}
              className="!gap-2"
              textClassName="w-18 h-8"
            />
          }
          rightSlot={
            <>
              <MobileNav navItems={mobileNavItems} />
              <DesktopNav navItems={desktopNavItems} />
            </>
          }
        />
      </div>
    </div>
  )
}
