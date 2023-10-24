import clsx from 'clsx'
import { type Attributes, createElement, type MouseEventHandler } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion'

export interface Item {
  title: string
  // FIXME: ignore typescript warning
  Icon: (props: any) => JSX.Element
  selected?: boolean
  type?: 'list' | 'button' | 'link'
  as?: React.ComponentType<any>
  href?: string
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
  const {
    title,
    Icon,
    selected,
    href,
    as,
    type,
    children = [],
    ...props
  } = item

  if (type === 'list') {
    return (
      <Accordion type="multiple">
        <AccordionItem value={title}>
          <AccordionTrigger
            wrapperClassName={clsx('ui-pt-0 ui-pb-0', {
              'ui-rounded hover:ui-bg-neutral-150': Boolean(expanded),
            })}
          >
            <div className="ui-flex ui-gap-2 ui-items-center ui-p-2 ui-rounded hover:ui-bg-neutral-150">
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

  const classNameProp = clsx(
    'ui-flex ui-gap-2 ui-items-center ui-p-2 ui-rounded ui-w-full ui-cursor-pointer hover:ui-bg-neutral-150',
    { 'ui-bg-neutral-150': selected },
    className,
  )

  if (type === 'link' && href) {
    const isAbsolute = href.startsWith('http')
    if (as) {
      return createElement(
        as,
        {
          className: classNameProp,
          href,
          ...(isAbsolute ? { target: '_blank', rel: 'noopener' } : {}),
          ...props,
        } as Attributes,
        [
          <Icon
            className="ui-text-neutral-800"
            height={22}
            key={`sidebar-item-children-1-${title}`}
            width={22}
          />,
          ...(expanded
            ? [
                <span
                  className="ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight"
                  key={`sidebar-item-children-2-${title}`}
                >
                  {title}
                </span>,
              ]
            : []),
        ],
      )
    }

    return (
      <a className={classNameProp} {...props} href={href}>
        <Icon className="ui-text-neutral-800" height={22} width={22} />
        {Boolean(expanded) && (
          <span className="ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight">
            {title}
          </span>
        )}
      </a>
    )
  }

  return (
    <button className={classNameProp} type="button" {...props}>
      <Icon className="ui-text-neutral-800" height={22} width={22} />
      {Boolean(expanded) && (
        <span className="ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight">
          {title}
        </span>
      )}
    </button>
  )
}
