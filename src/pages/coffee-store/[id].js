import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

import styles from './CoffeeStore.module.css'
import { fetchCoffeeStores } from "@/lib/coffee-stores"

export async function getStaticProps(staticProps) {
  const params = staticProps.params
 
  const libCoffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStore: libCoffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id
      })
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

const CoffeeStore = (props) => {
  const router = useRouter()
  const { id } = router.query

  if (router.isFallback){
    return <div>Loading...</div>
  }

  const { name, address, country, cross_street, locality, region, imgUrl } = {...props.coffeeStore}

  const title = 'Coffee Store Page'
  const defaultImgUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  const iconBaseString = '/static/icons/'

  const handleUpVoteBtn = () => {
    console.log('Clicked up vote!')
  }

  return (
    <>
      <section className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/" name="Back to home page">
                Back to Home page
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.storeTitle}>
                { title }: {name}
              </h1>
            </div>
            <Image
              priority
              className={styles.storeImg}
              src={imgUrl || defaultImgUrl}
              alt={`Image of ${name} store`}
              width={600}
              height={400}/>
          </div>
          <div className={`glass ${styles.col2}`}>
            <div className={styles.iconWrapper}>
              <Image src={`${iconBaseString}location-pin.svg`} width="24" height="24" alt="Location pin icon"/>
              <p className={styles.text}>
                {address}, {locality}, {region}, {country}
              </p>
            </div>
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
                Rating: 1
              </p>
            </div>
            <button className={styles.upvoteBtn} onClick={handleUpVoteBtn}>Up Vote!</button>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default CoffeeStore