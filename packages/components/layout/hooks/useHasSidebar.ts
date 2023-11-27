import { Children } from 'react'
import { Sidebar } from '@consolelabs/sidebar'

export function useHasSidebar(children?: React.ReactNode) {
  const childNodes = Children.toArray(children)

  return childNodes.some(
    (node) => (node as React.ReactElement<any, any>).type === Sidebar,
  )
}
