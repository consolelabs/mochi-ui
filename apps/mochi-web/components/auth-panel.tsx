import Button from "./base/button/button"
import { WalletAddIcon } from "./login"
import useSWR from "swr"
import { API } from "~constants/api"
import { api } from "~constants/mochi"
import { Fragment, ReactNode, useCallback, useMemo, useState } from "react"
import { AUTH_TELEGRAM_ID, MOCHI_PROFILE_API } from "~envs"
import {
    ModalTitle,
    IconDiscord,
    IconTelegram,
    IconTwitter,
    IconGoogle,
    IconGithub,
    IconSlack,
    IconFacebook,
    IconMail,
    LoginWidget,
    useMochi
} from "@consolelabs/ui-components"
import { useAuthStore } from "~store"
import qs from "query-string"
import clsx from "clsx"
import { useEffect } from "react"

interface AuthPanelProps {
    onOpenConnectWalletChange?: (open: boolean) => void
}

export const AuthPanel = (props: AuthPanelProps) => {
    const { onOpenConnectWalletChange } = props

    const { isLoggedIn, login, isLoadingSession } = useAuthStore()
    const { user } = useMochi()
    const [ isOpenWidget, setIsOpenWidget ] = useState(false)

    const onOpenLoginWidgetChange = (open: boolean) => {
        setIsOpenWidget(open)
        onOpenConnectWalletChange?.(open)
    }

    const { data: discordAuthUrl } = useSWR('login-discord', async () => {
        const { data } = await api.profile.auth.byDiscord({
                urlLocation: window.location.href,
                platform: 'web',
            })
        return data?.url
    })

    const { data: twitterAuthUrl } = useSWR('login-twitter', async () => {
        const data = await API.MOCHI_PROFILE.get(
            `/profiles/auth/twitter?platform=web&url_location=${window.location.href}`,
        ).json((r) => r.data)
        return data?.url
    })

    const { data: mailAuthUrl } = useSWR('login-mail', async () => {
        const data = await API.MOCHI_PROFILE.get(
            `/profiles/auth/mail?platform=web&url_location=${window.location.href}`,
        ).json((r) => r.data)
        return data?.url
    })

    const onAuthTelegram = useCallback(() => {
        // @ts-ignore
        window.Telegram.Login.auth(
            {
            bot_id: AUTH_TELEGRAM_ID,
            request_access: true,
            return_to: encodeURI(window.location.href),
            lang: 'en',
            },
            (user: any) => {
            console.log(user)

            const telegramAuth = `${MOCHI_PROFILE_API}/profiles/auth/telegram?${qs.stringify(
                {
                ...user,
                url_location: window.location.href,
                },
            )}`

            window.location.href = telegramAuth
            },
        )
    }, [])
    
    const socialAuths = useMemo(() => [
        {
            name: "Discord",
            icon: (
                <IconDiscord className="text-[#5865F2]"/>
            ),
            href: discordAuthUrl
        },
        {
            name: "Telegram",
            icon: (
                <IconTelegram/>
            ),
            onClick: onAuthTelegram
        },
        {
            name: "Twitter",
            icon: (
                <IconTwitter/>
            ),
            href: twitterAuthUrl
        },
        {
            name: "Google",
            icon: (
                <IconGoogle/>
            ),
            href: mailAuthUrl
        },
        {
            name: "Slack",
            icon: (
                <IconSlack/>
            ),
        },
        {
            name: "Github",
            icon: <IconGithub/>
        },
        {
            name: "Facebook",
            icon: <IconFacebook/>
        },
        {
            name: "Mail",
            icon: <IconMail/>
        },
    ] as Array<{
        name: string
        icon: ReactNode
        href?: string
        onClick?: () => void
    }> , [discordAuthUrl, mailAuthUrl, onAuthTelegram, twitterAuthUrl])

    useEffect(() => {
        if (user?.token) {
            login({ token: user.token })
        }
    }, [user?.token, login])

    return (
        <div className="p-6 rounded-xl bg-white-pure">
            <div className="space-y-2 text-center">
                <ModalTitle className="!text-2xl text-neutral-900">Welcome back!</ModalTitle>
                <p className="text-sm text-neutral-800">Great to see you again! Sign in your account to continue.</p>
            </div>
            <div className="flex flex-col gap-8 text-center mt-8">
                <div className="grid grid-cols-4 grid-rows-2 mx-auto w-fit gap-4 text-3xl">
                    {socialAuths.map((item) => {
                        const LinkWrapper = item.href ? 'a': Fragment
                        const disabled = !item.onClick && !item.href
                        return (
                            <button
                                type="button"
                                key={item.name}
                                className={clsx(
                                    "w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center",
                                    {
                                        "opacity-60": disabled,
                                        "hover:shadow-sm transition": !disabled
                                    }
                                    )}
                                onClick={item.onClick}
                                disabled={disabled}
                            >
                                <LinkWrapper
                                    {...(item.href && {href: item.href})}
                                >
                                    {item.icon}
                                </LinkWrapper>
                            </button>
                        )
                    })}
                </div>
                <p className="text-sm text-neutral-800">Or connect with an extension wallet</p>
                <LoginWidget
                    open={isOpenWidget}
                    onOpenChange={onOpenLoginWidgetChange}
                    authUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/auth"
                    meUrl="https://api-preview.mochi-profile.console.so/api/v1/profiles/me"
                    trigger={
                        <Button className="text-base px-6 py-3 !bg-blue-700 text-white shadow-none">
                            <WalletAddIcon className="mr-2 w-5 h-5"/>
                            Connect Wallet
                        </Button>
                    }
                />
            </div>
        </div>
    )
}