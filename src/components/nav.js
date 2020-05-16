import React from 'react'
import Head from 'next/head'

const Nav = () => (
  <nav>
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <meta name='description' content='Description' />
      <meta name='keywords' content='Keywords' />
      <title>I ❤️ JSON</title>

      <link rel='manifest' href='/manifest.json' />
      <link href='/favs/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/favs/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/favs/apple-icon.png'></link>
      <meta name='theme-color' content='#317EFB' />
    </Head>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
