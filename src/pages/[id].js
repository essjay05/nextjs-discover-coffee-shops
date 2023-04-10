import { useRouter } from "next/router"

const DynamicPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Dynamic Page: {id}</h1>
    </>
  )
}

export default DynamicPage