import { Typography } from '@mochi-ui/typography'
import { render } from '@testing-library/react'
import SectionList from '../src/section-list'

const eatNDrink = [
  {
    id: 1,
    icon: '🍔',
    message: 'Burger treat for you',
  },
  {
    id: 2,
    icon: '🍟',
    message: 'Fries on me tonight!',
  },
  {
    id: 3,
    icon: '🍺',
    message: 'Beer treat for you!',
  },
]

const birthday = [
  {
    id: 1,
    icon: '🎉',
    message: 'Happy birthday!',
  },
  {
    id: 2,
    icon: '🎁',
    message: 'Happy trip around the sun!',
  },
  {
    id: 3,
    icon: '🎂',
    message: 'Birthday wishes & treats',
  },
]

const sectionData = [
  {
    title: 'EAT & DRINK',
    data: eatNDrink,
  },
  {
    title: 'BIRTHDAY',
    data: birthday,
  },
]

function renderSectionHeader(
  section: (typeof sectionData)[number],
  index?: number,
) {
  return (
    <div className="flex flex-row items-center w-full" key={index}>
      <Typography
        level="p6"
        className="uppercase"
        fontWeight="xl"
        color="textSecondary"
      >
        {section.title}
      </Typography>
    </div>
  )
}

function renderItem(item: (typeof eatNDrink)[number]) {
  return (
    <li
      className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2"
      key={item.id}
    >
      <span className="text-sm w-6 h-6">{item.icon}</span>
      <div className="flex flex-col flex-1">
        <Typography level="h3" className="text-sm">
          {item.message}
        </Typography>
      </div>
    </li>
  )
}
describe('SectionList', () => {
  it('calls onEndReached when end of list is reached', () => {
    const onEndReached = jest.fn()
    const onEndReachedThreshold = 0
    const { getByTestId } = render(
      <div style={{ height: '200px', overflow: 'scroll' }}>
        <SectionList
          sections={sectionData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </div>,
    )
    const list = getByTestId('section-list-viewport')
    list.scrollTop =
      list.scrollHeight - list.clientHeight - onEndReachedThreshold
    list.dispatchEvent(new Event('scroll'))
    expect(onEndReached).toHaveBeenCalled()
  })

  it('does not call onEndReached when end of list is not reached', () => {
    const onEndReached = jest.fn()
    const onEndReachedThreshold = 0
    const { getByTestId } = render(
      <div style={{ height: '200px', overflow: 'scroll' }}>
        <SectionList
          sections={sectionData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </div>,
    )
    const list = getByTestId('section-list-viewport')
    list.scrollTop =
      list.scrollHeight - list.clientHeight - onEndReachedThreshold - 1
    list.dispatchEvent(new Event('scroll'))
    expect(onEndReached).not.toHaveBeenCalled()
  })
})
