import { useContext, useState } from "react"
import { ACTION_TYPES, StoreContext } from '../pages/_app'

const useTrackLocation = () => {
  const [locationErrMsg, setLocationErrMsg] = useState("")
  // const [latLong, setLatLong] = useState("")
  const [isFindingLocation, setIsFindingLocation] = useState(false)

  const { dispatch } = useContext(StoreContext)

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`)
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` }
    })
    setLocationErrMsg("")
    setIsFindingLocation(false)
  }

  const error = () => {
    setIsFindingLocation(false)
    setLocationErrMsg("ERROR: Unable to retrieve your location.")
  }

  const handleTrackLocation = () => {
    setIsFindingLocation(true)

    if (!navigator.geolocation) {
      setLocationErrMsg("ERROR: Geolocation is not supported by your browser")
      setIsFindingLocation(false)
    } else {
      // setLocationErrMsg("Locating…")
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    // latLong,
    handleTrackLocation,
    locationErrMsg,
    isFindingLocation
  }
}

export default useTrackLocation