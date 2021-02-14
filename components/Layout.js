import Head from 'next/head'
import Navbar from './NavbarMenu'
import Footer from './Footer'

export default function Layout(props) {
  return (
      <div>
        <Head>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href="https://brebes-social.id/assets/images/logo/cira.webp" />
          <link rel="manifest" href="/manifest.json"></link>
        </Head>
        <Navbar />
        <div style={{ background: '#edf2f7', padding: '0px' }}>
          {props.children}
        </div>
        <Footer />
      </div>
  )
}