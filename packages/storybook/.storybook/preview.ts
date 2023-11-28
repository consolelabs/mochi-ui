import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import './styles.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Installation', 'Design Philosophy'],
        'Icons',
        'Components',
      ],
    },
  },
}
