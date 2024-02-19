import { Typography } from '@mochi-ui/typography'
import { loginWidget } from '@mochi-ui/theme'
import { IconButton } from '@mochi-ui/icon-button'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaThumb,
  ScrollAreaScrollbar,
} from '@mochi-ui/scroll-area'
import { useLoginWidget } from './store'

const { loginSocialListClsx } = loginWidget

export default function ConnectSocial() {
  const { socials } = useLoginWidget()

  return (
    <>
      <Typography className="!font-light" level="h8" color="textTertiary">
        Or quickly sign in with your existing social account.
      </Typography>
      <ScrollArea>
        <ScrollAreaViewport>
          <div className={loginSocialListClsx()}>
            {socials.map((item) => {
              return (
                <IconButton
                  label=""
                  type="button"
                  key={item.name}
                  onClick={() =>
                    item.onClick?.(window.location.href.split('#')[0])
                  }
                  disabled={item.disabled}
                  variant="outline"
                  color="neutral"
                  size="lg"
                  className="!p-2"
                >
                  {item.icon}
                </IconButton>
              )
            })}
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </>
  )
}
