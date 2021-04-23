import Head from 'next/head'
import Navbar from './navbar'
import { useCurrentUser } from '@/hooks/index';
import { favicon } from '@/lib/core-data';

export default function LayoutSub(props) {
  return (
      <div>
        <Head>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href={favicon} />
        </Head>
        <Navbar title={props.title} />
        <div style={{ background: 'rgb(237 237 245)', padding: '45px 0px 0px 0px' }}>
          {props.children}
        </div>
        <div className="footer mb-12 pb-3">
                <div className="footer-title">
                    Copyright © Cira App 2021. All Rights Reserved.
                </div>
                Inovasi untuk kemudahan online
            </div>
      </div>
  )
}