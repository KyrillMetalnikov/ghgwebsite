import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'
import { store } from '../store/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  )
}
