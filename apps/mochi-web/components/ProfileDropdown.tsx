import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ProfileBadge,
  Switch,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
  DropdownMenuLabel,
  DropdownMenuPortal,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import Link from 'next/link'
import { truncateWallet } from '~utils/string'
import {
  UserSolid,
  AddUserSolid,
  EyeShowSolid,
  StarSolid,
  HomeSolid,
  ShieldDoneSolid,
  ComputerPcLaptopSolid,
} from '@mochi-ui/icons'
import { ROUTES } from '~constants/routes'
import { ReactNode } from 'react'
import { DISCORD_INSTALL_BOT_LINK, TELEGRAM_LINK } from '~constants/resources'
import { appVersion } from '~constants/common'

export default function ProfileDropdown({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { isLoggedIn, profile } = useLoginWidget()

  let triggerRender = null
  if (children) {
    triggerRender = children
  } else {
    triggerRender =
      isLoggedIn && profile ? (
        <ProfileBadge
          avatar={profile?.avatar || '/logo.png'}
          name={truncateWallet(profile.profile_name) || 'unknown'}
          platform="/logo.png"
        />
      ) : null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        {triggerRender}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          wrapperClassName="z-20"
          className="overflow-y-auto max-h-[calc(100dvh-100px)]"
          sideOffset={20}
          collisionPadding={{
            right: 32,
            bottom: 32,
          }}
        >
          <DropdownMenuLabel leftIcon={<UserSolid />}>
            Profile
          </DropdownMenuLabel>

          <Link href={ROUTES.MY_PROFILE}>
            <DropdownMenuItem hasPaddingLeft>Overview</DropdownMenuItem>
          </Link>

          <Link href={ROUTES.SETTINGS()}>
            <DropdownMenuItem hasPaddingLeft>Settings</DropdownMenuItem>
          </Link>

          <DropdownMenuLabel leftIcon={<EyeShowSolid />}>
            View Options
          </DropdownMenuLabel>

          <Link href="#Darkmode">
            <DropdownMenuItem
              hasPaddingLeft
              rightExtra={<Switch />}
              onClick={(e) => e.preventDefault()}
            >
              Dark Mode
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link href="#friends">
            <DropdownMenuItem leftIcon={<AddUserSolid />}>
              Invite Friends
            </DropdownMenuItem>
          </Link>

          <Link href="#Feedback">
            <DropdownMenuItem leftIcon={<StarSolid />}>
              Feedback
            </DropdownMenuItem>
          </Link>

          <Link href="#TermAndPolicy">
            <DropdownMenuItem leftIcon={<ShieldDoneSolid />}>
              Terms and Policies
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Accordion
            type="multiple"
            className="!p-0 shadow-none bg-transparent"
            defaultValue={['Download']}
          >
            <AccordionItem value="Home">
              <AccordionTrigger
                className="py-0.5"
                leftIcon={
                  <div className="p-0.5">
                    <HomeSolid />
                  </div>
                }
              >
                Home
              </AccordionTrigger>
              <AccordionContent className="!p-0">
                <Link href={ROUTES.EXPLORE}>
                  <DropdownMenuItem hasPaddingLeft>Explore</DropdownMenuItem>
                </Link>
                <Link href={ROUTES.DOCS}>
                  <DropdownMenuItem hasPaddingLeft>API docs</DropdownMenuItem>
                </Link>
                <Link href={ROUTES.CHANGELOG}>
                  <DropdownMenuItem hasPaddingLeft>Changelog</DropdownMenuItem>
                </Link>
                <Link href={ROUTES.DEVELOPER}>
                  <DropdownMenuItem hasPaddingLeft>Developer</DropdownMenuItem>
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Download">
              <AccordionTrigger
                className="py-0.5"
                leftIcon={
                  <div className="p-0.5">
                    <ComputerPcLaptopSolid />
                  </div>
                }
              >
                Download
              </AccordionTrigger>
              <AccordionContent className="!p-0">
                <Link href="#Explore">
                  <DropdownMenuItem hasPaddingLeft>Extension</DropdownMenuItem>
                </Link>
                <Link target="_blank" href={DISCORD_INSTALL_BOT_LINK}>
                  <DropdownMenuItem hasPaddingLeft>Discord</DropdownMenuItem>
                </Link>
                <Link target="_blank" href={TELEGRAM_LINK}>
                  <DropdownMenuItem hasPaddingLeft>Telegram</DropdownMenuItem>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-col">
            <Typography level="p6" color="textDisabled" fontWeight="sm">
              Powered by Console Labs
            </Typography>
            <Typography level="p6" color="textDisabled" fontWeight="sm">
              Version {appVersion}
            </Typography>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
