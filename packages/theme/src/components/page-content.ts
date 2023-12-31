import { clsx } from 'clsx'

const pageContentWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('p-4 lg:p-8 min-[1440px]:p-14 overflow-y-auto grow', className)

const pageContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('max-w-[1108px] mx-auto', className)

const pageContent = { pageContentWrapperClsx, pageContentClsx }

export { pageContent }
