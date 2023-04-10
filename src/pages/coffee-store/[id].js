import { useRouter } from "next/router"
import Link from "next/link"

const CoffeeStore = () => {
  const router = useRouter()
  const { id } = router.query

  console.log('Coffee store, router iD:')
  console.log(id)

  const title = 'Coffee Store Page'

  return (
    <>
      <h1>{ title } ID#: { id }</h1>
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