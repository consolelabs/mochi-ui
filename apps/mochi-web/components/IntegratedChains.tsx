import React from 'react'
import Marquee from 'react-fast-marquee'
import clsx from 'clsx'

const Image = (props: any) => (
  <img
    {...props}
    className={clsx(
      props.className,
      'grayscale hover:grayscale-0 duration-100 ease-in-out mx-7 md:mx-10',
    )}
    style={{
      transitionProperty: 'filter',
    }}
    alt={props.alt}
  />
)

export const IntegratedChains = () => {
  return (
    <Marquee
      className="flex overflow-hidden flex-shrink-0 py-3 w-full h-14"
      pauseOnHover
      direction="right"
    >
      <Image
        className="h-full"
        src="/integrated-chains/btc.png"
        alt="btc-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/eth.png"
        alt="eth-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/ftm.png"
        alt="ftm-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/polygon.png"
        alt="polygon-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/sol.png"
        alt="sol-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/bnb.png"
        alt="bnb-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/base.webp"
        alt="base-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/arb.png"
        alt="arb-logo"
      />
      <Image className="h-full" src="/integrated-chains/op.png" alt="op-logo" />
    </Marquee>
  )
}
