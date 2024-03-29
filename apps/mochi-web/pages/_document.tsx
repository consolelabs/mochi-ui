import Document, { Head, Html, Main, NextScript } from 'next/document'
import { CONFIG } from '~app/layout/seo'
import { HOME_URL } from '~envs'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            href="https://fonts.googleapis.com/css?family=IBM Plex Mono&display=optional"
            rel="stylesheet"
          />
          <meta name="apple-mobile-web-app-title" content={CONFIG.title} />
          <meta name="application-name" content={CONFIG.title} />
          <script
            defer
            data-domain={HOME_URL}
            src="https://plausible.io/js/script.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
