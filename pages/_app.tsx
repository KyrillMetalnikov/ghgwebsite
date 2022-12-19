import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
