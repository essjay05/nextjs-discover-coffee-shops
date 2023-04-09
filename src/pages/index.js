import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Layout, { baseAppTitle } from '@/components/global/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>{ baseAppTitle } - Home</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className={styles.title}>
            { baseAppTitle }
          </h1>
        </div>
      </main>
    </>
  )
}
