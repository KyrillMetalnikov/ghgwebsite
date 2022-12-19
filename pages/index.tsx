import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gentle Hearts Gaming</title>
        <meta name="gentle hearts gaming website" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Gentle Hearts Gaming &lt;3
        </h1>
      </main>
    </div>
  )
}
