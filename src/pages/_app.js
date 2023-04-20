import { createContext } from 'react'
import '@/styles/globals.css'

const StoreContext = createContext()

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    coffeStores: []
  }
  return (
    <StoreContext.Provider value={{state: initialState}}>
      { children }
    </StoreContext.Provider>
  )
}

export default function App({ Component, pageProps }) {
  return (
  <StoreProvider>
    <Component {...pageProps}/>
  </StoreProvider>
  )
}
