const getUrlForCoffeeStores = (latLong, limit, query ) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}${ query ? `&query=${query}` : '' }&categories=13032&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
  const sanJoseLatLongCoords = '37.338207%2C-121.886330'

  const fourSquareApiUrl = getUrlForCoffeeStores(
    sanJoseLatLongCoords, 
    9, 
    'coffee')
  
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.DATA_KEY
    }
  }

  const response = await fetch(fourSquareApiUrl, options)
  const data = await response.json()
  return data.results
}