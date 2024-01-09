import { Sidebar } from '@mochi-ui/sidebar'
import { PageContent } from '@mochi-ui/page-content'
import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderTitleExtra,
} from '@mochi-ui/page-header'
import { Badge, BadgeIcon } from '@mochi-ui/badge'
import { Typography } from '@mochi-ui/typography'
import {
  AddUserSolid,
  CodingSolid,
  Discord,
  GameSolid,
  LifeBuoySolid,
  SettingSolid,
  StarSolid,
  SuperGroupSolid,
  TwinkleSolid,
  UserSolid,
  X,
} from '@mochi-ui/icons'
import { Layout } from '../src'

const meta = {
  title: 'Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
}

export default meta

export function Default() {
  return (
    <Layout className="border">
      <Layout tagName="header" className="border-b p-4">
        <Typography level="h1" className="!text-3xl font-semibold">
          Header
        </Typography>
      </Layout>
      <Layout>
        <Sidebar
          footerItems={[
            { title: 'Support', Icon: LifeBuoySolid },
            { title: 'Follow Us', Icon: X },
            { title: 'Join Community', Icon: Discord },
          ]}
          headerItems={[
            {
              title: 'Profile',
              Icon: UserSolid,
              type: 'link',
              badge: <Badge>New</Badge>,
            },
            {
              title: 'Server Management',
              Icon: Discord,
              badge: (
                <Badge appearance="secondary">
                  <BadgeIcon>
                    <TwinkleSolid />
                  </BadgeIcon>
                  Featured
                </Badge>
              ),
            },
            {
              title: 'App Store',
              Icon: GameSolid,
            },
            { title: 'Settings', Icon: SettingSolid },
            { type: 'break' },
            { title: 'Developer', Icon: CodingSolid, disabled: true },
            {
              title: 'Gift your friend',
              Icon: SuperGroupSolid,
              badge: (
                <Badge appearance="secondary">
                  <BadgeIcon>
                    <TwinkleSolid />
                  </BadgeIcon>
                  Featured
                </Badge>
              ),
            },
            { title: 'Invite Friends', Icon: AddUserSolid },
            { title: 'Feedback', Icon: StarSolid },
            {
              title: 'List',
              badge: (
                <Badge appearance="secondary">
                  <BadgeIcon>
                    <TwinkleSolid />
                  </BadgeIcon>
                  Featured
                </Badge>
              ),
              Icon: StarSolid,
              type: 'list',
              children: [
                { title: 'item 1', disabled: true, type: 'link', href: '/' },
                { title: 'item 2' },
              ],
            },
          ]}
        />

        <Layout className="flex-1 bg-neutral-outline/50">
          <PageHeader className="border-b">
            <PageHeaderTitle>
              Page Title
              <PageHeaderTitleExtra>(2,951 members)</PageHeaderTitleExtra>
            </PageHeaderTitle>
          </PageHeader>

          <PageContent>
            <Typography level="p4">Content</Typography>
          </PageContent>
        </Layout>
      </Layout>
    </Layout>
  )
}
