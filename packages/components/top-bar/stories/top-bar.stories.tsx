import {
  DiscordColored,
  TelegramColored,
  SlackColored,
  AppleColored,
  ChromeColored,
} from '@consolelabs/icons'
import {
  TextFieldRoot,
  TextFieldDecorator,
  TextFieldInput,
} from '@consolelabs/input'
import { Button } from '@consolelabs/button'
import { LogoWithText } from '@consolelabs/logo'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@consolelabs/dropdown'
import { SectionList } from '@consolelabs/section-list'
import { Typography } from '@consolelabs/typography'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@consolelabs/accordion'
import { DesktopNav, MobileNav, MobileNavItem, TopBar } from '../src'

const meta = {
  title: 'components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  layout: 'fullscreen',
}

export default meta

const downloadContent = (
  <SectionList
    sections={[
      {
        label: '',
        data: [
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
        ],
      },
      {
        label: 'Soon available on',
        data: [
          {
            label: (
              <span className="text-text-primary opacity-50">Discord</span>
            ),
            iconLeft: <SlackColored className="opacity-50" />,
          },
          {
            label: <span className="text-text-primary opacity-50">iOS</span>,
            iconLeft: <AppleColored className="opacity-50" />,
          },
        ],
      },
    ]}
    renderItem={(item: MobileNavItem, _, index) => {
      if (item?.component) return item?.component

      return (
        <Button
          variant="link"
          color="neutral"
          className="flex w-full !justify-start !text-base px-2 py-3 bg-background-surface !text-neutral-800 !font-normal hover:!text-black !h-max"
          onClick={item?.onClick}
          key={index}
        >
          {item?.href ? (
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
          ) : (
            <div className="flex focus:outline-none items-center flex-1 gap-3.5">
              {item?.iconLeft && (
                <span className="text-xl">{item?.iconLeft}</span>
              )}
              <Typography level="p6" className="!text-sm font-medium">
                {item?.label}
              </Typography>
            </div>
          )}
        </Button>
      )
    }}
    renderSectionHeader={(section) =>
      section?.label ? (
        <h3 className="p-2 !text-sm text-neutral-600">{section.label}</h3>
      ) : null
    }
  />
)

const mobileNavItems = [
  <TextFieldRoot className="m-1" key="1">
    <TextFieldInput />
    <TextFieldDecorator>
      <DiscordColored />
    </TextFieldDecorator>
  </TextFieldRoot>,
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
  <TextFieldRoot className="m-1" key="1">
    <TextFieldInput />
    <TextFieldDecorator>
      <DiscordColored />
    </TextFieldDecorator>
  </TextFieldRoot>,
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
    <div className="w-auto h-full bg-[#eeedec]" />
  </div>,
  <Button color="primary" key="4">
    Login
  </Button>,
]

export function Default() {
  return (
    <div className="h-[600px] !overflow-auto border border-neutral-outline-border">
      <div className="bg-neutral-outline h-[1000px]">
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
