import { clsx } from 'clsx'

const pageContentWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('py-4 lg:py-8 2xl:py-14 overflow-y-auto grow', className)

const pageContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('dashboard-container', className)

const pageContent = { pageContentWrapperClsx, pageContentClsx }

export { pageContent }
