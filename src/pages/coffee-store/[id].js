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
    fallback: false
  }
}

const CoffeeStore = (props) => {
  const router = useRouter()
  const { id } = router.query

 

  const { name, imgUrl, address } = {...props.coffeeStore}

  console.log('Coffee store, props:')
  console.log(name)

  const title = 'Coffee Store Page'

  return (
    <>
      <h1 className={styles.storeTitle}>
        { title }: {name}
      </h1>
      <Image
        className={styles.storeImg}
        src={imgUrl}
        alt={`Image of ${name} store`}
        width={600}
        height={400}/>
      <p className={styles.storeAddress}>
        {address}
      </p>
      <Link href="/" name="Back to home page">
        Back to Home page
      </Link>
      <br/>
      <Link href="/coffee-store/dynamic" name="Back to Dynamic page">
        Back to Dynamic page
      </Link>
    </>
  )
}

export default CoffeeStore