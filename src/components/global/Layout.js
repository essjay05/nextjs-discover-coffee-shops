import Head from "next/head"
import Footer from "./Footer"

export const baseAppTitle = "Coffee Conoisseur"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Coffee Shop finder Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout