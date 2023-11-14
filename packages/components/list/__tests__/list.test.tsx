import { render } from '@testing-library/react'
import List from '../src/list'

const data = new Array(100).fill(0).map((_, idx) => `item + ${idx}`)
const renderItem = (item: string) => <div>{item}</div>

describe('List', () => {
  it('fires onEndReached when scrolled to the end of the list', () => {
    const onEndReached = jest.fn()
    const onEndReachedThreshold = 0
    const { getByTestId } = render(
      <List
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
      />,
    )
    const list = getByTestId('list-viewport') as HTMLDivElement
    list.scrollTop =
      list.scrollHeight - list.clientHeight - onEndReachedThreshold
    list.dispatchEvent(new Event('scroll'))
    expect(onEndReached).toHaveBeenCalledTimes(1)
  })

  it('does not fire onEndReached when not scrolled to the end of the list', () => {
    const onEndReached = jest.fn()
    const onEndReachedThreshold = 0
    const { getByTestId } = render(
      <List
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
      />,
    )
    const list = getByTestId('list-viewport') as HTMLDivElement
    list.scrollTop =
      list.scrollHeight - list.clientHeight - onEndReachedThreshold - 1
    list.dispatchEvent(new Event('scroll'))
    expect(onEndReached).not.toHaveBeenCalled()
  })
})
