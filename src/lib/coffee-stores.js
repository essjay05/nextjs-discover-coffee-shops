import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.PHOTOS_ACCESS_KEY
})

const getUrlForCoffeeStores = (latLong, limit, query ) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}${ query ? `&query=${query}` : '' }&categories=13032&limit=${limit}`
}

const getPhotosOfCoffeeStores = async() => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30
  })

  const unsplashPhotos = photos.response.results
  return unsplashPhotos.map((result) => result.urls['small'])
}

export const fetchCoffeeStores = async () => {
  const photos = await getPhotosOfCoffeeStores()
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
  return data.results.map((result, index) => {
    return {
      ...result,
      imgUrl: photos[index]
    }
  })
}