import clsx from 'clsx'
import type { MouseEventHandler } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion'

export interface Item {
  title: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  selected?: boolean
  type?: 'list' | 'button'
  children?: Item[]
  onClick?: MouseEventHandler
}

interface SidebarItemProps {
  item: Item
  expanded: boolean
  className?: string
}

export default function SidebarItem({
  item,
  expanded,
  className,
}: SidebarItemProps) {
  const { title, Icon, selected, type, children = [], ...props } = item

  if (type === 'list') {
    return (
      <Accordion type="multiple">
        <AccordionItem value={title}>
          <AccordionTrigger wrapperClassName="ui-pt-0 ui-pb-0 ui-rounded hover:ui-bg-neutral-150">
            <div className="ui-flex ui-gap-2 ui-items-center ui-p-2">
              <Icon className="ui-text-neutral-800" height={22} width={22} />
              {Boolean(expanded) && (
                <span className="ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight">
                  {title}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="ui-pb-0">
            {children.map((child) => (
              <SidebarItem
                className="ui-pl-8"
                expanded={expanded}
                item={child}
                key={child.title}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <button
      className={clsx(
        'ui-flex ui-gap-2 ui-items-center ui-p-2 ui-rounded ui-w-full ui-cursor-pointer hover:ui-bg-neutral-150',
        { 'ui-bg-neutral-150': selected },
        className,
      )}
      type="button"
      {...props}
    >
      <Icon className="ui-text-neutral-800" height={22} width={22} />
      {Boolean(expanded) && (
        <span className="ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight">
          {title}
        </span>
      )}
    </button>
  )
}
