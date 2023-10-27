import clsx from 'clsx'
import type { ReactNode } from 'react'
import { type Attributes, createElement, type MouseEventHandler } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion'

export interface Item {
  title: string
  Icon?: (props: any) => JSX.Element
  selected?: boolean
  type?: 'list' | 'button' | 'link'
  as?: React.ComponentType<any>
  href?: string
  children?: Item[]
  onClick?: MouseEventHandler
  badge?: ReactNode
}

interface SidebarItemProps {
  item: Item
  expanded: boolean
  className?: string
  selected?: boolean
}

export default function SidebarItem({
  item,
  expanded,
  className,
  selected,
}: SidebarItemProps) {
  const { badge, title, Icon, href, as, type, children = [], ...props } = item

  const renderTitle = (
    <>
      {Icon !== undefined && (
        <Icon
          className={clsx('min-w-max', {
            'text-blue-500': selected,
            'text-neutral-800': !selected,
          })}
          height={22}
          width={22}
        />
      )}
      {expanded ? (
        <div className="flex gap-2 items-center">
          <span className="text-left text-neutral-800 text-sm font-medium tracking-tight line-clamp-1">
            {title}
          </span>
          {Boolean(badge) && <span className="shrink-0">{badge}</span>}
        </div>
      ) : null}
    </>
  )

  if (type === 'list') {
    return (
      <Accordion className="shadow-none !p-0" type="multiple">
        <AccordionItem value={title}>
          <AccordionTrigger
            className="!hover:bg-inherit"
            rightIcon={expanded ? null : true}
            wrapperClassName={clsx(
              {
                'rounded hover:bg-neutral-150': Boolean(expanded),
                '!p-0': !expanded,
                'p-2.5': expanded,
              },
              className,
            )}
          >
            <div
              className={clsx('flex-1 flex gap-2 items-center rounded', {
                'hover:bg-neutral-150 p-2.5': !expanded,
              })}
            >
              {renderTitle}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0" hasPadding={false}>
            {children.map((child) => (
              <SidebarItem
                className={clsx('pl-8', className)}
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
    'flex gap-2 items-center p-2.5 rounded w-full cursor-pointer hover:bg-neutral-150',
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
        [renderTitle],
      )
    }

    return (
      <a className={classNameProp} {...props} href={href}>
        {renderTitle}
      </a>
    )
  }

  return (
    <button className={classNameProp} type="button" {...props}>
      {renderTitle}
    </button>
  )
}
