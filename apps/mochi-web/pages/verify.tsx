import { useCallback, useState } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { button } from '~cpn/base/button'
import { PAGES } from '~constants'
import { API } from '~constants/api'
import { useAppWalletContext } from '~context/wallet-context'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { WretchError } from 'wretch'
import { useAuthStore } from '~store'
import { shallow } from 'zustand/shallow'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code, guild_id } = ctx.query

  if (!code)
    return {
      notFound: true,
    }

  return {
    props: {
      code,
      guild_id,
    },
  }
}

export default function Verify({
  code,
  guild_id,
}: {
  code: string
  guild_id?: string
}) {
  const mounted = useHasMounted()
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, _setError] = useState('')
  const { showConnectModal, closeConnectModal, disconnect } =
    useAppWalletContext()
  const { login, isLoggedIn } = useAuthStore(
    (s) => ({ login: s.login, isLoggedIn: s.isLoggedIn }),
    shallow,
  )

  const setError = useCallback(
    (e: WretchError) => {
      _setError(e.json?.msg ?? 'Something went wrong')
    },
    [_setError],
  )

  if (!mounted) return null

  return (
    <Layout>
      <SEO title={PAGES.VERIFY.title} tailTitle />
      <div className="flex relative flex-col items-center">
        <div className="py-16 px-12 mx-auto max-w-7xl">
          <div className="py-24 md:py-48">
            {!error ? (
              verified ? (
                <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                  <div className="text-2xl font-black text-center md:text-3xl">
                    <span className="uppercase text-mochi-gradient">
                      Your wallet is verified! You can close this window
                    </span>{' '}
                    ✨
                  </div>
                </div>
              ) : (
                <div className="py-8 px-6 mx-auto w-full max-w-xs sm:max-w-7xl">
                  <h3 className="mb-4 text-3xl font-black text-center uppercase md:text-4xl lg:text-5xl text-mochi-gradient">
                    Verify your wallet
                  </h3>
                  <p className="mx-auto mb-3 max-w-sm font-medium text-center">
                    Connect your wallet to verify and get full access to Mochi
                    with more exclusive privileges.
                  </p>
                  <div className="flex gap-x-2 justify-center">
                    <>
                      <button
                        disabled={loading}
                        className={button({ size: 'sm' })}
                        onClick={() =>
                          showConnectModal(
                            async ({ signature, address, platform, msg }) => {
                              if (!code || loading) return
                              setLoading(true)
                              const payload = {
                                wallet_address: address,
                                code,
                                signature,
                                message: msg,
                              }

                              API.MOCHI_PROFILE.post(
                                payload,
                                `/profiles/me/accounts/connect-${platform}`,
                              )
                                .badRequest(setError)
                                .json((r) => {
                                  const user_discord_id =
                                    r.associated_accounts.find(
                                      (aa: any) => aa.platform === 'discord',
                                    )?.platform_identifier
                                  if (!guild_id) {
                                    setVerified(true)
                                  } else if (user_discord_id) {
                                    API.MOCHI.post(
                                      {
                                        user_discord_id,
                                        guild_id,
                                      },
                                      `/verify/assign-role`,
                                    )
                                      .badRequest(setError)
                                      .res(() => {
                                        setVerified(true)

                                        if (!isLoggedIn) {
                                          // log the user in with the new connected discord account
                                          API.MOCHI_PROFILE.post(
                                            payload,
                                            `/profiles/auth/${platform}`,
                                          )
                                            .json((r) =>
                                              login({
                                                token: r.data.access_token,
                                              }),
                                            )
                                            .catch(setError)
                                            .finally(() => {
                                              closeConnectModal()
                                              setLoading(false)
                                              disconnect()
                                            })
                                        }
                                      })
                                      .catch(setError)
                                      .finally(() => {
                                        closeConnectModal()
                                        setLoading(false)
                                        disconnect()
                                      })
                                  }
                                })
                                .catch(setError)
                                .finally(() => {
                                  closeConnectModal()
                                  setLoading(false)
                                  disconnect()
                                })
                            },
                            code,
                          )
                        }
                      >
                        Connect
                      </button>
                      <button
                        onClick={() => setLoading(false)}
                        className={button({ size: 'sm' })}
                      >
                        Cancel
                      </button>
                    </>
                  </div>
                </div>
              )
            ) : (
              <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="mb-2 font-medium text-center md:text-xl">
                  Something went wrong with error
                </div>
                <div className="py-2 px-4 w-full font-mono rounded bg-stone-200">
                  &ldquo;{error}&rdquo;
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
