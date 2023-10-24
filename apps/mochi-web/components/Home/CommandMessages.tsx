import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useIsVisible } from '~hooks/useIsVisible'

const DATA = [
  {
    sender: 'edwards',
    receiver: 'elenor',
    command: 'tip',
    message: '200 USDT happpieee 1-month baby 💕️',
  },
  {
    sender: 'jenny',
    receiver: 'henry',
    command: 'tip',
    message: '0.1 ETH happy birthday bro 🎂',
  },
  {
    sender: 'simmons',
    receiver: 'steward',
    command: 'tip',
    message: '10 ICY thanks for your contribution 🤘',
  },
  {
    sender: 'dianne',
    receiver: 'howard',
    command: 'tip',
    message: '2 BTC hope this helps! 💪🏻',
  },
  {
    sender: 'wade',
    receiver: 'alex',
    command: 'tip',
    message: '15 BNB my treat! 😋️',
  },
]

export default function CommandMessages() {
  const [index, setIndex] = useState(0)
  const [displayList, setDisplayList] = useState(DATA)
  const [transitionY, setTransitionY] = useState(82)
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(ref)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (isVisible) {
      interval = setInterval(() => {
        const nextIndex = index + 1
        setDisplayList((prev) => {
          return [...prev, DATA[index % DATA.length]]
        })
        const sliderItem = document.getElementsByClassName('slider-item')[0]
        const sliderItemHeight = sliderItem.clientHeight
        setTransitionY(sliderItemHeight)
        setIndex(nextIndex)
      }, 3000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [index, isVisible])

  const resetState = () => {
    setIndex(0)
    setDisplayList(DATA)
  }

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) {
      resetState()
    }
  }, [isVisible])

  return (
    <section id="slider" className="text-center" ref={ref}>
      <div className="container px-6 mx-auto">
        <div className="overflow-hidden relative max-h-[9rem] sm:max-h-[15rem]">
          <ul
            className={clsx(
              'text-center transition-all delay-150 duration-500',
            )}
            style={{
              transform: `translateY(-${index * transitionY}px)`,
            }}
          >
            {displayList.map((item, i) => (
              <li
                className={clsx(
                  'text-[10px] sm:text-xl lg:text-2xl flex items-center justify-center flex-nowrap whitespace-nowrap h-[3rem] sm:h-[5rem] transition-all duration-500 top-0 slider-item',
                )}
                key={item.sender + i}
              >
                <img
                  className="mr-2 w-6 h-6 sm:w-10 sm:h-10"
                  src={`/assets/tip/${item.sender}.png`}
                  alt="social icons"
                />
                {item.sender}
                <span className="text-[#017AFF] font-semibold">
                  &nbsp;{`/${item.command}`}&nbsp;
                </span>
                <span className="text-[#017AFF] font-semibold">
                  {`@${item.receiver}`}&nbsp;
                </span>
                {item.message}
              </li>
            ))}
          </ul>
          <div className="bg-gradient-to-b from-white-pure to-transparent absolute left-0 right-0 top-0 h-[50%]">
            &nbsp;
          </div>
          <div className="bg-gradient-to-t from-white-pure to-transparent absolute left-0 right-0 bottom-0 h-[50%]">
            &nbsp;
          </div>
        </div>
      </div>
    </section>
  )
}
