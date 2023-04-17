import { useState } from "react"

const useTrackLocation = () => {
  const [locationErrMsg, setLocationErrMsg] = useState("")
  const [latLong, setLatLong] = useState("")
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`)
    setLocationErrMsg("")
  }

  const error = () => {
    setLocationErrMsg("Unable to retrieve your location.")
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrMsg("Geolocation is not supported by your browser")
    } else {
      setLocationErrMsg("Locating…")
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    latLong,
    handleTrackLocation,
    locationErrMsg
  }
}

export default useTrackLocation