import { cleanup, render } from '@testing-library/react'
import { Logo, LogoWithText } from '../src'

describe('Logo', () => {
  afterEach(cleanup)
  it('renders sizes correctly', () => {
    const { container: xlContainer } = render(<Logo size="xl" />)
    expect(xlContainer.querySelector('svg')).toHaveClass('w-[144px] h-[144px]')

    const { container: baseContainer } = render(<Logo />)
    expect(baseContainer.querySelector('svg')).toHaveClass('w-[75px] h-[75px]')
  })

  it('renders color schemes correctly', () => {
    const { container: mochiContainer } = render(<LogoWithText />)
    const mochiPathElements = mochiContainer.getElementsByTagName('path')

    expect(mochiPathElements[mochiPathElements.length - 1]).toHaveAttribute(
      'fill',
      '#E88B88',
    )

    const { container: lightContainer } = render(
      <LogoWithText scheme="light" />,
    )
    const lightPathElements = lightContainer.getElementsByTagName('path')

    expect(lightPathElements[lightPathElements.length - 1]).toHaveAttribute(
      'fill',
      '#FFFFFF',
    )
  })

  it('renders orientations correctly', () => {
    const { container: horizontalContainer } = render(<LogoWithText />)
    expect(horizontalContainer.firstChild).toHaveClass('flex-row')

    const { container: verticalContainer } = render(
      <LogoWithText orientation="vertical" />,
    )
    expect(verticalContainer.firstChild).toHaveClass('flex-col')
  })
})
