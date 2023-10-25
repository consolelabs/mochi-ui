import clsx from 'clsx'
import type { ReactNode } from 'react';
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
  const {
    badge,
    title,
    Icon,
    href,
    as,
    type,
    children = [],
    ...props
  } = item

  const renderTitle = (
    <>
      {Icon !== undefined &&
        <Icon
          className={clsx(
            'ui-min-w-max',{
            'ui-text-blue-500' :selected,
            'ui-text-neutral-800': !selected,
          })}
          height={22}
          width={22}
        />
      }
      {expanded ? <div className='ui-flex ui-gap-2 ui-items-center'>
          <span className="ui-text-left ui-text-neutral-800 ui-text-sm ui-font-medium ui-tracking-tight ui-line-clamp-1">
            {title}
          </span>
          {Boolean(badge) && (
            <span className='ui-shrink-0'>
              {badge}
            </span>
          )}
        </div> : null}
    </>
  )

  if (type === 'list') {
    return (
      <Accordion className='ui-shadow-none !ui-p-0' type="multiple">
        <AccordionItem value={title}>
          <AccordionTrigger
            className='!hover:ui-bg-inherit'
            rightIcon={expanded ? null: true}
            wrapperClassName={clsx(
              {
                'ui-rounded hover:ui-bg-neutral-150': Boolean(expanded),
                '!ui-p-0': !expanded,
                'ui-p-2.5': expanded,
              },
              className,
            )}
          >
            <div
              className={clsx(
                  "ui-flex-1 ui-flex ui-gap-2 ui-items-center ui-rounded",{
                    "hover:ui-bg-neutral-150 ui-p-2.5": !expanded
                  }
                )}
            >
              {renderTitle}
            </div>
          </AccordionTrigger>
          <AccordionContent className="ui-pb-0" hasPadding={false}>
            {children.map((child) => (
              <SidebarItem
                className={clsx('ui-pl-8', className)}
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
    'ui-flex ui-gap-2 ui-items-center ui-p-2.5 ui-rounded ui-w-full ui-cursor-pointer hover:ui-bg-neutral-150',
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
