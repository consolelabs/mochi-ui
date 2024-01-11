import {
  Apt,
  Arb,
  Atom,
  Bnb,
  Btc,
  DiscordColored,
  Eth,
  Ftm,
  FacebookColored,
  Github,
  GoogleColored,
  Matic,
  Mnt,
  Op,
  Ron,
  RedditColored,
  Sol,
  Sui,
  SlackColored,
  Ton,
  X,
  ZkSync,
  FarcasterColored,
  TelegramColored,
} from '@mochi-ui/icons'
import clsx from 'clsx'

const socials: [
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element,
  string,
  boolean,
][] = [
  [DiscordColored, 'Discord', false],
  [FacebookColored, 'Facebook', false],
  [TelegramColored, 'Telegram', false],
  [RedditColored, 'Reddit', true],
  [GoogleColored, 'Google', false],
  [X, 'X', false],
  [Github, 'Github', true],
  [SlackColored, 'Slack', true],
  [FarcasterColored, 'Farcaster', true],
]
const networks: [
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element,
  string,
  boolean,
][] = [
  [Sol, 'Solana', false],
  [Eth, 'Ethereum', false],
  [Btc, 'BTC', true],
  [Arb, 'Arbitrum', false],
  [Op, 'Optimism', false],
  [ZkSync, 'zkSync', false],
  [Matic, 'Polygon', false],
  [Ron, 'Ronin', true],
  [Mnt, 'Mantle', false],
  [Ftm, 'Fantom', false],
  [Ton, 'TON', false],
  [Apt, 'Aptos', true],
  [Sui, 'Sui', true],
  [Atom, 'Cosmos', true],
  [Bnb, 'BNB chain', false],
]

function Platform({
  Icon,
  name,
  comingSoon,
}: {
  comingSoon: boolean
  name: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}) {
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center p-6 border-r border-b border-neutral-300">
      <div className="relative">
        <Icon
          className={clsx('w-10 h-10', {
            'opacity-50': comingSoon,
          })}
        />
        {comingSoon && (
          <span className="absolute bottom-0 left-1/2 px-1 leading-3 rounded-full border -translate-x-1/2 translate-y-1/2 text-xxxs bg-white-pure border-neutral-200">
            soon
          </span>
        )}
      </div>
      <span className={clsx('text-base', { 'opacity-50': comingSoon })}>
        {name}
      </span>
    </div>
  )
}

export function SupportedPlatforms() {
  return (
    <div className="hidden flex-col mt-16 md:flex landing-container">
      <p className="text-4xl font-medium text-center font-text">
        Supported platforms
      </p>
      <div className="flex flex-col gap-y-8 mt-8">
        <div className="flex flex-col gap-y-4">
          <span className="text-lg font-medium">Socials</span>
          <div className="grid grid-cols-5 auto-rows-auto border-t border-l border-neutral-300">
            {socials.map(
              ([Icon, name, comingSoon]) =>
                !comingSoon && (
                  <Platform
                    key={name}
                    Icon={Icon}
                    name={name}
                    comingSoon={comingSoon}
                  />
                ),
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-lg font-medium">Networks</span>
          <div className="grid grid-cols-5 auto-rows-auto border-t border-l border-neutral-300">
            {networks.map(
              ([Icon, name, comingSoon]) =>
                !comingSoon && (
                  <Platform
                    key={name}
                    Icon={Icon}
                    name={name}
                    comingSoon={comingSoon}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
