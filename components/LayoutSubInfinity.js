import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutSub(props) {
  return (
      <div>
        <Head>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href="https://brebes-social.id/assets/images/logo/cira.webp" />
        </Head>
        <Navbar />
        <div style={{ background: 'rgb(237 237 245)', padding: '0px' }}>
          {props.children}
        </div>
      </div>
  )
}