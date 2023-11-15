import { render } from '@testing-library/react'
import LoginWidget from '../src/login-widget'

const mockAuthUrl = 'https://mock.example/api/v1/profiles/auth' as const
const mockMeUrl = 'https://mock.example/api/v1/profiles/auth' as const
jest.mock('@uidotdev/usehooks', () => {
  return {
    useWindowSize: () => ({ width: 1000, height: 1000 }),
  }
})
jest.mock('browser-string-hexer', () => (h: string) => h)

jest.mock('@consolelabs/mochi-store', () => ({
  useMochi: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}))

describe('LoginWidget', () => {
  it('renders without crashing', () => {
    render(
      <LoginWidget
        authUrl={mockAuthUrl}
        meUrl={mockMeUrl}
        onOpenChange={jest.fn()}
        onSuccess={jest.fn()}
        open={false}
      />,
    )
  })
})
