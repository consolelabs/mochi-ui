import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import Button from '~cpn/base/button/button'
import { IconArrow } from '@consolelabs/ui-components'
import clsx from 'clsx'
import { ROUTES } from '~constants/routes'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404" tailTitle />
      <div
        className={clsx(
          'relative',
          'flex flex-col items-center justify-center text-center',
          'sm:mx-auto sm:py-60 sm:px-12 sm:max-w-2xl',
          'mx-4 px-8 py-10',
        )}
      >
        <h3 className="sm:absolute -z-10 text-[#F4F3F2] sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 text-[160px] md:text-[420px] sm:text-[340px] w-fit">
          404
        </h3>
        <div
          className={clsx(
            'flex flex-col items-center justify-center text-center',
            'sm:gap-6 gap-4',
          )}
        >
          <h3 className="font-medium text-2xl sm:text-3xl">
            We lost this page
          </h3>
          <p className="sm:text-lg text-sm">
            The page you are looking for doesn&apos;t exist or has been moved
          </p>
          <div className="flex gap-3 sm:w-fit sm:flex-row flex-col-reverse w-full">
            <Link href={ROUTES.HOME}>
              <Button className="h-12 w-full sm:w-[144px] gap-2 shadow-sm">
                <IconArrow className="rotate-180" />
                Go back
              </Button>
            </Link>
            <Link href={ROUTES.HOME}>
              <Button
                className="text-base shadow-none !bg-blue-700 text-white !border-blue-700 h-12 w-full sm:w-[144px]"
                href={ROUTES.HOME}
              >
                Confirm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
