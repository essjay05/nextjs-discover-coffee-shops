import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

import styles from './CoffeeStore.module.css'
import coffeeStoreData from '../../data/coffee-stores.json'

export function getStaticProps(staticProps) {
  const params = staticProps.params
  console.log('getStaticProps params:')
  console.log(params)
  return {
    props: {
      coffeeStore: coffeeStoreData.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id
      })
    }
  }
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: '0' } },
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: true
  }
}

const CoffeeStore = (props) => {
  const router = useRouter()
  const { id } = router.query

  if (router.isFallback){
    return <div>Loading...</div>
  }

  const { name, imgUrl, address, neighbourhood } = {...props.coffeeStore}

  const title = 'Coffee Store Page'

  const handleUpVoteBtn = () => {
    console.log('Clicked up vote!')
  }

  return (
    <>
      <section className={styles.storeContainer}>
        <div className={styles.col1}>
          <h1 className={styles.storeTitle}>
            { title }: {name}
          </h1>
          <Image
            priority
            className={styles.storeImg}
            src={imgUrl}
            alt={`Image of ${name} store`}
            width={600}
            height={400}/>
        </div>
        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image src="" width="24" height="24" alt="Location pin icon"/>
            <p className={styles.text}>
              {address}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="" width="24" height="24" alt="Star icon"/>  
            <p className={styles.text}>
              {neighbourhood}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="" width="24" height="24" alt="Star icon"/>  
            <p className={styles.text}>
              Rating: 1
            </p>
          </div>
          <button className={styles.upvoteBtn} onClick={handleUpVoteBtn}>Up Vote!</button>
        </div>
      </section>
      <section className={styles.linksWrapper}>
        <Link href="/" name="Back to home page">
          Back to Home page
        </Link>
      </section>
    </>
  )
}

export default CoffeeStore