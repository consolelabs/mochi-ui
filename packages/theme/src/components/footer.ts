import clsx from 'clsx'

const footerClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('border-t border-divider', className)

const wrapperClsx =
  'pt-16 pb-5 md:py-18 md:h-[300px] w-full px-5 mx-auto xl:max-w-7xl 2xl:px-0'

const wrapperInnerClsx = 'flex flex-col gap-y-5 gap-x-8 sm:gap-x-12 md:flex-row'

const navClsx =
  'flex flex-col gap-y-7 gap-x-12 mb-10 sm:gap-x-24 sm:mb-0 md:flex-row md:gap-y-0'

const navBlockClsx = 'space-y-2 text-[13px]'

const navTitleClsx = 'text-[13px] font-normal text-text-primary'

const navLinkClsx = 'block text-text-secondary'

const infoClsx =
  'flex flex-col justify-center items-center mx-auto md:items-end md:mr-0 md:ml-auto'

const copyrightClsx = 'mb-6 text-xs text-right'

const socialClsx = 'flex gap-2 items-center'

const socialLinkClsx =
  'text-text-primary inline-flex items-center justify-center w-8 h-8 p-[6px] border border-[#26272B1A] rounded-full overflow-hidden'

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
