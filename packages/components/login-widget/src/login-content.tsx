import { loginWidget } from '@mochi-ui/theme'
import { Button } from '@mochi-ui/button'
import { ArrowLeftLine } from '@mochi-ui/icons'
import { AnimatePresence, m, Transition, Variants } from 'framer-motion'
import { useState } from 'react'
import ConnectSocial from './connect-social'
import WalletList from './wallet-list'
import { useLoginWidget } from './store'
import { ChainProvider } from './providers/provider'

const { loginContentClsx, loginWalletListWrapperClsx } = loginWidget

const variants: Variants = {
  enter: (direction: number) => {
    return {
      position: 'relative',
      x: direction > 0 ? '110%' : '-110%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      position: 'absolute',
      x: direction < 0 ? '110%' : '-110%',
      opacity: 0.2,
      scale: 0.95,
    }
  },
}

const transition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

const commonProps = {
  transition,
  variants,
  initial: 'enter',
  animate: 'center',
  exit: 'exit',
}

export default function LoginContent({
  onSelectWallet,
  raw = false,
  chain,
}: {
  onSelectWallet: (w: ChainProvider) => void
  raw?: boolean
  chain?: string
}) {
  const { connectors } = useLoginWidget()
  const [state, setState] = useState({ step: chain ? 2 : 1, direction: 0 })

  return (
    <div className={loginContentClsx({ className: raw ? 'p-0' : 'p-4' })}>
      <AnimatePresence initial={false} custom={state.direction}>
        {state.step === 1 ? (
          <m.div key={state.step} custom={state.direction} {...commonProps}>
            <ConnectSocial setState={setState} />
          </m.div>
        ) : (
          <m.div
            key={state.step}
            custom={state.direction}
            {...commonProps}
            className={loginWalletListWrapperClsx()}
          >
            <WalletList
              chain={chain}
              connectors={connectors}
              onSelectWallet={onSelectWallet}
            />
            {!chain && (
              <Button
                type="button"
                onClick={() => setState({ step: 1, direction: -1 })}
                size="lg"
                color="neutral"
                variant="outline"
              >
                <ArrowLeftLine />
                Back
              </Button>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
