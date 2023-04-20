import { createContext, useReducer } from 'react'
import '@/styles/globals.css'

const StoreContext = createContext()

const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
}

const storeReducer = ( state, action ) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {

    }
    case ACTION_TYPES.SET_COFFEE_STORES: {

    }
    default:
      throw new Error(`Unhandled actiontype: ${actionl.type}`)
  }
}

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    coffeStores: []
  }

  const [ state, dispatch ] = useReducer(storeReducer, initialState)
  return (
    <StoreContext.Provider value={{state, dispatch}}>
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
