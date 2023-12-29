import { useMemo } from 'react'
import { Combobox } from '@headlessui/react'
import UI, { Platform } from '@consolelabs/mochi-formatter'
import { Profile } from '@consolelabs/mochi-rest'
import useSWR from 'swr'
import { API } from '~constants/api'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { SectionList } from '~cpn/base/section-list'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'
import Skeleton from '../Tip/Skeleton'
import { sectionFormatter } from '../TokenPicker/utils'

interface Props {
  loading: boolean
  recentRecipients: Profile[]
  selectedRecipients?: Profile[]
  queryValue: string
}

export const ContactList = (props: Props) => {
  const { isLoggedIn, profile } = useLoginWidget()
  const { recentRecipients, queryValue, selectedRecipients = [] } = props
  const { data: contacts = [], isLoading } = useSWR(
    ['contact-list', isLoggedIn, profile?.id],
    async ([_, isLoggedIn, profileId]) => {
      if (!isLoggedIn || !profileId) return []
      const data = await API.MOCHI_PROFILE.get(
        `/profiles/${profileId}/contacts`,
      ).json((r) => r.data)

      return data.map((d: any) => ({ ...d, group: 'recipient' }))
    },
  )

  const data = useMemo(() => {
    let result = [...contacts]
    if (queryValue) {
      result.unshift(
        ...recentRecipients
          .filter((rr) => result.every((r) => r.id !== rr.id))
          .map((r) => ({ ...r, group: 'recipient' })),
      )
    } else {
      result = [
        ...recentRecipients.map((rr) => ({ ...rr, group: 'recent' })),
        ...result,
      ]
    }

    return result.filter((i) => {
      const [profile] = UI.render(Platform.Web, i)

      return profile?.plain?.toLowerCase().includes(queryValue.toLowerCase())
    })
  }, [contacts, queryValue, recentRecipients])

  return (
    <SectionList
      loading={props.loading || isLoading}
      rootClassName="w-full h-full"
      listClassName="h-full"
      viewportClassName="[&>div]:h-full"
      sections={sectionFormatter(data, 'group')}
      SectionEmpty={<EmptyList />}
      renderItem={(item) => {
        const [profile] = UI.render(Platform.Web, item)

        return (
          <Combobox.Option key={item.id} value={item}>
            {({ active }) => (
              <RecipientItem
                active={active}
                avatar={item.avatar}
                profileName={profile?.plain}
                platform={profile?.platform as string}
                isSelected={selectedRecipients.some(
                  (recipient) =>
                    recipient.associated_accounts?.[0].id ===
                    item?.associated_accounts?.[0].id,
                )}
              />
            )}
          </Combobox.Option>
        )
      }}
      renderSectionHeader={(section) => (
        <label
          htmlFor="recipients"
          className="font-bold uppercase text-[0.625rem] text-neutral-500"
        >
          {section.title}
        </label>
      )}
      renderLoader={() => <Skeleton />}
    />
  )
}
