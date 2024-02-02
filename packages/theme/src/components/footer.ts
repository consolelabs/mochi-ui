import clsx from 'clsx'

const footerClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('border-t border-divider', className)

const wrapperClsx = 'pt-16 pb-5 md:py-18 md:min-h-[300px] landing-container'

const wrapperInnerClsx = 'flex flex-col gap-y-5 gap-x-8 sm:gap-x-12 lg:flex-row'

const navClsx =
  'flex flex-col gap-y-7 gap-x-12 mb-10 sm:gap-x-24 sm:mb-0 md:flex-row md:gap-y-0'

const navBlockClsx = 'space-y-2 text-[13px]'

const navTitleClsx = 'text-[13px] font-normal text-text-primary'

const navLinkClsx = 'block text-text-tertiary'

const infoClsx =
  'flex flex-col justify-center items-center mx-auto md:items-end md:mr-0 md:ml-auto gap-6'

const copyrightClsx = 'text-xs text-right'

const socialClsx = 'flex gap-2 items-center'

const socialLinkClsx =
  'text-text-primary inline-flex items-center justify-center w-8 h-8 p-[6px] border border-neutral-outline-border rounded-full overflow-hidden'

export const footer = {
  footerClsx,
  wrapperClsx,
  wrapperInnerClsx,
  navClsx,
  navBlockClsx,
  navTitleClsx,
  navLinkClsx,
  infoClsx,
  socialClsx,
  copyrightClsx,
  socialLinkClsx,
}
