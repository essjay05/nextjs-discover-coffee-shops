import { useState } from "react"

const useTrackLocation = () => {
  const [locationErrMsg, setLocationErrMsg] = useState("")
  const [latLong, setLatLong] = useState("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`)
    setLocationErrMsg("")
    setIsLoadingLocation(false)
  }

  const error = () => {
    setIsLoadingLocation(false)
    setLocationErrMsg("ERROR: Unable to retrieve your location.")
  }

  const handleTrackLocation = () => {
    setIsLoadingLocation(true)
    if (!navigator.geolocation) {
      setLocationErrMsg("ERROR: Geolocation is not supported by your browser")
      setIsLoadingLocation(false)
    } else {
      setLocationErrMsg("Locating…")
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    latLong,
    handleTrackLocation,
    locationErrMsg,
    isLoadingLocation
  }
}

export default useTrackLocation