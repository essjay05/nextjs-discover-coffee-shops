export const fetchCoffeeStores = async () => {
  const sanJoseLatLongCoords = '37.338207%2C-121.886330'
  
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.DATA_KEY
    }
  }

  const response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${sanJoseLatLongCoords}&categories=13032&limit=9`, options)
  const data = await response.json()
  return data.results
}