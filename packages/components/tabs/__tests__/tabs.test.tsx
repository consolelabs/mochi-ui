import { CodingSolid, SettingSolid, UserSolid } from '@mochi-ui/icons'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabContent, TabList, TabTrigger, Tabs } from '../src/tabs'

describe('Tabs', () => {
  it('renders tabs with icons and text', async () => {
    const { getByRole } = render(
      <Tabs defaultValue="account">
        <TabList className="flex justify-between py-1.5">
          <TabTrigger value="account">
            <UserSolid width={16} height={16} />
            Account
          </TabTrigger>
          <TabTrigger value="documents">
            <CodingSolid width={16} height={16} />
            Documents
          </TabTrigger>
          <TabTrigger disabled value="settings">
            <SettingSolid width={16} height={16} />
            Settings
          </TabTrigger>
        </TabList>

        <div className="border-b" />

        <div>
          <TabContent value="account">Make changes to your account.</TabContent>
          <TabContent value="documents">
            Access and update your documents.
          </TabContent>
          <TabContent value="settings">
            Edit your profile or update contact information.
          </TabContent>
        </div>
      </Tabs>,
    )

    const accountTab = getByRole('tab', { name: 'Account' })
    const documentsTab = getByRole('tab', { name: 'Documents' })
    const settingsTab = getByRole('tab', { name: 'Settings' })

    expect(accountTab).toHaveAttribute('aria-selected', 'true')
    expect(documentsTab).toHaveAttribute('aria-selected', 'false')
    expect(settingsTab).toHaveAttribute('aria-selected', 'false')

    await act(async () => {
      await userEvent.click(documentsTab)
    })

    expect(accountTab).toHaveAttribute('aria-selected', 'false')
    expect(documentsTab).toHaveAttribute('aria-selected', 'true')
    expect(settingsTab).toHaveAttribute('aria-selected', 'false')
  })

  it('renders tabs with solid background and text', async () => {
    const { getByRole } = render(
      <Tabs defaultValue="account">
        <TabList className="flex justify-between py-1.5">
          <TabTrigger value="account" variant="solid">
            Account
          </TabTrigger>
          <TabTrigger value="documents" variant="solid">
            Documents
          </TabTrigger>
          <TabTrigger disabled value="settings" variant="solid">
            Settings
          </TabTrigger>
        </TabList>

        <div className="border-b" />

        <div>
          <TabContent value="account">Make changes to your account.</TabContent>
          <TabContent value="documents">
            Access and update your documents.
          </TabContent>
          <TabContent value="settings">
            Edit your profile or update contact information.
          </TabContent>
        </div>
      </Tabs>,
    )

    const accountTab = getByRole('tab', { name: 'Account' })
    const documentsTab = getByRole('tab', { name: 'Documents' })
    const settingsTab = getByRole('tab', { name: 'Settings' })

    expect(accountTab).toHaveAttribute('aria-selected', 'true')
    expect(documentsTab).toHaveAttribute('aria-selected', 'false')
    expect(settingsTab).toHaveAttribute('aria-selected', 'false')

    await act(async () => {
      await userEvent.click(documentsTab)
    })
    expect(accountTab).toHaveAttribute('aria-selected', 'false')
    expect(documentsTab).toHaveAttribute('aria-selected', 'true')
    expect(settingsTab).toHaveAttribute('aria-selected', 'false')
  })
})
