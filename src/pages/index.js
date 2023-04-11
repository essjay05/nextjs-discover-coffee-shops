import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Layout, { baseAppTitle } from '@/components/global/Layout'
import Banner from '@/components/global/Banner'
import Card from '@/components/global/Card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const titleA = 'Coffee '
  const titleB = 'Connection'
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
      <Layout>
        <section className={styles.aboveFold}>
          <Banner
            titleA={titleA} 
            titleB={titleB} 
            subtitle={subtitle}
            btnText={btnText}
            handleOnClick={handleOnBannerBtnClick}/>
          <div
            className={styles.heroImage} >
            <Image 
              priority
              src="/static/undraw_coffee_with_friends_3cbj .svg"
              width={700}
              height={400}
              alt="Illustration of 3 friends having coffee together."/>
          </div>
        </section>
        <section className={styles.listSection}>
          <Card
            name={"DarkHorse Coffee"}
            href={`/coffee-store/darkhorse-coffee`}
            imgSrc="/static/undraw_hot_beverage_re_9mpe.svg"
            />
        </section>
      </Layout>
    </>
  )
}
