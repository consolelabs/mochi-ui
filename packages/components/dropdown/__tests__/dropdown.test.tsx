import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoinbaseWallet } from '@consolelabs/icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
} from '../src/dropdown'

const onClickFnc = jest.fn()

const MenuItems = [
  {
    children: 'Billing',
    leftIcon: <CoinbaseWallet />,
  },
  {
    children: 'Keyboard shortcuts',
    rightExtra: '⇧⌘P',
  },
  {
    children: 'Try click',
    onClick: onClickFnc,
  },
]

describe('Dropdown', () => {
  it('renders the dropdown with the correct menu items', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {MenuItems.map((item, index) => (
              <DropdownMenuItem key={index} {...item} />
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    const openMenuTrigger = getByText('Open menu')
    userEvent.click(openMenuTrigger)
    waitFor(() => {
      const billingItem = getByText('Billing')
      const keyboardShortcutsItem = getByText('Keyboard shortcuts')
      const tryClickItem = getByText('Try click')
      expect(billingItem).toBeInTheDocument()
      expect(keyboardShortcutsItem).toBeInTheDocument()
      expect(tryClickItem).toBeInTheDocument()
    })
  })

  it('renders the dropdown with radio items', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option3">
              Option 3
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    const openMenuTrigger = getByText('Open menu')
    userEvent.click(openMenuTrigger)
    waitFor(() => {
      const option1 = getByText('Option 1')
      const option2 = getByText('Option 2')
      const option3 = getByText('Option 3')
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
      expect(option3).toBeInTheDocument()
    })
  })

  it('renders the dropdown with a label', () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Billing</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    const openMenuTrigger = getByText('Open menu')
    userEvent.click(openMenuTrigger)

    waitFor(() => {
      const billingLabel = getByText('Billing')
      expect(billingLabel).toBeInTheDocument()
    })
  })

  it('renders the dropdown with a separator', () => {
    const { getByTestId, getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button>Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuSeparator data-testid="separator" />
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    const openMenuTrigger = getByText('Open menu')
    userEvent.click(openMenuTrigger)

    waitFor(() => {
      const separator = getByTestId('separator')
      expect(separator).toBeInTheDocument()
    })
  })

  it('renders the dropdown with a sub-menu', async () => {
    const { getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sub-menu</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup>
                    {[
                      {
                        children: 'Console Labs',
                        subtitle: (
                          <span className="flex gap-1 items-center">
                            Lvl 450
                          </span>
                        ),
                        isLeftIconAvatar: true,
                        value: 'first',
                      },
                      {
                        children: 'Techie Story',
                        subtitle: (
                          <span className="flex gap-1 items-center">
                            145 Boosts
                          </span>
                        ),
                        isLeftIconAvatar: true,
                        value: 'second',
                      },
                    ].map((props, index) => (
                      <DropdownMenuRadioItem key={index} {...props} />
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    const openMenuTrigger = getByText('Open menu')
    userEvent.click(openMenuTrigger)
    await waitFor(() => {
      const subMenuTrigger = getByText('Sub-menu')
      userEvent.click(subMenuTrigger)
    })

    await waitFor(() => {
      const subOption1 = getByText('Console Labs')
      const subOption2 = getByText('Techie Story')
      expect(subOption1).toBeInTheDocument()
      expect(subOption2).toBeInTheDocument()
    })
  })
})
