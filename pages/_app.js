import '../styles/index.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og
  const title = pageProps.data?.title

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <meta property="og:title" content={title || `iLoveJSON | Online JSON Tools for JSON Lovers`} />
        <meta property="og:site_name" content="iLoveJSON | Online JSON Tools for JSON Lovers" />
        <meta property="og:description" content={og ? og.description : `Writing about the tips I usually share on Twitter and some more.`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@i_love_json" />
        <meta property="og:image" content={og ? og.image : `https://telmo.im/og/default.png`} />

        <link rel='manifest' href='/manifest.json' />
        <link href='/favs/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favs/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/favs/apple-icon.png'></link>
        <meta name='theme-color' content='#317EFB' />

        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

        <title>{title || 'iLoveJSON | Online JSON Tools for JSON Lovers'}</title>

      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
