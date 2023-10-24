import { Icon } from '@iconify/react'
import { useCallback, useEffect, useState } from 'react'
import MochiWidget from './MochiWidget'
import { api, UI } from '../constants/mochi'
import { Transition } from '@headlessui/react'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import Link from 'next/link'

type Tx = {
  code: string
  from: string
  to: string
  token: {
    icon: string
    symbol: string
  }
  amount: string
}

const limit = 25 as const

export default function Feed() {
  const [txns, setTxns] = useState<Tx[]>([])

  const addNewTxn = useCallback((tx: Tx) => {
    setTxns((old) => {
      return [tx, ...old].slice(0, limit)
    })
  }, [])

  useEffect(() => {
    api.pay.transactions
      .getAll({ action: 'transfer', page: 0, size: limit })
      .then(({ ok, data }) => {
        if (!ok) return
        Promise.allSettled(
          data.map(async (d) => {
            const [from, to] = await UI.resolve(
              Platform.Web,
              d.from_profile_id,
              d.other_profile_id,
            )

            return {
              code: d.external_id,
              from: d.type === 'in' ? to?.plain : from?.plain,
              to: d.type === 'in' ? from?.plain : to?.plain,
              token: {
                icon: d.token.icon,
                symbol: d.token.symbol,
              },
              amount: mochiUtils.formatTokenDigit(
                utils.formatUnits(d.amount, d.token.decimal),
              ),
            }
          }),
        ).then((results) => {
          setTxns(
            results
              .map((c) => (c.status === 'fulfilled' ? c.value : null))
              .filter(Boolean) as any,
          )
        })
      })
  }, [setTxns])

  useEffect(() => {
    const ws = new WebSocket(
      'wss://api-preview.mochi-pay.console.so/ws/transactions',
    )
    ws.onopen = function (e) {
      console.log('feed connected', e)
    }

    ws.onmessage = async function (e) {
      try {
        const payload = JSON.parse(e.data)
        const { event, data } = payload
        if (event !== 'TRANSFER_CREATED') return
        const [from, to] = await UI.resolve(
          Platform.Web,
          data.from_profile_id,
          data.other_profile_id,
        )
        addNewTxn({
          code: data.external_id,
          from: (data?.type === 'in' ? to?.plain : from?.plain) ?? '',
          to: (data?.type === 'in' ? from?.plain : to?.plain) ?? '',
          amount: mochiUtils.formatTokenDigit(
            utils.formatUnits(data.amount, data.token.decimal),
          ),
          token: {
            icon: data.token.icon,
            symbol: data.token.symbol,
          },
        })
      } catch (e) {}
    }

    ws.onclose = function () {
      console.log('disconnect')
    }

    ws.onerror = function (e) {
      console.log('error', e)
    }

    return () => {
      ws.close()
    }
  }, [addNewTxn])

  return (
    <div className="flex relative justify-center py-7 px-8 bg-white md:py-14 md:px-16 h-[800px]">
      <div className="flex justify-start items-center w-full max-w-5xl">
        <div className="flex relative flex-col flex-1 h-full">
          <div className="flex gap-x-2 items-center">
            <Icon
              icon="octicon:feed-star-16"
              className="w-5 h-5 text-yellow-500"
            />
            <p className="text-2xl">Recent transactions</p>
          </div>
          <ul className="flex overflow-hidden relative flex-col gap-y-2 py-3 px-1 w-full h-full">
            {txns.map((item) => {
              return (
                <Transition
                  key={item.code}
                  appear
                  show
                  enter="transition duration-300"
                  enterFrom="opacity-0 -translate-x-5"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <li className="flex items-center">
                    <Link
                      href={`/tx/${item.code}`}
                      target="_blank"
                      className="p-0.5 font-mono text-sm underline rounded opacity-80 hover:opacity-90"
                    >
                      {item.code.slice(0, 5)}
                    </Link>
                    <span className="mr-1 ml-0.5">/</span>
                    <span className="flex text-sm font-medium whitespace-nowrap sm:text-base font-text">
                      {item.from} sent{' '}
                      <img
                        className="object-contain mx-1 mt-1 w-4 h-4 rounded-full"
                        src={item.token.icon}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            api.fallbackCoinEmoji.emoji_url
                        }}
                        alt=""
                      />{' '}
                      {item.amount} {item.token.symbol} to {item.to}
                    </span>
                  </li>
                </Transition>
              )
            })}
            <div className="pointer-events-none bg-gradient-to-l from-white to-transparent absolute right-0 h-full w-[10%]">
              &nbsp;
            </div>
          </ul>
        </div>
        <div className="pointer-events-none bg-gradient-to-t from-white-pure to-transparent absolute left-0 right-0 bottom-0 h-[50%]">
          &nbsp;
        </div>
        <div className="flex flex-1 justify-center items-center realtive">
          <MochiWidget />
        </div>
      </div>
    </div>
  )
}
