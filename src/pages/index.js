import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Layout, { baseAppTitle } from '@/components/global/Layout'
import Banner from '@/components/global/Banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const titleA = 'Coffee '
  const titleB = 'Connoisseur'
  const subtitle = 'Discover your local coffee shops!'
  const btnText = 'Find Local Shops!'
  const handleOnBannerBtnClick = () => {
    console.log('Hi Banner Button :)')
  }

  return (
    <>
      <Head>
        <title>{ baseAppTitle } - Home</title>
      </Head>
      <main className={styles.main}>
        <Banner
          titleA={titleA} 
          titleB={titleB} 
          subtitle={subtitle}
          btnText={btnText}
          handleOnClick={handleOnBannerBtnClick}/>
        <div className={styles.description}>
        </div>
      </main>
    </>
  )
}
