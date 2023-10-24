import { GetServerSideProps } from 'next'
import { SEO } from '~app/layout/seo'
import { API } from '~constants/api'
import { HOME_URL } from '~envs'
import { Layout } from '~app/layout'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTimer } from 'use-timer'

const KEY = 'mochi.airdrop.join_id'

const numberFormat = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 })

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const airdropId = ctx.params?.id
  let joinId = ctx.query.join_id

  if (!airdropId) {
    return {
      notFound: true,
    }
  }

  if (!joinId) {
    return {
      props: {
        ended: false,
        valid: false,
        airdropId,
      },
    }
  }

  // attempt to join with joinId
  const joinRes = await API.MOCHI_PAY.post(
    {},
    `/pay-requests/airdrop/${airdropId}/join/${joinId}`,
  )
    .json((r) => r.data)
    .catch(() => null)

  if (!joinRes) {
    return {
      notFound: true,
    }
  }

  // and then try to get the link assuming that the airdrop already ended
  const res = await API.MOCHI_PAY.get(
    `/pay-requests/airdrop/${airdropId}/link/${joinId}`,
  )
    .json((r) => r.data)
    .catch(() => null)

  // the airdrop really ended and this joinId is valid -> redirect to pay link
  if (res?.pay_request?.code) {
    return {
      props: {
        ended: true,
        valid: true,
        joinId,
        airdropId,
        code: res.pay_request.code,
      },
    }
  }

  // no data -> maybe the airdrop is still ongoing?
  const isAirdropOngoing =
    Date.now() < (Number(joinRes.airdrop?.end_at_unix) ?? 0) * 1000

  if (isAirdropOngoing) {
    return {
      props: {
        ended: false,
        valid: false,
        joinId,
        airdropId,
        timeout: Number(joinRes.airdrop.end_at_unix) * 1000 - Date.now(),
      },
    }
  }

  // invalid recipient, show message
  return {
    props: {
      ended: true,
      valid: false,
      joinId,
      airdropId,
    },
  }
}

function Countdown(props: any) {
  const { start, reset, time } = useTimer({
    initialTime: props.countdown / 1000,
    timerType: 'DECREMENTAL',
  })

  useEffect(() => {
    if (props.countdown / 1000 <= 0) return
    start()

    return () => {
      reset()
    }
  }, [props.countdown, reset, start])

  return (
    <>
      <p>{numberFormat.format(Math.max(0, Math.floor(time / 3600)))}</p>
      <p>:</p>
      <p>{numberFormat.format(Math.max(Math.floor((time % 3600) / 60)))}</p>
      <p>:</p>
      <p>{numberFormat.format(Math.max(Math.floor(time % 60)))}</p>
    </>
  )
}

export default function Airdrop({
  ended,
  airdropId,
  joinId: _joinId,
  valid,
  code,
  timeout,
}: {
  ended: boolean
  valid: boolean
  joinId?: string
  airdropId: string
  code?: string
  timeout?: number
}) {
  const { reload, replace } = useRouter()
  const [joined, setJoined] = useState(
    !ended && !valid && typeof timeout === 'number',
  )
  const [countdown, setCountdown] = useState(timeout ?? 0)

  const waitAndGetLink = useCallback(
    (joinId: string) => {
      setTimeout(() => {
        API.MOCHI_PAY.get(`/pay-requests/airdrop/${airdropId}/link/${joinId}`)
          .json((r) => r.data)
          .then((res) => {
            if (res) {
              replace(`/pay/${res?.pay_request?.code}`)
            } else {
              // reload to show invalid message
              reload()
            }
          })
          .catch(() => null)
        // wait more 3 seconds to make sure
      }, (timeout ?? 0) + 3000)
    },
    [airdropId, reload, replace, timeout],
  )

  useEffect(() => {
    let joinId = _joinId
    if (!joinId) {
      joinId =
        localStorage.getItem(`${KEY}-${airdropId}`) ??
        window.crypto.randomUUID()
      localStorage.setItem(`${KEY}-${airdropId}`, joinId)
      replace(`/airdrop/${airdropId}?join_id=${joinId}`)
      return
    }

    localStorage.setItem(`${KEY}-${airdropId}`, joinId)

    if (!ended && !valid && typeof timeout === 'number') {
      // we just wait
      waitAndGetLink(joinId)
    } else if (!ended && !valid) {
      // first time visit, join manually
      setTimeout(() => {
        if (!joinId) return
        API.MOCHI_PAY.post(
          {},
          `/pay-requests/airdrop/${airdropId}/join/${joinId}`,
        )
          .json((r) => r.data)
          .then((joinRes) => {
            if (!joinRes || !joinId) return
            const countdown =
              Number(joinRes.airdrop?.end_at_unix ?? 0) * 1000 - Date.now()
            const isEnded = countdown <= 0
            if (isEnded) return
            setJoined(true)
            setCountdown(countdown)
            waitAndGetLink(joinId)
          })
          .catch(() => null)
      }, 2000)
    } else if (ended && valid && code) {
      setTimeout(() => {
        replace(`/pay/${code}`)
      }, 2000)
    }
  }, [_joinId, airdropId, code, ended, replace, timeout, valid, waitAndGetLink])

  useEffect(() => {
    if (!ended && !valid && typeof timeout === 'number') {
      setJoined(true)
      setCountdown(timeout)
    }
  }, [ended, timeout, valid])

  const isWaiting = !ended && !valid && joined && countdown > 0
  const redirectingToPaylink = ended && valid

  return (
    <Layout>
      <SEO
        title="Airdrop"
        tailTitle
        description="There is an airdrop ongoing, join now!"
        url={`${HOME_URL}/airdrop/${airdropId}`}
        image={`${HOME_URL}/mochisan-stars.png`}
      />
      <div
        className={clsx(
          'flex flex-col p-4 sm:p-8 sm:pt-4 mx-auto text-center bg-white rounded-2xl mb-32 md:mb-64 max-w-sm',
        )}
      >
        <Image
          width={250}
          height={250}
          className={clsx('object-contain mx-auto', {
            'animate-float': isWaiting,
            'scale-x-[-1]': redirectingToPaylink,
          })}
          src={
            isWaiting
              ? '/assets/mochisan-meditate.png'
              : redirectingToPaylink
              ? '/assets/mochisan.png'
              : '/assets/mochisan-stars.png'
          }
          alt="mochisan with a lot of stars"
        />
        <div className="mt-2">
          {!ended && !valid ? (
            !joined ? (
              'Joining airdrop...'
            ) : (
              <div>
                <div className="flex justify-center items-center text-3xl">
                  <Countdown countdown={countdown} />
                </div>
                <p className="text-sm font-thin">until airdrop ends</p>
                <p className="mt-3">Patience is a virtue!</p>
              </div>
            )
          ) : ended && !valid ? (
            "The airdrop ended but you wasn't on the list, better luck next time!"
          ) : ended && valid ? (
            'Congrats! Redirecting you to the Pay Link now...'
          ) : (
            ''
          )}
        </div>
      </div>
    </Layout>
  )
}
