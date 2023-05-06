import { useContext, useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import Layout, { baseAppTitle } from '@/components/global/Layout'
import Banner from '@/components/global/Banner'
import Card from '@/components/global/Card'

import { fetchCoffeeStores } from '@/lib/coffee-stores'
import useTrackLocation from '@/hooks/use-track-location'

import { StoreContext, ACTION_TYPES } from '../store/store-context'

export async function getStaticProps(context) {
  
  const libCoffeeStores = await fetchCoffeeStores()

  return {
    props: {
      coffeeStores: libCoffeeStores,
    }
  }
}

export default function Home( props ) {
  const { handleTrackLocation, locationErrMsg, isFindingLocation } = useTrackLocation()

  // const [ localCoffeeStoresList, setLocalCoffeeStoresList ] = useState([])
  const [ coffeeStoresError, setCoffeeStoresError ] = useState(null)
  
  const { dispatch, state } = useContext(StoreContext)
  const { coffeeStores, latLong } = state

  const titleA = 'Coffee '
  const titleB = 'Connection'
  const subtitle = 'Discover your local coffee shops!'
  const btnText = 'Find Local Shops!'

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=24`)
          const coffeeStores = await fetchedCoffeeStores.json()
          // setLocalCoffeeStoresList(fetchedCoffeeStores)
          dispatch({
              type: ACTION_TYPES.SET_COFFEE_STORES,
              payload: {
                coffeeStores
              }
          })
          setCoffeeStoresError('')
        } catch(err) {
          const errorMsg = `ERROR: ${err.message}`
          setCoffeeStoresError(errorMsg)
        }
      }
    }
    setCoffeeStoresByLocation()
  },[latLong])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
  }

  const defaultImgUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"

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
            btnText={isFindingLocation ? "Locating..." : btnText}
            handleOnClick={handleOnBannerBtnClick}/>
          { locationErrMsg.includes('ERROR') ?
            <div className={styles.bannerErrMsgContainer}>
              <strong>Something went wrong. {locationErrMsg}</strong>
            </div>
          :
            <></>
          }
          { coffeeStoresError ?
            <div className={styles.bannerErrMsgContainer}>
              <strong>Something went wrong. {coffeeStoresError}</strong>
            </div>
          :
            <></>
          }
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
        { coffeeStores.length > 0 && !coffeeStoresError ?
          <section className={styles.listContainer}>
            <h2 className={styles.listHeader}>Stores near {coffeeStores[0].locality}{ }, {coffeeStores[0].region}</h2>
            <div className={styles.cardLayout}>
              { coffeeStores.map(cafe => {
                return (
                  <Card
                    key={cafe.id}
                    className={styles.card}
                    name={cafe.name}
                    href={`/coffee-store/${cafe.id}`}
                    imgSrc={cafe.imgUrl || defaultImgUrl}
                    />
                )
              })}
            </div>
        </section>
        :
        <></>
        }
        { props.coffeeStores.length > 0 ?
          <section className={styles.listContainer}>
            <h2 className={styles.listHeader}>San Francisco Stores</h2>
            <div className={styles.cardLayout}>
              { props.coffeeStores.map(cafe => {
                return (
                  <Card
                    key={cafe.id}
                    className={styles.card}
                    name={cafe.name}
                    href={`/coffee-store/${cafe.id}`}
                    imgSrc={cafe.imgUrl || defaultImgUrl}
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
