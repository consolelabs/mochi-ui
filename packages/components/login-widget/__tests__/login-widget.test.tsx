import { render } from '@testing-library/react'
import { LoginWidget, LoginWidgetProvider } from '../src/login-widget'

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
      <LoginWidgetProvider>
        <LoginWidget onSuccess={() => {}} />
      </LoginWidgetProvider>,
    )
  })
})
