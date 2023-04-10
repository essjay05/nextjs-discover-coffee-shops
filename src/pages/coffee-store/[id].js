import { useRouter } from "next/router"

const CoffeeStore = () => {
  const router = useRouter()
  const { id } = router.query

  console.log('Coffee store, router iD:')
  console.log(id)

  const title = 'Coffee Store Page'

  return (
    <>
      <h1>{ title } ID#: { id }</h1>
    </>
  )
}

export default CoffeeStore