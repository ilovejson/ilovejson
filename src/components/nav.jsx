import Head from 'next/head';

const Nav = () => (
  <Head>
    <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
    <meta name='description' content='Description' />
    <meta name='keywords' content='Keywords' />
    <title>iLoveJSON | Online JSON Tools for JSON Lovers</title>

    <link rel='manifest' href='/manifest.json' />
    <link href='/favs/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
    <link href='/favs/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
    <link rel='apple-touch-icon' href='/favs/apple-icon.png'></link>
    <meta name='theme-color' content='#317EFB' />

    <nav>
      <ul>
        <li><a href="#compress">Compress</a></li>
        <li><a href="#beautify">Beautify</a></li>
        <li><a href="#validate">Validate</a></li>
        <li><a href="#viewer">Viewer</a></li>
        <li><a href="#editor">Editor</a></li>
        <li><a href="#merge">Merge</a></li>
        <li><a href="#repair">Repair</a></li>
      </ul>
    </nav>
  </Head>
)

export default Nav
