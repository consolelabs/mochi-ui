import { apple, avatar, socialIcons } from '~utils/image'
import { Icon } from '@iconify/react'
import Left from './Left'
import Right from './Right'

export default function Banner() {
  return (
    <section
      id="hero-banner"
      className="grid grid-cols-[1fr_minmax(0,36rem)_1fr] pb-4 sm:pb-10 pt-10 lg:py-30"
    >
      <div className="overflow-hidden relative">
        <div className="absolute top-0 right-0 bottom-0">
          <Left className="h-full" />
        </div>
      </div>
      <div>
        <h1 className="font-text text-center text-5xl sm:text-6xl lg:leading-tight lg:text-7xl tracking-tight leading-tight mb-12 mx-auto font-normal text-[#343433]">
          Pay your frens using crypto
        </h1>
        <div className="flex z-10 flex-col items-center mt-auto">
          <div className="relative p-3 mx-auto text-center xs:p-5">
            <div className="mb-3">
              <div className="max-w-[18rem] sm:max-w-[25rem] text-sm sm:text-lg text-white rounded-full p-5  overflow-hidden bg-gradient-to-b from-[#A7ACB5] to-[#BBB4BB] relative">
                A secure, convenient, and borderless way to{' '}
                <b className="font-semibold">send and receive</b> money. 🤘
              </div>
              <svg
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                className="ml-[60%] mt-[-1px]"
              >
                <path
                  d="M3.74397 0.351562H19.8136C18.1346 7.80185 11.9866 13.4139 4.41452 14.4082L0.872738 14.8733C0.468303 14.9264 0.21076 14.4535 0.47477 14.1426L3.28925 10.8278C5.81747 7.85009 6.00467 3.5371 3.74397 0.351562Z"
                  fill="#BBB4BB"
                />
              </svg>
            </div>
            <div>
              <span className="inline-flex items-center justify-center bg-[#F2F2F2] rounded-full w-[4.5rem] h-[4.5rem] p-2 mb-3">
                <img
                  src={avatar.src}
                  className="max-w-full max-h-full"
                  alt="avatar"
                />
              </span>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  document
                    ?.getElementById('slider')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline animate-bounce"
              >
                <Icon
                  height={50}
                  width={50}
                  color="#ADAFB7"
                  icon="heroicons:arrow-down-20-solid"
                />
              </button>
            </div>
            <img
              width={60}
              className="absolute top-0 left-0"
              src={socialIcons.src}
              alt="social icons"
            />
            <img
              width={30}
              className="absolute right-[1%] top-[8%]"
              src={apple.src}
              alt="apple"
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <Right className="h-full" />
      </div>
    </section>
  )
}
