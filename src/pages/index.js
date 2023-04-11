import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Layout, { baseAppTitle } from '@/components/global/Layout'
import Banner from '@/components/global/Banner'
import Card from '@/components/global/Card'

import coffeeStores from '../data/coffee-stores.json'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores,
    }
  }
}

export default function Home( props ) {

  console.log('Home props')
  console.log(props)

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
        { props.coffeeStores.length > 0 ?
          <section className={styles.listContainer}>
            <h2 className={styles.listHeader}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              { props.coffeeStores.map((cafe) => {
                return (
                  <Card
                    key={cafe.id}
                    className={styles.card}
                    name={cafe.name}
                    href={`/coffee-store/${cafe.id}`}
                    imgSrc={cafe.imgUrl}
                    />
                )
              })}
            </div>
        </section>
        :
        <></>
        }
        
      </Layout>
    </>
  )
}
