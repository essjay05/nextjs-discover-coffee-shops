import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

import useSWR from "swr"

import styles from "./CoffeeStore.module.css"
import { fetchCoffeeStores } from "@/lib/coffee-stores"

import { StoreContext } from "../../store/store-context"
import { isEmpty, fetcher } from "@/utils"

export async function getStaticProps(staticProps) {
  const params = staticProps.params

  const libCoffeeStores = await fetchCoffeeStores()
  const findCoffeeStoreById = libCoffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id
  })
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    }
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()
  const paths = coffeeStores.map((coffeeStore) => {
    return { 
      params: { 
        id: coffeeStore.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: true
  }
}

const CoffeeStore = (initialProps) => {
  const router = useRouter()
  const { id } = router.query

  if (router.isFallback){
    return <div>Loading...</div>
  }

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const [votingCount, setVotingCount] = useState(0)

  const {
    state: {coffeeStores}
  } = useContext(StoreContext)

  const getFullAddress = (coffeeStore) => {
    const { address, locality, region, country } = coffeeStore
    return address ? `${address}${ locality ? `, ${locality}` : ''}${ region ? `, ${region}` : ''}${country ? `, ${country}` : ''}` : ''
  }

  const handleCreateCoffeeStore = async(coffeeStore) => {
    try {
      const { id, name, voting, imgUrl, cross_street } = coffeeStore
      const fullAddress = getFullAddress(coffeeStore)
      const response = await fetch(`/api/createCoffeeStore/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id, 
          name, 
          voting: 0, 
          imgUrl: imgUrl || '', 
          neighbourhood: cross_street || '', 
          address: fullAddress || ''
        })
      })
      response.json()
    } catch(err) {
      console.error('Error creating coffee store: ', err)
    }
  }

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((cs) => {
          return cs.id.toString() === id
        })

        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext)
          handleCreateCoffeeStore(coffeeStoreFromContext)
        }
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore)
    }
  }, [id, initialProps, initialProps.coffeeStore])

  const { name, address, country, cross_street, locality, region, imgUrl } = coffeeStore

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0])
      setVotingCount(data[0].voting)
    }
  }, [data])

  const defaultImgUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  const iconBaseString = '/static/icons/'

  const handleUpVoteBtn = async () => {
    try {
      const response = await fetch(`/api/favoriteCoffeeStoreById/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      const dbCoffeeStore = response.json()

      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        let count = votingCount + 1
        setVotingCount(count)
      }
      
    } catch(err) {
      console.error(`Error favoriting coffee store: `, err)
    }
    
  }

  if (error) {
    return <div>Something went wrong retrieving coffee store page.</div>
  }

  return (
    <>
      <section className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <div className={styles.backToHomeLinkWrapper}>
              <Link href="/"
                className={styles.backToHomeLink}
                name="Back to home page">
                <Image
                  src={`${iconBaseString}back-arrow.svg`} 
                  width="24" 
                  height="24" 
                  alt="Back icon"
                  className={styles.backToHomeIcon}/> 
                Back to Home page
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.storeTitle}>
                {name}
              </h1>
            </div>
          </div>
          <div className={styles.colContainer}>
            <div className={styles.col1}>
              <Image
                priority
                className={styles.storeImg}
                src={imgUrl || defaultImgUrl}
                alt={`Image of ${name} store`}
                width={600}
                height={400}/>
            </div>
            <div className={`glass ${styles.col2}`}>
              { address ?
                <div className={styles.iconWrapper}>
                  <Image src={`${iconBaseString}location-pin.svg`} width="24" height="24" alt="Location pin icon"/>
                  <p className={styles.text}>
                    { getFullAddress(coffeeStore) }
                  </p>
                </div>
              :
                <></>
              }
              { cross_street ?
                <div className={styles.iconWrapper}>
                <Image src={`${iconBaseString}near-me.svg`} width="24" height="24" alt="Star icon"/>  
                <p className={styles.text}>
                  {cross_street}
                </p>
              </div>
              :
                <></>
              }
              <div className={styles.iconWrapper}>
                <Image src={`${iconBaseString}star.svg`} width="24" height="24" alt="Star icon"/>  
                <p className={styles.text}>
                  Rating: {votingCount}
                </p>
              </div>
              <button className={styles.upvoteBtn} onClick={handleUpVoteBtn}>Up Vote!</button>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default CoffeeStore